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
exports.AggregationMethod = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CreditReport_1 = require("./CreditReport");
var AggregationMethod;
(function (AggregationMethod) {
    AggregationMethod["AVERAGE"] = "average";
    AggregationMethod["WEIGHTED"] = "weighted";
    AggregationMethod["LOWEST"] = "lowest";
    AggregationMethod["HIGHEST"] = "highest";
    AggregationMethod["MEDIAN"] = "median";
    AggregationMethod["CUSTOM"] = "custom";
})(AggregationMethod || (exports.AggregationMethod = AggregationMethod = {}));
const AggregatedCreditScoreSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    aggregatedScore: { type: Number, required: true },
    method: {
        type: String,
        enum: Object.values(AggregationMethod),
        required: true
    },
    components: [{
            bureau: {
                type: String,
                enum: Object.values(CreditReport_1.CreditBureau),
                required: true
            },
            score: { type: Number, required: true },
            weight: { type: Number, required: true },
            reportId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CreditReport', required: true }
        }],
    riskCategory: {
        type: String,
        enum: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor', 'Very Poor'],
        required: true
    },
    recommendation: { type: String },
    aggregationDate: { type: Date, default: Date.now },
    missingBureaus: [{
            type: String,
            enum: Object.values(CreditReport_1.CreditBureau)
        }]
}, {
    timestamps: true
});
// Index for fast lookups by user
AggregatedCreditScoreSchema.index({ userId: 1, aggregationDate: -1 });
exports.default = mongoose_1.default.model('AggregatedCreditScore', AggregatedCreditScoreSchema);
