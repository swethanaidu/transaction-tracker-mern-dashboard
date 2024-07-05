import express from 'express';
import { 
    setVendor,
    getVendors,
    getVendorByID,
    deleteVendorByID,
    updateVendorByID,
} from '../controllers/vendorController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(setVendor).get(protect, admin, getVendors);
router.route('/:id').get(protect, admin, getVendorByID).put(protect, admin, updateVendorByID).delete(protect, admin, deleteVendorByID);

export default router;
