import { fetchWithAuth, apiHandler } from './config';

// Mock data generation functions
const creditReportService = {
  // Generate mock credit reports for development/testing
  generateMockCreditReport(bureau: string, userId: string): any {
    // Generate a random score between 550 and 850
    const score = Math.floor(Math.random() * 300) + 550;
    
    // Generate a recent date for the report
    const reportDate = new Date();
    reportDate.setDate(reportDate.getDate() - Math.floor(Math.random() * 30));
    
    // Create mock credit report data
    return {
      id: `${bureau.toLowerCase()}-${Date.now()}`,
      userId,
      bureau,
      score,
      lastUpdated: reportDate.toISOString().split('T')[0],
      factors: this.generateMockFactors(score),
      accounts: this.generateMockAccounts(),
    };
  },
  
  // Generate mock factors that affect credit score
  generateMockFactors(score: number): Array<any> {
    const possibleFactors = [
      {
        factor: 'Credit Card Utilization',
        impact: score > 700 ? 'positive' : 'negative',
        description: score > 700 
          ? 'Your credit card balances are low relative to your credit limits.' 
          : 'Your credit card balances are too high relative to your credit limits.',
      },
      {
        factor: 'Payment History',
        impact: score > 650 ? 'positive' : 'negative',
        description: score > 650 
          ? 'You have a history of on-time payments.' 
          : 'You have some late payments in your history.',
      },
      {
        factor: 'Length of Credit History',
        impact: score > 750 ? 'positive' : (score > 650 ? 'neutral' : 'negative'),
        description: score > 750 
          ? 'You have a long credit history which is helping your score.' 
          : (score > 650 ? 'Your credit history is of average length.' : 'Your credit history is relatively short.'),
      },
      {
        factor: 'Credit Mix',
        impact: 'neutral',
        description: 'You have a moderate mix of credit types.',
      },
      {
        factor: 'Recent Credit Inquiries',
        impact: score < 680 ? 'negative' : 'neutral',
        description: score < 680 
          ? 'You have multiple recent credit inquiries which may be lowering your score.' 
          : 'You have few recent credit inquiries.',
      },
    ];
    
    // Return 3-5 factors
    return possibleFactors.slice(0, Math.floor(Math.random() * 2) + 3);
  },
  
  // Generate mock accounts
  generateMockAccounts(): Array<any> {
    const accountTypes = ['Credit Card', 'Mortgage', 'Auto Loan', 'Personal Loan', 'Student Loan'];
    const institutions = ['Chase', 'Bank of America', 'Wells Fargo', 'Citi', 'Capital One', 'Discover'];
    const paymentStatuses = ['Current', 'Current', 'Current', 'Current', 'Late 30 Days', 'Late 60 Days'];
    
    // Generate 3-7 random accounts
    const numAccounts = Math.floor(Math.random() * 4) + 3;
    const accounts = [];
    
    for (let i = 0; i < numAccounts; i++) {
      const type = accountTypes[Math.floor(Math.random() * accountTypes.length)];
      const institution = institutions[Math.floor(Math.random() * institutions.length)];
      const status = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
      
      // Generate balance and limit based on account type
      let balance, creditLimit;
      
      if (type === 'Credit Card') {
        creditLimit = Math.floor(Math.random() * 15000) + 5000;
        balance = Math.floor(Math.random() * creditLimit);
      } else if (type === 'Mortgage') {
        balance = Math.floor(Math.random() * 300000) + 100000;
      } else if (type === 'Auto Loan') {
        balance = Math.floor(Math.random() * 30000) + 5000;
      } else if (type === 'Personal Loan') {
        balance = Math.floor(Math.random() * 20000) + 1000;
      } else { // Student Loan
        balance = Math.floor(Math.random() * 50000) + 10000;
      }
      
      // Generate a date in the past month
      const lastReported = new Date();
      lastReported.setDate(lastReported.getDate() - Math.floor(Math.random() * 30));
      
      accounts.push({
        id: `acc-${Date.now()}-${i}`,
        name: `${institution} ${type}`,
        type,
        balance,
        creditLimit: type === 'Credit Card' ? creditLimit : undefined,
        paymentStatus: status,
        lastReported: lastReported.toISOString().split('T')[0],
      });
    }
    
    return accounts;
  },

  // Get mock credit reports for a user (for testing frontend without backend)
  async getMockCreditReports(userId: string): Promise<any[]> {
    const bureaus = ['Experian', 'Equifax', 'TransUnion'];
    return bureaus.map(bureau => this.generateMockCreditReport(bureau, userId));
  },
};

export default creditReportService; 