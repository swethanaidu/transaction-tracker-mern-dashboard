import asyncHandler from 'express-async-handler';
import Bank from '../models/bankModel.js';

// @desc      create a new Bank
// route      POST /api/banks
// @access    Private/admin

const setBank = asyncHandler(async (req, res) => {
   const {
    name,
    accountNumber,
    userId,
    accountType,
    amount,
    bankStatus 
   } = req.body; 
   
   const bank =  await Bank.create({
        name,
        accountNumber,
        userId,
        accountType,
        amount,
        bankStatus, 
   });
    if(bank) {
        res.status(200).json({
          _id: bank._id,
          name: bank.name,
          accountNumber: bank.accountNumber,
          userId: bank.userId,
          accountType: bank.accountType,
          amount: bank.amount,
          bankStatus: bank.bankStatus,
        });
    } else {
        res.status(400);
        throw new Error('Invalid Bank data')
    }
});

  
// @desc      get all bank
// route      GET /api/banks
// @access    Private/admin
const getBanks = asyncHandler(async(req, res) => {
    // const banks = await bank.find();
    // res.status(200).json(banks);
    const banks = await Bank.aggregate([

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
      // define which fields are you want to fetch
      {   
          $project:{
              _id : 1,
              name : 1,
              userId : 1,
              accountNumber : 1,
              accountType : 1,
              amount : 1,
              bankStatus : 1,
              userName : "$user_info.name",
          } 
      }
  ]);
  res.status(200).json(banks);
  // console.log(banks);
});

// @desc      Get bank by ID
// route      GET /api/bank/:id
// @access    Private/Admin
const getBankByID = asyncHandler(async(req, res) => {
    const bank = await Bank.findById(req.params.id);
    res.status(200).json(bank);
});


// @desc      upadate bank by ID
// route      PUT /api/bank/:id
// @access    Private/admin
const updateBankByID = asyncHandler(async (req, res) => {
    const bank = await Bank.findById(req.params.id);
    if (bank) {
        bank.name = req.body.name || bank.name;
        bank.accountNumber = req.body.accountNumber || bank.accountNumber;
        bank.userId = req.body.userId || bank.userId;
        bank.accountType = req.body.accountType || bank.accountType;
        bank.amount = req.body.amount || bank.amount;
        bank.bankStatus = req.body.bankStatus || bank.bankStatus;
         
        const updatedData = await bank.save();
    
        res.status(200).json({
            _id: updatedData._id,
            name: updatedData.name,
            accountNumber: updatedData.accountNumber,
            userId: updatedData.userId,
            accountType: updatedData.accountType,
            amount: updatedData.amount,
            bankStatus: updatedData.bankStatus,
        });
    } else {
      res.status(404);
      throw new Error('Data not found');
    }
  });

// @desc    Delete bank by ID
// @route   DELETE /api/bank/:id
// @access  Private/Admin
const deleteBankByID = asyncHandler(async (req, res) => {
    const bank = await Bank.findById(req.params.id);
  
    if (bank) {
      await Bank.deleteOne({ _id: bank._id });
      res.json({ message: 'Bank is removed' });
    } else {
      res.status(404);
      throw new Error('Bank not found');
    }
  });
export {
    setBank,
    getBanks,
    getBankByID,
    deleteBankByID,
    updateBankByID,
}