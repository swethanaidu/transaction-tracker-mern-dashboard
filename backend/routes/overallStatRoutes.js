import express from 'express';
import { 
    setOverallStats,
    getOverallStats,
    getOverallStatsByID,
    deleteOverallStatsByID,
    updateOverallStatByID,
    // getMonthlyData,
    // getBarChartData,
} from '../controllers/overallStatsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(setOverallStats).get(protect, admin, getOverallStats);
router.route('/:id').get(protect, admin, getOverallStatsByID).put(protect, admin, updateOverallStatByID).delete(protect, admin, deleteOverallStatsByID);
// router.route('/getMonthlyData').get(protect, admin, getMonthlyOverallStats)
// router.route('/getMonthlyData').get(protect, admin, getMonthlyData);
// router.route('/getBarChartData').get(protect, admin, getBarChartData);
export default router;
