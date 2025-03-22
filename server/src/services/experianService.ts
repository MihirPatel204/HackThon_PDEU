import axios from 'axios';
import dotenv from 'dotenv';
import { ICreditReportData } from '../models/CreditReport';

dotenv.config();

const EXPERIAN_API_KEY = process.env.EXPERIAN_API_KEY;
// In a real app, this would be the actual Experian API endpoint
const EXPERIAN_API_URL = 'https://api.experian.com/credit-report';

// Simulated service since we can't actually connect to Experian API
export const getExperianCreditReport = async (ssn: string): Promise<{ 
  success: boolean; 
  data?: ICreditReportData; 
  error?: string; 
  reportId?: string;
}> => {
  try {
    // In a real implementation, this would make an actual API call to Experian
    // axios.get(`${EXPERIAN_API_URL}/${ssn}`, {
    //   headers: {
    //     'Authorization': `Bearer ${EXPERIAN_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });

    // For demo purposes, we're simulating the API response
    // Simulate occasional API failures (10% of the time)
    if (Math.random() < 0.1) {
      throw new Error('Experian service temporarily unavailable');
    }

    // Generate a simulated credit report with randomized data
    const mockReportId = `EXP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    
    const baseScore = 600 + Math.floor(Math.random() * 250);
    
    const mockCreditReport: ICreditReportData = {
      creditScore: baseScore,
      utilizationRate: Math.random() * 0.7,
      accountsCount: 5 + Math.floor(Math.random() * 15),
      delinquentAccountsCount: Math.floor(Math.random() * 3),
      inquiriesLast6Months: Math.floor(Math.random() * 5),
      oldestAccountAge: 24 + Math.floor(Math.random() * 120), // 2-12 years in months
      totalDebt: 10000 + Math.random() * 90000,
      monthlyPayments: 500 + Math.random() * 2500,
      publicRecords: Math.floor(Math.random() * 2),
      derogativeMarks: Math.floor(Math.random() * 3),
      paymentHistory: {
        onTime: 90 + Math.floor(Math.random() * 10),
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
        source: 'Experian',
        reportType: 'Standard',
        taxLiens: Math.floor(Math.random() * 2)
      }
    };

    return {
      success: true,
      data: mockCreditReport,
      reportId: mockReportId
    };
  } catch (error) {
    console.error('Experian API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}; 