import express from 'express';
import { 
    setDebt,
    getDebts,
    getDebtByID,
    deleteDebtByID,
    updateDebtByID,
} from '../controllers/debtController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(setDebt).get(protect, admin, getDebts);
router.route('/:id').get(protect, admin, getDebtByID).put(protect, admin, updateDebtByID).delete(protect, admin, deleteDebtByID);

export default router;
