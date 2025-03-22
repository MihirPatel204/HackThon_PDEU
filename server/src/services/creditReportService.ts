import { getExperianCreditReport } from './experianService';
import { getEquifaxCreditReport } from './equifaxService';
import { getTransunionCreditReport } from './transunionService';
import { aggregateCreditScores } from './creditScoringService';
import CreditReport, { CreditBureau, ICreditReport } from '../models/CreditReport';
import AggregatedCreditScore, { AggregationMethod, IAggregatedCreditScore } from '../models/AggregatedCreditScore';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

/**
 * Fetches credit reports from all bureaus and stores them in the database
 */
export const fetchAndStoreCreditReports = async (userId: string, ssn: string): Promise<{
  reports: ICreditReport[];
  success: boolean;
  failedBureaus: CreditBureau[];
}> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    // Fetch reports from all three bureaus concurrently
    const [experianResult, equifaxResult, transunionResult] = await Promise.all([
      getExperianCreditReport(ssn),
      getEquifaxCreditReport(ssn),
      getTransunionCreditReport(ssn)
    ]);

    const reports: ICreditReport[] = [];
    const failedBureaus: CreditBureau[] = [];

    // Process Experian result
    const experianReport = new CreditReport({
      userId,
      bureau: CreditBureau.EXPERIAN,
      reportDate: new Date(),
      reportId: experianResult.reportId || `exp-${Date.now()}`,
      data: experianResult.data || {},
      isAvailable: experianResult.success,
      errorMessage: experianResult.error
    });
    await experianReport.save();
    reports.push(experianReport);
    if (!experianResult.success) failedBureaus.push(CreditBureau.EXPERIAN);

    // Process Equifax result
    const equifaxReport = new CreditReport({
      userId,
      bureau: CreditBureau.EQUIFAX,
      reportDate: new Date(),
      reportId: equifaxResult.reportId || `eqf-${Date.now()}`,
      data: equifaxResult.data || {},
      isAvailable: equifaxResult.success,
      errorMessage: equifaxResult.error
    });
    await equifaxReport.save();
    reports.push(equifaxReport);
    if (!equifaxResult.success) failedBureaus.push(CreditBureau.EQUIFAX);

    // Process TransUnion result
    const transunionReport = new CreditReport({
      userId,
      bureau: CreditBureau.TRANSUNION,
      reportDate: new Date(),
      reportId: transunionResult.reportId || `tu-${Date.now()}`,
      data: transunionResult.data || {},
      isAvailable: transunionResult.success,
      errorMessage: transunionResult.error
    });
    await transunionReport.save();
    reports.push(transunionReport);
    if (!transunionResult.success) failedBureaus.push(CreditBureau.TRANSUNION);

    return {
      reports,
      success: failedBureaus.length < 3, // As long as at least one bureau succeeds
      failedBureaus
    };
  } catch (error) {
    console.error('Error fetching credit reports:', error);
    throw error;
  }
};

/**
 * Aggregates credit reports and stores the result
 */
export const aggregateAndStoreScore = async (
  userId: string,
  method: AggregationMethod = AggregationMethod.WEIGHTED,
  customWeights?: Record<CreditBureau, number>
): Promise<IAggregatedCreditScore> => {
  try {
    // Get the latest reports for this user
    const latestReports = await CreditReport.find({ userId })
      .sort({ reportDate: -1 })
      .limit(3);

    // Group by bureau to get the latest report from each bureau
    const bureauMap: Record<string, ICreditReport> = {};
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
    const aggregation = aggregateCreditScores(reportsToAggregate, method, customWeights);

    // Create and save the aggregated score
    const aggregatedScore = new AggregatedCreditScore({
      userId,
      aggregatedScore: aggregation.aggregatedScore,
      method,
      components: aggregation.components.map(component => ({
        bureau: component.bureau,
        score: component.score,
        weight: component.weight,
        reportId: new mongoose.Types.ObjectId(component.reportId)
      })),
      riskCategory: aggregation.riskCategory,
      recommendation: aggregation.recommendation,
      aggregationDate: new Date(),
      missingBureaus: aggregation.missingBureaus
    });

    await aggregatedScore.save();
    return aggregatedScore;
  } catch (error) {
    console.error('Error aggregating credit scores:', error);
    throw error;
  }
};

/**
 * Gets a user's latest aggregated credit score
 */
export const getLatestAggregatedScore = async (userId: string): Promise<IAggregatedCreditScore | null> => {
  try {
    const latestScore = await AggregatedCreditScore.findOne({ userId })
      .sort({ aggregationDate: -1 })
      .populate({
        path: 'components.reportId',
        model: 'CreditReport'
      });

    return latestScore;
  } catch (error) {
    console.error('Error getting latest aggregated score:', error);
    throw error;
  }
};

/**
 * Gets credit reports from all bureaus for a user
 */
export const getCreditReportsByUser = async (userId: string): Promise<Record<CreditBureau, ICreditReport | null>> => {
  try {
    const reports = await CreditReport.find({ userId })
      .sort({ reportDate: -1 });

    // Group by bureau and get the latest for each
    const bureauMap: Record<CreditBureau, ICreditReport | null> = {
      [CreditBureau.EXPERIAN]: null,
      [CreditBureau.EQUIFAX]: null,
      [CreditBureau.TRANSUNION]: null
    };

    reports.forEach(report => {
      if (!bureauMap[report.bureau as CreditBureau] || 
          report.reportDate > (bureauMap[report.bureau as CreditBureau]?.reportDate || new Date(0))) {
        bureauMap[report.bureau as CreditBureau] = report;
      }
    });

    return bureauMap;
  } catch (error) {
    console.error('Error getting credit reports by user:', error);
    throw error;
  }
}; 