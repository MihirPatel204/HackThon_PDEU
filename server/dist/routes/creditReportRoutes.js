"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const creditReportController_1 = require("../controllers/creditReportController");
const router = express_1.default.Router();
// Fetch credit reports from all bureaus
router.post('/users/:userId/fetch', creditReportController_1.fetchCreditReports);
// Aggregate credit score using specified method
router.post('/users/:userId/aggregate', creditReportController_1.aggregateCreditScore);
// Get latest credit profile (reports + aggregated score)
router.get('/users/:userId/profile', creditReportController_1.getCreditProfile);
// Get detailed report from a specific bureau
router.get('/users/:userId/bureaus/:bureau', creditReportController_1.getBureauReport);
exports.default = router;
