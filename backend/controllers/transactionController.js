import asyncHandler from 'express-async-handler';
import OverallStat from '../models/overAllStatsModel.js';
import Transaction from '../models/transactionModel.js';
 
// @desc      create a new Transaction
// route      POST /api/transactions
// @access    Private/admin

const setTransaction = asyncHandler(async (req, res) => {
   const {
    title,
    description,
    userId,
    ecId,
    cost,
    paidDate,
    status 
   } = req.body; 
   const transaction =  await Transaction.create({
        title,
        description,
        userId,
        ecId,
        cost,
        paidDate,
        status 
   });
    if(transaction) {
        res.status(200).json({
          _id: transaction._id,
          title: transaction.title,
          description: transaction.description,
          userId: transaction.userId,
          ecId: transaction.ecId,
          cost: transaction.cost,
          paidDate: transaction.paidDate,
          status: transaction.status,
        });
    } else {
        res.status(400);
        throw new Error('Invalid Transaction data')
    }
});

  
// @desc      get all Transaction
// route      GET /api/transactions
// @access    Private/admin
const getTransactions = asyncHandler(async(req, res) => {
    // const transactions = await Transaction.find();
    // res.status(200).json(transactions);
    const transactions = await Transaction.aggregate([

      // Join with user_info table
      {
          $lookup:{
              from: "users",       // other table name
              localField: "userId",   // name of users table field
              foreignField: "_id", // name of userinfo table field
              as: "user_info"         // alias for userinfo table
          }
      },
      {   $unwind:"$user_info" },     // $unwind used for getting data in object or for one record only
  
      // Join with user_role table
      {
          $lookup:{
              from: "expensescategories", 
              localField: "ecId", 
              foreignField: "_id",
              as: "ec_data"
          }
      },
      {   $unwind:"$ec_data" },
  
      // define which fields are you want to fetch
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
          } 
      }
  ]);
  res.status(200).json(transactions);
  // console.log(transactions);
});

// @desc      Get transaction by ID
// route      GET /api/transactions/:id
// @access    Private/Admin
const getTransactionByID = asyncHandler(async(req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    res.status(200).json(transaction);

    
});


// @desc      upadate transaction by ID
// route      PUT /api/transactions/:id
// @access    Private/admin
const updateTransactionByID = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
    if (transaction) {
        transaction.title = req.body.title || transaction.title;
        transaction.description = req.body.description || transaction.description;
        transaction.userId = req.body.userId || transaction.userId;
        transaction.ecId = req.body.ecId || transaction.ecId;
        transaction.cost = req.body.cost || transaction.cost;
        transaction.paidDate = req.body.paidDate || transaction.paidDate;
        transaction.status = req.body.status || transaction.status;
         
        const updatedData = await transaction.save();
    
        res.status(200).json({
            _id: updatedData._id,
            title: updatedData.title,
            description: updatedData.description,
            userId: updatedData.userId,
            ecId: updatedData.ecId,
            cost: updatedData.cost,
            paidDate: updatedData.paidDate,
            status: updatedData.status,
        });
    } else {
      res.status(404);
      throw new Error('Data not found');
    }
  });

// @desc    Delete transaction by ID
// @route   DELETE /api/transactions/:id
// @access  Private/Admin
const deleteTransactionByID = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);
  
    if (transaction) {
      await Transaction.deleteOne({ _id: transaction._id });
      res.json({ message: 'transaction is removed' });
    } else {
      res.status(404);
      throw new Error('transaction not found');
    }
  });
export {
    setTransaction,
    getTransactions,
    getTransactionByID,
    deleteTransactionByID,
    updateTransactionByID,
}