import asyncHandler from 'express-async-handler';
import ExpensesCategory from '../models/expensesCategoryModel.js';
 

// @desc      create a new Expenses Category
// route      POST /api/expensesCategories
// @access    Private/admin

const setExpensesCategory = asyncHandler(async (req, res) => {
   const {
        name,
        description,
        expectedBudget,
        startDate,
        endDate,
        workStatus,
   } = req.body; 
  //  console.log(req.body);
   const expensesCategoryExists = await ExpensesCategory.findOne({name});
   if(expensesCategoryExists){
        res.status(400);
        throw new Error('Expenses Category already exists');
   }
   const expensesCategory =  await ExpensesCategory.create({
        name,
        description,
        expectedBudget,
        startDate,
        endDate,
        workStatus,
   });
    if(expensesCategory) {
        res.status(200).json({
            description: expensesCategory.description,
            name: expensesCategory.name,
            expectedBudget: expensesCategory.expectedBudget,
            startDate: expensesCategory.startDate,
            endDate: expensesCategory.endDate,
            workStatus: expensesCategory.workStatus
        });
    } else {
        res.status(400);
        throw new Error('Invalid expenses category data')
    }
});

  
// @desc      get all Expenses Category
// route      GET /api/expensesCategories
// @access    Private/admin
const getExpensesCategories = asyncHandler(async(req, res) => {
    const expensesCategories = await ExpensesCategory.find();
    // console.log(expensesCategories);
    res.status(200).json(expensesCategories)
});

// @desc      Get Expenses Category by ID
// route      GET /api/expensesCategories/:id
// @access    Private/Admin
const getExpensesCategoryByID = asyncHandler(async(req, res) => {
    const expensesCategory = await ExpensesCategory.findById(req.params.id);
    res.status(200).json(expensesCategory);
});


// @desc      upadate Expenses Category by ID
// route      PUT /api/expensesCategories/:id
// @access    Private/admin
const updateExpensesCategoryByID = asyncHandler(async (req, res) => {
    const expensesCategory = await ExpensesCategory.findById(req.params.id);
    if (expensesCategory) {
        expensesCategory.name = req.body.name || expensesCategory.name;
        expensesCategory.description = req.body.description || expensesCategory.description;
        expensesCategory.expectedBudget = req.body.expectedBudget || expensesCategory.expectedBudget;
        expensesCategory.startDate = req.body.startDate || expensesCategory.startDate;
        expensesCategory.endDate = req.body.endDate || expensesCategory.endDate;
        expensesCategory.workStatus = req.body.workStatus || expensesCategory.workStatus;
        
        const updatedData = await expensesCategory.save();
    
        res.status(200).json({
            _id: updatedData._id,
            name: updatedData.name,
            description: updatedData.description,
            expectedBudget: updatedData.expectedBudget,
            startDate: updatedData.startDate,
            endDate: updatedData.endDate,
            workStatus: updatedData.workStatus,
        });
    } else {
      res.status(404);
      throw new Error('Data not found');
    }
  });

// @desc    Delete Expenses Category by ID
// @route   DELETE /api/expensesCategories/:id
// @access  Private/Admin
const deleteExpensesCategoryByID = asyncHandler(async (req, res) => {
    const expensesCategory = await ExpensesCategory.findById(req.params.id);
  
    if (expensesCategory) {
      await ExpensesCategory.deleteOne({ _id: expensesCategory._id });
      res.json({ message: 'Expenses Category is removed' });
    } else {
      res.status(404);
      throw new Error('Expenses Category not found');
    }
  });
export {
    setExpensesCategory,
    getExpensesCategories,
    getExpensesCategoryByID,
    deleteExpensesCategoryByID,
    updateExpensesCategoryByID,
}