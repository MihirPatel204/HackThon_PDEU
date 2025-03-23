"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getCreditReportsByUser = exports.getLatestAggregatedScore = exports.aggregateAndStoreScore = exports.fetchAndStoreCreditReports = void 0;
const experianService_1 = require("./experianService");
const equifaxService_1 = require("./equifaxService");
const transunionService_1 = require("./transunionService");
const creditScoringService_1 = require("./creditScoringService");
const CreditReport_1 = __importStar(require("../models/CreditReport"));
const AggregatedCreditScore_1 = __importStar(require("../models/AggregatedCreditScore"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Fetches credit reports from all bureaus and stores them in the database
 */
const fetchAndStoreCreditReports = (userId, ssn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
        // Fetch reports from all three bureaus concurrently
        const [experianResult, equifaxResult, transunionResult] = yield Promise.all([
            (0, experianService_1.getExperianCreditReport)(ssn),
            (0, equifaxService_1.getEquifaxCreditReport)(ssn),
            (0, transunionService_1.getTransunionCreditReport)(ssn)
        ]);
        const reports = [];
        const failedBureaus = [];
        // Process Experian result
        const experianReport = new CreditReport_1.default({
            userId,
            bureau: CreditReport_1.CreditBureau.EXPERIAN,
            reportDate: new Date(),
            reportId: experianResult.reportId || `exp-${Date.now()}`,
            data: experianResult.data || {},
            isAvailable: experianResult.success,
            errorMessage: experianResult.error
        });
        yield experianReport.save();
        reports.push(experianReport);
        if (!experianResult.success)
            failedBureaus.push(CreditReport_1.CreditBureau.EXPERIAN);
        // Process Equifax result
        const equifaxReport = new CreditReport_1.default({
            userId,
            bureau: CreditReport_1.CreditBureau.EQUIFAX,
            reportDate: new Date(),
            reportId: equifaxResult.reportId || `eqf-${Date.now()}`,
            data: equifaxResult.data || {},
            isAvailable: equifaxResult.success,
            errorMessage: equifaxResult.error
        });
        yield equifaxReport.save();
        reports.push(equifaxReport);
        if (!equifaxResult.success)
            failedBureaus.push(CreditReport_1.CreditBureau.EQUIFAX);
        // Process TransUnion result
        const transunionReport = new CreditReport_1.default({
            userId,
            bureau: CreditReport_1.CreditBureau.TRANSUNION,
            reportDate: new Date(),
            reportId: transunionResult.reportId || `tu-${Date.now()}`,
            data: transunionResult.data || {},
            isAvailable: transunionResult.success,
            errorMessage: transunionResult.error
        });
        yield transunionReport.save();
        reports.push(transunionReport);
        if (!transunionResult.success)
            failedBureaus.push(CreditReport_1.CreditBureau.TRANSUNION);
        return {
            reports,
            success: failedBureaus.length < 3, // As long as at least one bureau succeeds
            failedBureaus
        };
    }
    catch (error) {
        console.error('Error fetching credit reports:', error);
        throw error;
    }
});
exports.fetchAndStoreCreditReports = fetchAndStoreCreditReports;
/**
 * Aggregates credit reports and stores the result
 */
const aggregateAndStoreScore = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, method = AggregatedCreditScore_1.AggregationMethod.WEIGHTED, customWeights) {
    try {
        // Get the latest reports for this user
        const latestReports = yield CreditReport_1.default.find({ userId })
            .sort({ reportDate: -1 })
            .limit(3);
        // Group by bureau to get the latest report from each bureau
        const bureauMap = {};
        latestReports.forEach(report => {
            if (!bureauMap[report.bureau] || report.reportDate > bureauMap[report.bureau].reportDate) {
                bureauMap[report.bureau] = report;
            }
        });
        const reportsToAggregate = Object.values(bureauMap);
        if (reportsToAggregate.length === 0) {
            throw new Error('No credit reports available for aggregation');
        }
        // Perform the aggregation
        const aggregation = (0, creditScoringService_1.aggregateCreditScores)(reportsToAggregate, method, customWeights);
        // Create and save the aggregated score
        const aggregatedScore = new AggregatedCreditScore_1.default({
            userId,
            aggregatedScore: aggregation.aggregatedScore,
            method,
            components: aggregation.components.map(component => ({
                bureau: component.bureau,
                score: component.score,
                weight: component.weight,
                reportId: new mongoose_1.default.Types.ObjectId(component.reportId)
            })),
            riskCategory: aggregation.riskCategory,
            recommendation: aggregation.recommendation,
            aggregationDate: new Date(),
            missingBureaus: aggregation.missingBureaus
        });
        yield aggregatedScore.save();
        return aggregatedScore;
    }
    catch (error) {
        console.error('Error aggregating credit scores:', error);
        throw error;
    }
});
exports.aggregateAndStoreScore = aggregateAndStoreScore;
/**
 * Gets a user's latest aggregated credit score
 */
const getLatestAggregatedScore = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestScore = yield AggregatedCreditScore_1.default.findOne({ userId })
            .sort({ aggregationDate: -1 })
            .populate({
            path: 'components.reportId',
            model: 'CreditReport'
        });
        return latestScore;
    }
    catch (error) {
        console.error('Error getting latest aggregated score:', error);
        throw error;
    }
});
exports.getLatestAggregatedScore = getLatestAggregatedScore;
/**
 * Gets credit reports from all bureaus for a user
 */
const getCreditReportsByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield CreditReport_1.default.find({ userId })
            .sort({ reportDate: -1 });
        // Group by bureau and get the latest for each
        const bureauMap = {
            [CreditReport_1.CreditBureau.EXPERIAN]: null,
            [CreditReport_1.CreditBureau.EQUIFAX]: null,
            [CreditReport_1.CreditBureau.TRANSUNION]: null
        };
        reports.forEach(report => {
            var _a;
            if (!bureauMap[report.bureau] ||
                report.reportDate > (((_a = bureauMap[report.bureau]) === null || _a === void 0 ? void 0 : _a.reportDate) || new Date(0))) {
                bureauMap[report.bureau] = report;
            }
        });
        return bureauMap;
    }
    catch (error) {
        console.error('Error getting credit reports by user:', error);
        throw error;
    }
});
exports.getCreditReportsByUser = getCreditReportsByUser;
