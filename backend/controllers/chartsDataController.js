import asyncHandler from 'express-async-handler';
import OverallStat from '../models/overAllStatsModel.js';
import Transaction from '../models/transactionModel.js';
import ExpensesCategory from "../models/expensesCategoryModel.js";
 
// @desc      get all OverallStat
// route      GET /api/dashboard
// @access    Private/admin
const getMonthlyOverallStats = asyncHandler(async(req, res) => {

  const monthlyData = await Transaction.aggregate([
    {
      $group: {
        _id: {
           
            $month: "$paidDate"
        },
        cost: {
          $sum: {
            $toInt: "$cost"
          }
        }
      }
    },
    {
      $project: {
        totalCost: "$cost",
        Month: {
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
            "$_id"
          ]
        }
      }
    }
  ])
//   console.log(monthlyData);
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
 

  
export {
    getBarChartData,
    getMonthlyOverallStats,
    
}