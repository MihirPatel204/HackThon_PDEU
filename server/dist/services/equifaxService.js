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
exports.getEquifaxCreditReport = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const EQUIFAX_API_KEY = process.env.EQUIFAX_API_KEY;
// In a real app, this would be the actual Equifax API endpoint
const EQUIFAX_API_URL = 'https://api.equifax.com/credit-report';
// Simulated service since we can't actually connect to Equifax API
const getEquifaxCreditReport = (ssn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // In a real implementation, this would make an actual API call to Equifax
        // axios.get(`${EQUIFAX_API_URL}/${ssn}`, {
        //   headers: {
        //     'Authorization': `Bearer ${EQUIFAX_API_KEY}`,
        //     'Content-Type': 'application/json'
        //   }
        // });
        // For demo purposes, we're simulating the API response
        // Simulate occasional API failures (15% of the time)
        if (Math.random() < 0.15) {
            throw new Error('Equifax service temporarily unavailable');
        }
        // Generate a simulated credit report with randomized data
        const mockReportId = `EQF-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const baseScore = 580 + Math.floor(Math.random() * 270);
        const mockCreditReport = {
            creditScore: baseScore,
            utilizationRate: Math.random() * 0.8,
            accountsCount: 4 + Math.floor(Math.random() * 16),
            delinquentAccountsCount: Math.floor(Math.random() * 4),
            inquiriesLast6Months: Math.floor(Math.random() * 6),
            oldestAccountAge: 18 + Math.floor(Math.random() * 140), // 1.5-13 years in months
            totalDebt: 12000 + Math.random() * 88000,
            monthlyPayments: 400 + Math.random() * 2600,
            publicRecords: Math.floor(Math.random() * 2),
            derogativeMarks: Math.floor(Math.random() * 4),
            paymentHistory: {
                onTime: 88 + Math.floor(Math.random() * 12),
                late30Days: Math.floor(Math.random() * 6),
                late60Days: Math.floor(Math.random() * 4),
                late90Days: Math.floor(Math.random() * 3)
            },
            creditMix: {
                revolvingAccounts: 1 + Math.floor(Math.random() * 6),
                installmentAccounts: 1 + Math.floor(Math.random() * 4),
                mortgageAccounts: Math.floor(Math.random() * 2),
                openAccounts: 2 + Math.floor(Math.random() * 8)
            },
            additionalData: {
                source: 'Equifax',
                reportType: 'Standard',
                bankruptcies: Math.floor(Math.random() * 2)
            }
        };
        return {
            success: true,
            data: mockCreditReport,
            reportId: mockReportId
        };
    }
    catch (error) {
        console.error('Equifax API Error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
});
exports.getEquifaxCreditReport = getEquifaxCreditReport;
