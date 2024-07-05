import asyncHandler from 'express-async-handler';
import Vendor from '../models/vendorModel.js';

// @desc      create a new Vendor
// route      POST /api/vendor
// @access    Private/admin

const setVendor = asyncHandler(async (req, res) => {
   const {
    name,
    description,
    ecId,
    vendorStatus,
   } = req.body; 
   
   const vendor =  await Vendor.create({
    name,
    description,
    ecId,
    vendorStatus,
   });
    if(vendor) {
        res.status(200).json({
          _id: vendor._id,
          name: vendor.name,
          description: vendor.description,
          ecId: vendor.ecId,
          vendorStatus: vendor.vendorStatus,
        });
    } else {
        res.status(400);
        throw new Error('Invalid Vendor data')
    }
});

  
// @desc      get all Vendors
// route      GET /api/vendors
// @access    Private/admin
const getVendors = asyncHandler(async(req, res) => {
    // const vendors = await Vendor.find();
    // res.status(200).json(vendors);
    const vendors = await Vendor.aggregate([

      // Join with user_info table
      {
          $lookup:{
              from: "expensescategories",       // other table name
              localField: "ecId",   // name of users table field
              foreignField: "_id", // name of userinfo table field
              as: "ec_info"         // alias for userinfo table
          }
      },
      {   $unwind:"$ec_info" },     // $unwind used for getting data in object or for one record only
      // define which fields are you want to fetch
      {   
          $project:{
              _id : 1,
              name : 1,
              ecId : 1,
              description : 1,
              vendorStatus : 1,
              ecName : "$ec_info.name",
          } 
      }
  ]);
  res.status(200).json(vendors);
  // console.log(vendors);
});

// @desc      Get Vendor by ID
// route      GET /api/vendor/:id
// @access    Private/Admin
const getVendorByID = asyncHandler(async(req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json(vendor);
});


// @desc      upadate Vendor by ID
// route      PUT /api/vendor/:id
// @access    Private/admin
const updateVendorByID = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
    if (vendor) {
        vendor.name = req.body.name || vendor.name;
        vendor.description = req.body.description || vendor.description;
        vendor.ecId = req.body.ecId || vendor.ecId; 
        vendor.vendorStatus = req.body.vendorStatus || vendor.vendorStatus;
         
        const updatedData = await vendor.save();
    
        res.status(200).json({
            _id: updatedData._id,
            name: updatedData.name,
            description: updatedData.description,
            ecId: updatedData.ecId,
            vendorStatus: updatedData.vendorStatus,
            
        });
    } else {
      res.status(404);
      throw new Error('Data not found');
    }
  });

// @desc    Delete Vendor by ID
// @route   DELETE /api/vendor/:id
// @access  Private/Admin
const deleteVendorByID = asyncHandler(async (req, res) => {
    const vendor = await Vendor.findById(req.params.id);
  
    if (vendor) {
      await Vendor.deleteOne({ _id: vendor._id });
      res.json({ message: 'Vendor is removed' });
    } else {
      res.status(404);
      throw new Error('Vendor not found');
    }
  });
export {
    setVendor,
    getVendors,
    getVendorByID,
    deleteVendorByID,
    updateVendorByID,
}