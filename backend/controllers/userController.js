import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// import OverallStat from "../models/overAllStatsModel.js";

// @desc      Auth user/set token
// route      POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists && (await userExists.matchPassword(password))) {
    generateToken(res, userExists._id);
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
      city: userExists.city,
      state: userExists.state,
      country: userExists.country,
      occupation: userExists.occupation,
      phoneNumber: userExists.phoneNumber,
      gender: userExists.gender,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc      Register a new user
// route      POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    city,
    state,
    country,
    occupation,
    phoneNumber,
    transactions,
    role,
    gender
  } = req.body;

  //const year = 2024;
//const OverallStatExists = await OverallStat.findOne({ year });
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    city,
    state,
    country,
    occupation,
    phoneNumber,
    transactions,
    role,
    gender
  });
  if (user) {
    // if (OverallStatExists) {
    //   OverallStatExists.totalUsers = OverallStatExists.totalUsers + 1;
    //   await OverallStatExists.save();
    // }

    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc      Logout user
// route      POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logged Out" });
});

// @desc      Get user profile
// route      GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    city: req.user.city,
    state: req.user.state,
    country: req.user.country,
    occupation: req.user.occupation,
    phoneNumber: req.user.phoneNumber,
    role: req.user.role,
    gender: req.user.gender
  };
  res.status(200).json(user);
});

// @desc      Get user profile
// route      PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // console.log("hi");
  const user = await User.findById(req.user._id);
  // console.log(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.country = req.body.country || user.country;
    user.occupation = req.body.occupation || user.occupation;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.role = req.body.role || user.role;
    user.gender = req.body.gender || user.gender;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      city: updatedUser.city,
      state: updatedUser.state,
      country: updatedUser.country,
      occupation: updatedUser.occupation,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      gender: updatedUser.gender,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc      Get user profile
// route      GET /api/users
// @access    Private/Admin
const getAllUserDetails = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// @desc      Get user profile by ID
// route      GET /api/users/:id
// @access    Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const user = await User.findById(req.params.id);
  // console.log(user);
  res.status(200).json(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      country: user.country,
      occupation: user.occupation,
      phoneNumber: user.phoneNumber,
      role: user.role,
      gender: user.gender,
    }
  );
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    user.country = req.body.country || user.country;
    user.occupation = req.body.occupation || user.occupation;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.role = req.body.role || user.role;
    user.gender = req.body.gender || user.gender;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      city: updatedUser.city,
      state: updatedUser.state,
      country: updatedUser.country,
      occupation: updatedUser.occupation,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      gender: updatedUser.gender,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  ///const year = 2024;
 // const OverallStatExists = await OverallStat.findOne({ year });

  if (user) {
    // if (OverallStatExists) {
    //     OverallStatExists.totalUsers = OverallStatExists.totalUsers - 1;
    //     await OverallStatExists.save();
    // }
    if (user.isAdmin) {
    
      res.status(400);
      throw new Error("Can not delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  getAllUserDetails,
  updateUserProfile,
  getUserByID,
  updateUserByID,
  deleteUserByID,
};
