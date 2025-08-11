import asyncHandler from 'express-async-handler';
import Debt from '../models/debtModel.js';

// @desc      create a new Debt
// route      POST /api/debts
// @access    Private/admin

const setDebt = asyncHandler(async (req, res) => {
   const {
    title,
    description,
    userId,
    ecId,
    vendorId,
    cost,
    paidDate,
    paymentMode,
    vendorPaymentType,
    vendorIndivdualName,
    status 
   } = req.body; 
   
   const debt =  await Debt.create({
        title,
        description,
        userId,
        ecId,
        cost,
        paidDate,
        vendorId,
        paymentMode,
        vendorPaymentType,
        vendorIndivdualName,
        status 
   });
    if(debt) {
        res.status(200).json({
          _id: debt._id,
          title: debt.title,
          description: debt.description,
          userId: debt.userId,
          ecId: debt.ecId,
          cost: debt.cost,
          paidDate: debt.paidDate,
          status: debt.status,
          vendorId: debt.vendorId,
          paymentMode: debt.paymentMode,
          vendorPaymentType: debt.vendorPaymentType,
          vendorIndivdualName: debt.vendorIndivdualName,
        });
    } else {
        res.status(400);
        throw new Error('Invalid debt data')
    }
});

  
// @desc      get all Debt
// route      GET /api/debts
// @access    Private/admin
const getDebts = asyncHandler(async(req, res) => {
    // const debts = await Debt.find();
    // res.status(200).json(debts);
    const debtsData = await Debt.aggregate([

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
            from: "vendors", 
            localField: "vendorId", 
            foreignField: "_id",
            as: "vendor_data"
        }
    },
    {   $unwind:"$vendor_data" },
  
      // define which fields are you want to fetch
      {   
          $project:{
              _id : 1,
              title : 1,
              userId : 1,
              description : 1,
              ecId : 1,
              vendorId : 1,
              cost : 1,
              paidDate : 1,
              paymentMode: 1,
              vendorPaymentType: 1,
              vendorIndivdualName: 1,
              status : 1,
              userName : "$user_info.name",
              ecName : "$ec_data.name",
              vendorName: "$vendor_data.name",
          } 
      }
  ]);
  let debts = [...debtsData].sort((a, b) => {
    return b.paidDate - a.paidDate;
  });
  
  res.status(200).json(debts);
// console.log(debts);
});

// @desc      Get debt by ID
// route      GET /api/debts/:id
// @access    Private/Admin
const getDebtByID = asyncHandler(async(req, res) => {
    const debt = await Debt.findById(req.params.id);
    res.status(200).json(debt);

    
});


// @desc      upadate debt by ID
// route      PUT /api/debts/:id
// @access    Private/admin
const updateDebtByID = asyncHandler(async (req, res) => {
    const debt = await Debt.findById(req.params.id);
    // console.log(req.body);
    if (debt) {
        debt.title = req.body.title || debt.title;
        debt.description = req.body.description || debt.description;
        debt.userId = req.body.userId || debt.userId;
        debt.ecId = req.body.ecId || debt.ecId;
        debt.cost = req.body.cost || debt.cost;
        debt.paidDate = req.body.paidDate || debt.paidDate;
        debt.status = req.body.status || debt.status;
        debt.vendorId = req.body.vendorId || debt.vendorId,
        debt.paymentMode = req.body.paymentMode || debt.paymentMode,
        debt.vendorPaymentType = req.body.vendorPaymentType || debt.vendorPaymentType,
        debt.vendorIndivdualName = req.body.vendorIndivdualName || debt.vendorIndivdualName

        const updatedData = await debt.save();
    
        res.status(200).json({
            _id: updatedData._id,
            title: updatedData.title,
            description: updatedData.description,
            userId: updatedData.userId,
            ecId: updatedData.ecId,
            cost: updatedData.cost,
            paidDate: updatedData.paidDate,
            status: updatedData.status,
            vendorId: updatedData.vendorId,
            paymentMode: updatedData.paymentMode,
            vendorPaymentType: updatedData.vendorPaymentType,
            vendorIndivdualName: updatedData.vendorIndivdualName,
        });
    } else {
      res.status(404);
      throw new Error('Data not found');
    }
  });

// @desc    Delete debt by ID
// @route   DELETE /api/debts/:id
// @access  Private/Admin
const deleteDebtByID = asyncHandler(async (req, res) => {
    const debt = await Debt.findById(req.params.id);
  
    if (debt) {
      await Debt.deleteOne({ _id: debt._id });
      res.json({ message: 'debt is removed' });
    } else {
      res.status(404);
      throw new Error('debt not found');
    }
  });
export {
    setDebt,
    getDebts,
    getDebtByID,
    deleteDebtByID,
    updateDebtByID,
}