import express from 'express';
import {
  fetchCreditReports,
  aggregateCreditScore,
  getCreditProfile,
  getBureauReport
} from '../controllers/creditReportController';

const router = express.Router();

// Fetch credit reports from all bureaus
router.post('/users/:userId/fetch', fetchCreditReports);

// Aggregate credit score using specified method
router.post('/users/:userId/aggregate', aggregateCreditScore);

// Get latest credit profile (reports + aggregated score)
router.get('/users/:userId/profile', getCreditProfile);

// Get detailed report from a specific bureau
router.get('/users/:userId/bureaus/:bureau', getBureauReport);

export default router; 