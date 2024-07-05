import express from 'express';
import { 
    setBank,
    getBanks,
    getBankByID,
    deleteBankByID,
    updateBankByID,
} from '../controllers/bankController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(setBank).get(protect, admin, getBanks);
router.route('/:id').get(protect, admin, getBankByID).put(protect, admin, updateBankByID).delete(protect, admin, deleteBankByID);

export default router;
