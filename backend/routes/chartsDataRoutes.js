import express from 'express';
import { 
    getBarChartData, 
    getMonthlyOverallStats,
} from '../controllers/chartsDataController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.route('/').post(setOverallStats).get(protect, admin, getOverallStats);
// router.route('/:id').get(protect, admin, getOverallStatsByID).put(protect, admin, updateOverallStatByID).delete(protect, admin, deleteOverallStatsByID);

router.route('/getMonthlyData').get(protect, admin, getMonthlyOverallStats);
router.route('/getBarChartData').get(protect, admin, getBarChartData);

// router.route('/getMonthlyData').get(protect, admin, getMonthlyData);
export default router;
