import express from 'express';
const router = express.Router();
import {
  getAllBundles,
  getBundleById,
} from '../controllers/databundleController.js';

// Route to get all bundles
router.get('/all', getAllBundles);

// Route to get a bundle by ID
router.get('/:id', getBundleById);

export default router;
