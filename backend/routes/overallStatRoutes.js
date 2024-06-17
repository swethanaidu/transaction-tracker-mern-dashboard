import express from 'express';
import { 
    setOverallStats,
    getOverallStats,
    getOverallStatsByID,
    deleteOverallStatsByID,
    updateOverallStatByID,
} from '../controllers/overallStatsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(setOverallStats).get(protect, admin, getOverallStats);
router.route('/:id').get(protect, admin, getOverallStatsByID).put(protect, admin, updateOverallStatByID).delete(protect, admin, deleteOverallStatsByID);

export default router;
