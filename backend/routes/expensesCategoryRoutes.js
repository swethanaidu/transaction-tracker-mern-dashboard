import express from 'express';
import { 
    setExpensesCategory,
    getExpensesCategories,
    getExpensesCategoryByID,
    deleteExpensesCategoryByID,
    updateExpensesCategoryByID,
} from '../controllers/expensesCategoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, setExpensesCategory).get(protect, admin, getExpensesCategories);
router.route('/:id').get(protect, admin, getExpensesCategoryByID).put(protect, admin, updateExpensesCategoryByID).delete(protect, admin, deleteExpensesCategoryByID);

export default router;
