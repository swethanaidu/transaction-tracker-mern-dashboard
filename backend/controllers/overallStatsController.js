import asyncHandler from 'express-async-handler';
import OverallStat from '../models/overAllStatsModel.js';
import Transaction from '../models/transactionModel.js';
import ExpensesCategory from "../models/expensesCategoryModel.js";

// @desc      create a new OverallStat
// route      POST /api/dashboard
// @access    Private/admin

const setOverallStats = asyncHandler(async (req, res) => {
   const {
        totalUsers,
        totalTransactions,
        totalExpectedBudget,
        totalPaidExpenses,
        year,
        monthlyData,
        dailyData,
        ebc,
        expensesByCategory,
        expectedBudgetByCategory,
   } = req.body; 
  //  console.log(req.body);
   const OverallStatExists = await OverallStat.findOne({year});
   if(OverallStatExists){
        res.status(400);
        throw new Error(`OverallStats for the year ${year} already exists`);
   }
   const overallStat =  await OverallStat.create({
        totalUsers,
        totalTransactions,
        totalExpectedBudget,
        totalPaidExpenses,
        year,
        monthlyData,
        dailyData,
        ebc,
        expensesByCategory,
        expectedBudgetByCategory,
   });
  //  console.log(overallStat);
    if(overallStat) {
        res.status(200).json({
          totalUsers: overallStat.totalUsers,
          totalTransactions: overallStat.totalTransactions,
          totalExpectedBudget: overallStat.totalExpectedBudget,
          totalPaidExpenses: overallStat.totalPaidExpenses,
          year: overallStat.year,
          monthlyData: overallStat.monthlyData,
          dailyData: overallStat.dailyData,
          ebc: overallStat.ebc,
          expensesByCategory: overallStat.expensesByCategory,
          expectedBudgetByCategory: overallStat.expectedBudgetByCategory
        });
    } else {
        res.status(400);
        throw new Error('Invalid overallStat data')
    }
});

  
// @desc      get all OverallStat
// route      GET /api/dashboard
// @access    Private/admin
const getOverallStats = asyncHandler(async(req, res) => {
    //const overallStats = await OverallStat.find();
    // console.log(overallStat);
   // res.status(200).json(overallStats);
   const ecs = await ExpensesCategory.find();
   const transactions = await Transaction.aggregate([
    // Join with user_info table
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

    {   
        $project:{
            _id : 1,
            title : 1,
            userId : 1,
            description : 1,
            ecId : 1,
            cost : 1,
            paidDate : 1,
            status : 1,
            userName : "$user_info.name",
            ecName : "$ec_data.name",
            ecbudget : "$ec_data.expectedBudget",
        } 
    }
]);
   //const topicData = await VisualData.find();
    const mappedPieData = transactions.reduce((acc, curr) => {
      // console.log(curr.ecbudget);
      if (curr.ecName !== "") {
        if (!acc[curr.ecName]) {
          acc[curr.ecName] = 0;
        }
        acc[curr.ecName] = acc[curr.ecName] + curr.cost;
        
      }
      return acc;
    }, {});
    const yearlyExpenseTotal = transactions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.cost,
      0
    );
 

    let sortedTranscationData = [...transactions].sort((a, b) => {
      return b.paidDate - a.paidDate;
    });
    
    let transactionsData = sortedTranscationData.slice(0, 10);
    
    const totalPlannedBudget = ecs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.expectedBudget,
      0
    );
    const categoryData = await Transaction.aggregate(
      [
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
    // console.log(categoryData);
    res.status(200).json({
      totalPlannedBudget,
      yearlyExpenseTotal,
      mappedPieData,
      categoryData,
      transactionsData,
  })
    
});

// @desc      get all OverallStat
// route      GET /api/dashboard
// @access    Private/admin
const getMonthlyOverallStats = asyncHandler(async(req, res) => {
  // const overallStats = await OverallStat.find();
  // console.log(overallStat);
 // res.status(200).json(overallStats);
 const ecs = await ExpensesCategory.find();
 const transactions = await Transaction.aggregate([
  // Join with user_info table
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

  {   
      $project:{
          _id : 1,
          title : 1,
          userId : 1,
          description : 1,
          ecId : 1,
          cost : 1,
          paidDate : 1,
          status : 1,
          userName : "$user_info.name",
          ecName : "$ec_data.name",
          ecbudget : "$ec_data.expectedBudget",
      } 
  }
]);
 //const topicData = await VisualData.find();
  const mappedPieData = transactions.reduce((acc, curr) => {
    // console.log(curr.ecbudget);
    if (curr.ecName !== "") {
      if (!acc[curr.ecName]) {
        acc[curr.ecName] = 0;
      }
      acc[curr.ecName] = acc[curr.ecName] + curr.cost;
      
    }
    return acc;
  }, {});
  const yearlyExpenseTotal = transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.cost,
    0
  );
  const totalPlannedBudget = ecs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.expectedBudget,
    0
  );

  // const mappedBarData = transactions.reduce((acc, curr) => {
  //   if (curr.ecName !== "") {
  //     if (!acc[curr.ecName]) {
  //       acc[curr.ecName] = 0;
  //       acc["budget"] = curr.ecbudget;
  //     }
  //     acc[curr.ecName] = acc[curr.ecName] + curr.cost;
      
  //   }
  //   return acc;
  // }, {});

  // const formattedData = Object.entries(mappedPieData).map(
  //   ([ecName, count]) => {
  //     return { "category": ecName, "Total cost": count};
  //   }
  // );

  

  // let sortedData = [...formattedTopics].sort((a, b) => {
  //   return b.value - a.value;
  // });
  // console.log(yearlyExpenseTotal);
  // console.log( );
  // let slicedData = sortedData.slice(0, 10);

  // res.status(200).json(slicedData);
  // const mappedBarData = await Transaction.aggregate(
  //   [
  //     {
  //       $lookup:{
  //           from: "users",        
  //           localField: "userId",   
  //           foreignField: "_id",  
  //           as: "user_info"          
  //       }
  //   },
  //   {   $unwind:"$user_info" },     
  //   {
  //       $lookup:{
  //           from: "expensescategories", 
  //           localField: "ecId", 
  //           foreignField: "_id",
  //           as: "ec_data"
  //       }
  //   },
  //   {   $unwind:"$ec_data" },

  //     // First Stage
  //     {
  //       $group :
  //         {
  //           _id : "$ec_data.name",
  //           "plannedBudget":{"$first": "$ec_data.expectedBudget" },
  //           totalExpenseAmount: {  $sum: {
  //             $toInt: "$cost"
  //           } }
  //         }
  //      },
  //      // Second Stage
  //      {
  //        $match: { "totalExpenseAmount": { $gte: 10 } }
  //      }
  //    ]
  //  );

  // const formattedData = Object.entries(mappedBarData).map(
  //   ([_id, plannedBudget]) => {
  //     return { "category": ecName, "Total cost": plannedBudget};
  //   }
  // );

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
  console.log(totalPlannedBudget);
  res.status(200).json({
    yearlyExpenseTotal,
    totalPlannedBudget,
    mappedPieData,
    transactions,
})
  
});

// @desc      get all OverallStat
// route      GET /api/dashboard/getMonthlyData
// @access    Private/admin
// const getMonthlyData = asyncHandler(async(req, res) => {
//   const monthlyData = await Transaction.aggregate([
//     {
//       $group: {
//         _id: {
           
//             $month: "$paidDate"
//         },
//         cost: {
//           $sum: {
//             $toInt: "$cost"
//           }
//         }
//       }
//     },
//     {
//       $project: {
//         totalCost: "$cost",
//         Month: {
//           $arrayElemAt: [
//             [
//               "",
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December"
//             ],
//             "$_id"
//           ]
//         }
//       }
//     }
//   ])
//   console.log(monthlyData);
//   // res.status(200).json( monthlyData )
// });

// @desc      get all OverallStat
// route      GET /api/dashboard/getBarChartData
// @access    Private/admin
// const getBarChartData = asyncHandler(async(req, res) => {
//   const mappedBarData = await Transaction.aggregate(
//     [
//       {
//         $lookup:{
//             from: "users",        
//             localField: "userId",   
//             foreignField: "_id",  
//             as: "user_info"          
//         }
//     },
//     {   $unwind:"$user_info" },     
//     {
//         $lookup:{
//             from: "expensescategories", 
//             localField: "ecId", 
//             foreignField: "_id",
//             as: "ec_data"
//         }
//     },
//     {   $unwind:"$ec_data" },

//       // First Stage
//       {
//         $group :
//           {
//             _id : "$ec_data.name",
//             "plannedBudget":{"$first": "$ec_data.expectedBudget" },
//             totalExpenseAmount: {  $sum: {
//               $toInt: "$cost"
//             } }
//           }
//        },
//        // Second Stage
//        {
//          $match: { "totalExpenseAmount": { $gte: 10 } }
//        }
//      ]
//    );
//   console.log(mappedBarData);
//   // res.status(200).json(mappedBarData )
// });

// @desc      Get OverallStat by ID
// route      GET /api/dashboard/:id
// @access    Private/Admin
const getOverallStatsByID = asyncHandler(async(req, res) => {
    const overallStats = await OverallStat.findById(req.params.id);
    res.status(200).json(overallStats);
});


// @desc      upadate OverallStat by ID
// route      PUT /api/dashboard/:id
// @access    Private/admin
const updateOverallStatByID = asyncHandler(async (req, res) => {
    const overallStats = await OverallStat.findById(req.params.id);
    if (overallStats) {
        overallStats.totalUsers = req.body.totalUsers || overallStats.totalUsers;
        overallStats.totalTransactions = req.body.totalTransactions || overallStats.totalTransactions;
        overallStats.totalExpectedBudget = req.body.totalExpectedBudget || overallStats.totalExpectedBudget;
        overallStats.totalPaidExpenses = req.body.totalPaidExpenses || overallStats.totalPaidExpenses;
        overallStats.year = req.body.year || overallStats.year;
        overallStats.monthlyData = req.body.monthlyData || overallStats.monthlyData;
        overallStats.dailyData = req.body.dailyData || overallStats.dailyData;
        overallStats.ebc = req.body.ebc || overallStats.ebc;
        overallStats.expensesByCategory = req.body.expensesByCategory || overallStats.expensesByCategory;
        overallStats.expectedBudgetByCategory = req.body.expectedBudgetByCategory || overallStats.expectedBudgetByCategory;
        
        const updatedData = await overallStats.save();
    
        res.status(200).json({
            _id: updatedData._id,
            totalUsers: updatedData.totalUsers,
            totalTransactions: updatedData.totalTransactions,
            totalExpectedBudget: updatedData.totalExpectedBudget,
            totalPaidExpenses: updatedData.totalPaidExpenses,
            year: updatedData.year,
            monthlyData: updatedData.monthlyData,
            dailyData: updatedData.dailyData,
            ebc: updatedData.ebc,
            expensesByCategory: updatedData.expensesByCategory,
            expectedBudgetByCategory: updatedData.expectedBudgetByCategory
        });
    } else {
      res.status(404);
      throw new Error('Data not found');
    }
  });

// @desc    Delete OverallStats by ID
// @route   DELETE /api/dashboard/:id
// @access  Private/Admin
const deleteOverallStatsByID = asyncHandler(async (req, res) => {
    const overallStats = await OverallStat.findById(req.params.id);
  
    if (overallStats) {
      await OverallStat.deleteOne({ _id: overallStats._id });
      res.json({ message: 'OverallStats is removed' });
    } else {
      res.status(404);
      throw new Error('OverallStats not found');
    }
  });
export {
    setOverallStats,
    // getMonthlyData,
    getOverallStats,
    // getBarChartData,
    getMonthlyOverallStats,
    getOverallStatsByID,
    deleteOverallStatsByID,
    updateOverallStatByID,
}