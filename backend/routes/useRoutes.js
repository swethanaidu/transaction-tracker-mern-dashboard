import express from 'express';
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getAllUserDetails,
    updateUserProfile,
    updateUserByID,
    deleteUserByID
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getAllUserDetails);
router.route('/:id').put(protect, admin, updateUserByID).delete(protect, admin, deleteUserByID);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect , updateUserProfile);
 

export default router;
