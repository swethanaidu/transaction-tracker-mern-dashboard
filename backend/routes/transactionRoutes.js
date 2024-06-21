import express from 'express';
import { 
    setTransaction,
    getTransactions,
    getTransactionByID,
    deleteTransactionByID,
    updateTransactionByID,
} from '../controllers/transactionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(setTransaction).get(protect, admin, getTransactions);
router.route('/:id').get(protect, admin, getTransactionByID).put(protect, admin, updateTransactionByID).delete(protect, admin, deleteTransactionByID);

export default router;
