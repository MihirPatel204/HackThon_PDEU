import axios from 'axios';
import dotenv from 'dotenv';
import { ICreditReportData } from '../models/CreditReport';

dotenv.config();

const TRANSUNION_API_KEY = process.env.TRANSUNION_API_KEY;
// In a real app, this would be the actual TransUnion API endpoint
const TRANSUNION_API_URL = 'https://api.transunion.com/credit-report';

// Simulated service since we can't actually connect to TransUnion API
export const getTransunionCreditReport = async (ssn: string): Promise<{ 
  success: boolean; 
  data?: ICreditReportData; 
  error?: string; 
  reportId?: string;
}> => {
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
    
    const mockCreditReport: ICreditReportData = {
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
  } catch (error) {
    console.error('TransUnion API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 