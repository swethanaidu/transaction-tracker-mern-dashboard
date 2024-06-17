import asyncHandler from 'express-async-handler';
import OverallStat from '../models/overAllStatsModel.js';
 
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
    const overallStats = await OverallStat.find();
    // console.log(overallStat);
    res.status(200).json(overallStats);
    
});

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
    getOverallStats,
    getOverallStatsByID,
    deleteOverallStatsByID,
    updateOverallStatByID,
}