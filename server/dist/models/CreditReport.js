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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditBureau = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var CreditBureau;
(function (CreditBureau) {
    CreditBureau["EXPERIAN"] = "experian";
    CreditBureau["EQUIFAX"] = "equifax";
    CreditBureau["TRANSUNION"] = "transunion";
})(CreditBureau || (exports.CreditBureau = CreditBureau = {}));
const CreditReportSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    bureau: {
        type: String,
        enum: Object.values(CreditBureau),
        required: true
    },
    reportDate: { type: Date, default: Date.now },
    reportId: { type: String, required: true },
    data: {
        creditScore: { type: Number },
        utilizationRate: { type: Number },
        accountsCount: { type: Number },
        delinquentAccountsCount: { type: Number },
        inquiriesLast6Months: { type: Number },
        oldestAccountAge: { type: Number },
        totalDebt: { type: Number },
        monthlyPayments: { type: Number },
        publicRecords: { type: Number },
        derogativeMarks: { type: Number },
        paymentHistory: {
            onTime: { type: Number },
            late30Days: { type: Number },
            late60Days: { type: Number },
            late90Days: { type: Number }
        },
        creditMix: {
            revolvingAccounts: { type: Number },
            installmentAccounts: { type: Number },
            mortgageAccounts: { type: Number },
            openAccounts: { type: Number }
        },
        additionalData: { type: mongoose_1.Schema.Types.Mixed }
    },
    isAvailable: { type: Boolean, default: true },
    errorMessage: { type: String }
}, {
    timestamps: true
});
// Compound index for query optimization
CreditReportSchema.index({ userId: 1, bureau: 1, reportDate: -1 });
exports.default = mongoose_1.default.model('CreditReport', CreditReportSchema);
