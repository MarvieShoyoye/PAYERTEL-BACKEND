import express from 'express';
const router = express.Router();
import { purchaseBundle } from '../controllers/datapurchaseController.js';

// Route to purchase a data bundle
router.post('/data-purchase', purchaseBundle);

export default router;
