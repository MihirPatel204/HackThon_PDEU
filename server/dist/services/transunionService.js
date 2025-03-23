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
exports.getTransunionCreditReport = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TRANSUNION_API_KEY = process.env.TRANSUNION_API_KEY;
// In a real app, this would be the actual TransUnion API endpoint
const TRANSUNION_API_URL = 'https://api.transunion.com/credit-report';
// Simulated service since we can't actually connect to TransUnion API
const getTransunionCreditReport = (ssn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // In a real implementation, this would make an actual API call to TransUnion
        // axios.get(`${TRANSUNION_API_URL}/${ssn}`, {
        //   headers: {
        //     'Authorization': `Bearer ${TRANSUNION_API_KEY}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // For demo purposes, we're simulating the API response
        // Simulate occasional API failures (12% of the time)
        if (Math.random() < 0.12) {
            throw new Error('TransUnion service temporarily unavailable');
        }
        // Generate a simulated credit report with randomized data
        const mockReportId = `TU-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const baseScore = 590 + Math.floor(Math.random() * 260);
        const mockCreditReport = {
            creditScore: baseScore,
            utilizationRate: Math.random() * 0.75,
            accountsCount: 3 + Math.floor(Math.random() * 17),
            delinquentAccountsCount: Math.floor(Math.random() * 3),
            inquiriesLast6Months: Math.floor(Math.random() * 5),
            oldestAccountAge: 20 + Math.floor(Math.random() * 130), // 1.7-12.5 years in months
            totalDebt: 11000 + Math.random() * 89000,
            monthlyPayments: 450 + Math.random() * 2550,
            publicRecords: Math.floor(Math.random() * 2),
            derogativeMarks: Math.floor(Math.random() * 3),
            paymentHistory: {
                onTime: 89 + Math.floor(Math.random() * 11),
                late30Days: Math.floor(Math.random() * 5),
                late60Days: Math.floor(Math.random() * 3),
                late90Days: Math.floor(Math.random() * 2)
            },
            creditMix: {
                revolvingAccounts: 2 + Math.floor(Math.random() * 5),
                installmentAccounts: 1 + Math.floor(Math.random() * 3),
                mortgageAccounts: Math.floor(Math.random() * 2),
                openAccounts: 3 + Math.floor(Math.random() * 7)
            },
            additionalData: {
                source: 'TransUnion',
                reportType: 'Standard',
                collectionsCount: Math.floor(Math.random() * 2)
            }
        };
        return {
            success: true,
            data: mockCreditReport,
            reportId: mockReportId
        };
    }
    catch (error) {
        console.error('TransUnion API Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
});
exports.getTransunionCreditReport = getTransunionCreditReport;
