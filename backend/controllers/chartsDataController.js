import asyncHandler from 'express-async-handler';
// import OverallStat from '../models/overAllStatsModel.js';
import Transaction from '../models/transactionModel.js';
// import ExpensesCategory from "../models/expensesCategoryModel.js";
 
// @desc      get all OverallStat
// route      GET /api/dashboard
// @access    Private/admin
const getMonthlyOverallStats = asyncHandler(async(req, res) => {

  const monthlyData = await Transaction.aggregate([
    {
      $group: {
        _id: {
          year: {$year: "$paidDate"},
          month: {$month: "$paidDate"},
        },
        cost: {
          $sum: {
            $toInt: "$cost"
          }
        }
      }
    },
    {
      $group: {
        _id: "$_id.year",
        data: {
          $push: { 
            x: {
              $arrayElemAt: [
                [
                  "",
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December"
                ],
                "$_id.month"
              ]
            },
            y:{ $divide: ['$cost', 100000]},
          }},
      }
    },
    
  ])
  // console.log(monthlyData);
  res.status(200).json(monthlyData)
  
});
 

// @desc      get all OverallStat
// route      GET /api/dashboard/getBarChartData
// @access    Private/admin
const getBarChartData = asyncHandler(async(req, res) => {
  const mappedBarData = await Transaction.aggregate(
    [
      {
        $lookup:{
            from: "users",        
            localField: "userId",   
            foreignField: "_id",  
            as: "user_info"          
        }
    },
    {   $unwind:"$user_info" },     
    {
        $lookup:{
            from: "expensescategories", 
            localField: "ecId", 
            foreignField: "_id",
            as: "ec_data"
        }
    },
    {   $unwind:"$ec_data" },

      // First Stage
      {
        $group :
          {
            _id : "$ec_data.name",
            "plannedBudget":{"$first": "$ec_data.expectedBudget" },
            totalExpenseAmount: {  $sum: {
              $toInt: "$cost"
            } }
          }
       },
       // Second Stage
       {
         $match: { "totalExpenseAmount": { $gte: 10 } }
       }
     ]
   );
//   console.log(mappedBarData);
  res.status(200).json(mappedBarData)
});
 

// @desc      get all OverallStat
// route      GET /api/dashboard/getUserBankExpenses
// @access    Private/admin
const getUserBankExpenses = asyncHandler(async(req, res) => {
  const mappedBankData = await Transaction.aggregate(
    [
      {
        $lookup:{
            from: "users",       // other table name
            localField: "userId",   // name of users table field
            foreignField: "_id", // name of userinfo table field
            as: "user_info"         // alias for userinfo table
        }
    },
    {   $unwind:"$user_info" },     // $unwind used for getting data in object or for one record only

   
    {
        $lookup:{
            from: "expensescategories", 
            localField: "ecId", 
            foreignField: "_id",
            as: "ec_data"
        }
    },
    {   $unwind:"$ec_data" },
    {
      $lookup:{
          from: "banks", 
          localField: "bankId", 
          foreignField: "_id",
          as: "bank_data"
      }
  },
  {   $unwind:"$bank_data" },
  {
      $lookup:{
          from: "vendors", 
          localField: "vendorId", 
          foreignField: "_id",
          as: "vendor_data"
      }
  },
  {   $unwind:"$vendor_data" },

      // First Stage
      // {
      //   $group :
      //     {
      //       _id : "$user_info.name",
      //       BankName: { "$first": "$bank_data.name" },
      //       ACNumber: { $first: "$bank_data.accountNumber" },
      //       ACType: "$bank_data.accountType",
      //       "currentBalance":{"$first": "$ec_data.expectedBudget" },
      //       totalExpenseAmount: {  $sum: {
      //         $toInt: "$cost"
      //       } }
      //     }
      //  },
      {
        $group: {
          _id: {
            userName: "$user_info.name",
            bankName: "$bank_data.name",
            bankACNum: "$bank_data.accountNumber",
            bankACType: "$bank_data.accountType",
            currentBalance: "$bank_data.amount",

          },
          count: {
            $sum: 1
          },
          totalExpenseAmount: {  $sum: {
                    $toInt: "$cost"
                  } }
        }
      },
      {
        $group: {
          _id: {
            userName: "$_id.userName",
            bankName: "$_id.bankName",
            // AccountNum: "$_id.bankACNum",
          },
          
          Accounts: {
            $push: {
              AccountNum: "$_id.bankACNum",
              AccountType: "$_id.bankACType",
              totalTransactions: "$count",
              currentBalance: "$_id.currentBalance",
              totalAmountSpent: "$totalExpenseAmount",
            }
          }
        }
      },

      {
        $group: {
          _id: "$_id.userName",
          Bank: {
            $push: {
              name: "$_id.bankName",
              Accounts: "$Accounts"
            }
          }
        }
      },
      
      //  {
      //   "$project": {
      //     "Bank": {
      //       "name": "$BankName",
      //       "account": {
      //         "acNum": "$ACNumber",
      //         "acType": {
      //           "acCategory": "$ACType",
      //           "currentBalance": "$currentBalance",
      //           "totalExpenseAmount": "$totalExpenseAmount",
      //         }
      //       }
            
      //     }
      //   }
      // },
       // Second Stage
      //  {
      //    $match: { "totalExpenseAmount": { $gte: 10 } }
      //  }
     ]
   );

   let sortedMappedBankData = [...mappedBankData].sort((a, b) => {
    return b.AccountNum - a.AccountNum;
  });
//   console.log(mappedBankData);
  res.status(200).json(sortedMappedBankData)
});
 

  
export {
    getBarChartData,
    getMonthlyOverallStats,
    getUserBankExpenses
}