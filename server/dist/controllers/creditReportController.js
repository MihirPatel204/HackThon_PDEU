"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBureauReport = exports.getCreditProfile = exports.aggregateCreditScore = exports.fetchCreditReports = void 0;
const User_1 = __importDefault(require("../models/User"));
const creditReportService_1 = require("../services/creditReportService");
const AggregatedCreditScore_1 = require("../models/AggregatedCreditScore");
const CreditReport_1 = require("../models/CreditReport");
// Fetch credit reports for a user from all bureaus
const fetchCreditReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Verify user exists
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Fetch reports from all bureaus
        const result = yield (0, creditReportService_1.fetchAndStoreCreditReports)(userId, user.ssn);
        res.status(200).json({
            message: 'Credit reports fetched successfully',
            success: result.success,
            failedBureaus: result.failedBureaus,
            reports: result.reports.map(report => ({
                id: report._id,
                bureau: report.bureau,
                isAvailable: report.isAvailable,
                reportDate: report.reportDate,
                errorMessage: report.errorMessage || undefined
            }))
        });
    }
    catch (error) {
        console.error('Error fetching credit reports:', error);
        res.status(500).json({
            message: 'Error fetching credit reports',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.fetchCreditReports = fetchCreditReports;
// Aggregate credit scores for a user
const aggregateCreditScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { method, weights } = req.body;
        // Verify user exists
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Validate aggregation method
        let aggregationMethod;
        if (method && Object.values(AggregatedCreditScore_1.AggregationMethod).includes(method)) {
            aggregationMethod = method;
        }
        else {
            aggregationMethod = AggregatedCreditScore_1.AggregationMethod.WEIGHTED;
        }
        // Validate custom weights if provided
        let customWeights;
        if (weights && aggregationMethod === AggregatedCreditScore_1.AggregationMethod.CUSTOM) {
            customWeights = {
                [CreditReport_1.CreditBureau.EXPERIAN]: weights.experian || 0.33,
                [CreditReport_1.CreditBureau.EQUIFAX]: weights.equifax || 0.33,
                [CreditReport_1.CreditBureau.TRANSUNION]: weights.transunion || 0.33
            };
        }
        // Aggregate scores
        const aggregatedScore = yield (0, creditReportService_1.aggregateAndStoreScore)(userId, aggregationMethod, customWeights);
        res.status(200).json({
            message: 'Credit score aggregated successfully',
            aggregatedScore: {
                id: aggregatedScore._id,
                score: aggregatedScore.aggregatedScore,
                method: aggregatedScore.method,
                riskCategory: aggregatedScore.riskCategory,
                recommendation: aggregatedScore.recommendation,
                date: aggregatedScore.aggregationDate,
                components: aggregatedScore.components.map(comp => ({
                    bureau: comp.bureau,
                    score: comp.score,
                    weight: comp.weight
                })),
                missingBureaus: aggregatedScore.missingBureaus
            }
        });
    }
    catch (error) {
        console.error('Error aggregating credit score:', error);
        res.status(500).json({
            message: 'Error aggregating credit score',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.aggregateCreditScore = aggregateCreditScore;
// Get latest credit reports and aggregated score for a user
const getCreditProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Verify user exists
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Get latest reports from all bureaus
        const bureauReports = yield (0, creditReportService_1.getCreditReportsByUser)(userId);
        // Get latest aggregated score
        const aggregatedScore = yield (0, creditReportService_1.getLatestAggregatedScore)(userId);
        // Prepare response
        const response = {
            userId,
            userName: `${user.firstName} ${user.lastName}`,
            reports: {}
        };
        // Add bureau reports
        Object.entries(bureauReports).forEach(([bureau, report]) => {
            var _a;
            response.reports[bureau] = report ? {
                id: report._id,
                bureau,
                isAvailable: report.isAvailable,
                reportDate: report.reportDate,
                creditScore: (_a = report.data) === null || _a === void 0 ? void 0 : _a.creditScore,
                errorMessage: report.errorMessage || undefined
            } : null;
        });
        // Add aggregated score if available
        if (aggregatedScore) {
            response.aggregatedScore = {
                id: aggregatedScore._id,
                score: aggregatedScore.aggregatedScore,
                method: aggregatedScore.method,
                riskCategory: aggregatedScore.riskCategory,
                recommendation: aggregatedScore.recommendation,
                date: aggregatedScore.aggregationDate,
                components: aggregatedScore.components.map(comp => ({
                    bureau: comp.bureau,
                    score: comp.score,
                    weight: comp.weight
                })),
                missingBureaus: aggregatedScore.missingBureaus
            };
        }
        res.status(200).json(response);
    }
    catch (error) {
        console.error('Error getting credit profile:', error);
        res.status(500).json({
            message: 'Error getting credit profile',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getCreditProfile = getCreditProfile;
// Get detailed report from a specific bureau
const getBureauReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, bureau } = req.params;
        // Verify user exists
        const user = yield User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        // Validate bureau parameter
        if (!Object.values(CreditReport_1.CreditBureau).includes(bureau)) {
            res.status(400).json({ message: 'Invalid credit bureau specified' });
            return;
        }
        // Get latest reports from all bureaus
        const bureauReports = yield (0, creditReportService_1.getCreditReportsByUser)(userId);
        const report = bureauReports[bureau];
        if (!report) {
            res.status(404).json({ message: `No credit report found for ${bureau}` });
            return;
        }
        if (!report.isAvailable) {
            res.status(404).json({
                message: `Credit report from ${bureau} is unavailable`,
                error: report.errorMessage
            });
            return;
        }
        res.status(200).json({
            id: report._id,
            bureau: report.bureau,
            reportDate: report.reportDate,
            reportId: report.reportId,
            data: report.data
        });
    }
    catch (error) {
        console.error('Error getting bureau report:', error);
        res.status(500).json({
            message: 'Error getting bureau report',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getBureauReport = getBureauReport;
