"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateCreditScores = void 0;
const CreditReport_1 = require("../models/CreditReport");
const AggregatedCreditScore_1 = require("../models/AggregatedCreditScore");
// Define weights for each bureau for weighted averaging
const DEFAULT_WEIGHTS = {
    [CreditReport_1.CreditBureau.EXPERIAN]: 0.35,
    [CreditReport_1.CreditBureau.EQUIFAX]: 0.35,
    [CreditReport_1.CreditBureau.TRANSUNION]: 0.3
};
// Maps credit score ranges to risk categories
const getRiskCategory = (score) => {
    if (score >= 800)
        return 'Excellent';
    if (score >= 740)
        return 'Very Good';
    if (score >= 670)
        return 'Good';
    if (score >= 580)
        return 'Fair';
    if (score >= 500)
        return 'Poor';
    return 'Very Poor';
};
// Get recommendation based on risk category
const getRecommendation = (score) => {
    if (score >= 740) {
        return 'Excellent candidate for premium loans with favorable rates and terms.';
    }
    else if (score >= 670) {
        return 'Good candidate for standard loan products with competitive rates.';
    }
    else if (score >= 580) {
        return 'May qualify for loans with higher interest rates. Consider improving credit before major applications.';
    }
    else {
        return 'Limited loan options available. Focus on credit repair and building positive history.';
    }
};
/**
 * Aggregate credit scores from multiple bureau reports using different methods
 */
const aggregateCreditScores = (reports, method = AggregatedCreditScore_1.AggregationMethod.WEIGHTED, customWeights) => {
    if (!reports || reports.length === 0) {
        throw new Error('No credit reports provided for aggregation');
    }
    // Identify which bureaus we have reports for
    const availableBureaus = reports.map(report => report.bureau);
    const missingBureaus = Object.values(CreditReport_1.CreditBureau).filter(bureau => !availableBureaus.includes(bureau));
    // Filter out only available reports
    const validReports = reports.filter(report => { var _a; return report.isAvailable && ((_a = report.data) === null || _a === void 0 ? void 0 : _a.creditScore); });
    if (validReports.length === 0) {
        throw new Error('No valid credit reports available for aggregation');
    }
    // Set up weights for calculations
    const weights = customWeights || DEFAULT_WEIGHTS;
    // Prepare components that will go into the final result
    const components = validReports.map(report => ({
        bureau: report.bureau,
        score: report.data.creditScore,
        weight: weights[report.bureau],
        reportId: report._id.toString()
    }));
    // Calculate aggregated score based on method
    let aggregatedScore = 0;
    switch (method) {
        case AggregatedCreditScore_1.AggregationMethod.AVERAGE:
            // Simple average
            aggregatedScore = Math.round(components.reduce((sum, component) => sum + component.score, 0) / components.length);
            // Set equal weights for components
            components.forEach(component => {
                component.weight = 1 / components.length;
            });
            break;
        case AggregatedCreditScore_1.AggregationMethod.WEIGHTED:
            // Weighted average
            const totalWeight = components.reduce((sum, component) => sum + component.weight, 0);
            // Normalize weights if they don't sum to 1
            components.forEach(component => {
                component.weight = component.weight / totalWeight;
            });
            aggregatedScore = Math.round(components.reduce((sum, component) => sum + component.score * component.weight, 0));
            break;
        case AggregatedCreditScore_1.AggregationMethod.LOWEST:
            // Most conservative approach - use lowest score
            aggregatedScore = Math.min(...components.map(component => component.score));
            // Set weight to 1 for the lowest score, 0 for others
            const lowestScore = Math.min(...components.map(component => component.score));
            components.forEach(component => {
                component.weight = component.score === lowestScore ? 1 : 0;
            });
            break;
        case AggregatedCreditScore_1.AggregationMethod.HIGHEST:
            // Most optimistic approach - use highest score
            aggregatedScore = Math.max(...components.map(component => component.score));
            // Set weight to 1 for the highest score, 0 for others
            const highestScore = Math.max(...components.map(component => component.score));
            components.forEach(component => {
                component.weight = component.score === highestScore ? 1 : 0;
            });
            break;
        case AggregatedCreditScore_1.AggregationMethod.MEDIAN:
            // Median score
            const sortedScores = [...components].sort((a, b) => a.score - b.score);
            const middleIndex = Math.floor(sortedScores.length / 2);
            if (sortedScores.length % 2 === 0) {
                // Even number of scores, take average of middle two
                aggregatedScore = Math.round((sortedScores[middleIndex - 1].score + sortedScores[middleIndex].score) / 2);
            }
            else {
                // Odd number of scores, take middle one
                aggregatedScore = sortedScores[middleIndex].score;
            }
            // Set weights for median calculation
            components.forEach(component => {
                component.weight = 0;
            });
            if (sortedScores.length % 2 === 0) {
                const medianIndex1 = components.findIndex(c => c.bureau === sortedScores[middleIndex - 1].bureau);
                const medianIndex2 = components.findIndex(c => c.bureau === sortedScores[middleIndex].bureau);
                if (medianIndex1 !== -1)
                    components[medianIndex1].weight = 0.5;
                if (medianIndex2 !== -1)
                    components[medianIndex2].weight = 0.5;
            }
            else {
                const medianIndex = components.findIndex(c => c.bureau === sortedScores[middleIndex].bureau);
                if (medianIndex !== -1)
                    components[medianIndex].weight = 1;
            }
            break;
        case AggregatedCreditScore_1.AggregationMethod.CUSTOM:
            if (!customWeights) {
                throw new Error('Custom weights must be provided for custom aggregation method');
            }
            const customTotalWeight = components.reduce((sum, component) => sum + component.weight, 0);
            components.forEach(component => {
                component.weight = component.weight / customTotalWeight;
            });
            aggregatedScore = Math.round(components.reduce((sum, component) => sum + component.score * component.weight, 0));
            break;
        default:
            throw new Error(`Unsupported aggregation method: ${method}`);
    }
    // Round the aggregated score to an integer
    aggregatedScore = Math.round(aggregatedScore);
    // Determine risk category and recommendation
    const riskCategory = getRiskCategory(aggregatedScore);
    const recommendation = getRecommendation(aggregatedScore);
    return {
        aggregatedScore,
        riskCategory,
        recommendation,
        components,
        missingBureaus
    };
};
exports.aggregateCreditScores = aggregateCreditScores;
