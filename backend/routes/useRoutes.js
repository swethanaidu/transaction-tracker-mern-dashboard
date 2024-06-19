import express from 'express';
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getAllUserDetails,
    updateUserProfile,
    updateUserByID,
    deleteUserByID,
    getUserByID
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getAllUserDetails);
router.route('/profile').get(protect, getUserProfile).put(protect , updateUserProfile);

router.route('/:id').get(protect, admin, getUserByID).put(protect, admin, updateUserByID).delete(protect, admin, deleteUserByID);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
 

export default router;
