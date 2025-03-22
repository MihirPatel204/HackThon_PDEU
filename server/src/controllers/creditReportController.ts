import { Request, Response } from 'express';
import User from '../models/User';
import { 
  fetchAndStoreCreditReports,
  aggregateAndStoreScore,
  getLatestAggregatedScore,
  getCreditReportsByUser
} from '../services/creditReportService';
import { AggregationMethod } from '../models/AggregatedCreditScore';
import { CreditBureau } from '../models/CreditReport';

// Fetch credit reports for a user from all bureaus
export const fetchCreditReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Fetch reports from all bureaus
    const result = await fetchAndStoreCreditReports(userId, user.ssn);
    
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
  } catch (error) {
    console.error('Error fetching credit reports:', error);
    res.status(500).json({ 
      message: 'Error fetching credit reports',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Aggregate credit scores for a user
export const aggregateCreditScore = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { method, weights } = req.body;
    
    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Validate aggregation method
    let aggregationMethod: AggregationMethod;
    if (method && Object.values(AggregationMethod).includes(method as AggregationMethod)) {
      aggregationMethod = method as AggregationMethod;
    } else {
      aggregationMethod = AggregationMethod.WEIGHTED;
    }

    // Validate custom weights if provided
    let customWeights: Record<CreditBureau, number> | undefined;
    if (weights && aggregationMethod === AggregationMethod.CUSTOM) {
      customWeights = {
        [CreditBureau.EXPERIAN]: weights.experian || 0.33,
        [CreditBureau.EQUIFAX]: weights.equifax || 0.33,
        [CreditBureau.TRANSUNION]: weights.transunion || 0.33
      };
    }

    // Aggregate scores
    const aggregatedScore = await aggregateAndStoreScore(
      userId,
      aggregationMethod,
      customWeights
    );
    
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
  } catch (error) {
    console.error('Error aggregating credit score:', error);
    res.status(500).json({ 
      message: 'Error aggregating credit score',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Get latest credit reports and aggregated score for a user
export const getCreditProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    
    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Get latest reports from all bureaus
    const bureauReports = await getCreditReportsByUser(userId);
    
    // Get latest aggregated score
    const aggregatedScore = await getLatestAggregatedScore(userId);

    // Prepare response
    const response: Record<string, any> = {
      userId,
      userName: `${user.firstName} ${user.lastName}`,
      reports: {}
    };

    // Add bureau reports
    Object.entries(bureauReports).forEach(([bureau, report]) => {
      response.reports[bureau] = report ? {
        id: report._id,
        bureau,
        isAvailable: report.isAvailable,
        reportDate: report.reportDate,
        creditScore: report.data?.creditScore,
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
  } catch (error) {
    console.error('Error getting credit profile:', error);
    res.status(500).json({ 
      message: 'Error getting credit profile',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

// Get detailed report from a specific bureau
export const getBureauReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, bureau } = req.params;
    
    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Validate bureau parameter
    if (!Object.values(CreditBureau).includes(bureau as CreditBureau)) {
      res.status(400).json({ message: 'Invalid credit bureau specified' });
      return;
    }

    // Get latest reports from all bureaus
    const bureauReports = await getCreditReportsByUser(userId);
    const report = bureauReports[bureau as CreditBureau];

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
  } catch (error) {
    console.error('Error getting bureau report:', error);
    res.status(500).json({ 
      message: 'Error getting bureau report',
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}; 