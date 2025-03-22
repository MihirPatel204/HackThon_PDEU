import { fetchWithAuth, apiHandler } from './config';

// Types
interface CreditReportData {
  bureau: string;
  score: number;
  reportDate: string;
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }>;
  accounts: Array<{
    name: string;
    type: string;
    balance: number;
    creditLimit?: number;
    paymentStatus: string;
    lastReported: string;
  }>;
}

// API functions
const creditService = {
  // Get credit profiles (summary) for a user
  async getCreditProfiles(userId: string): Promise<any[]> {
    const response = await fetchWithAuth(`/users/${userId}/credit-profiles`);
    return apiHandler<any[]>(response);
  },

  // Get full credit reports for a user
  async getCreditReports(userId: string): Promise<any[]> {
    const response = await fetchWithAuth(`/users/${userId}/credit-reports`);
    return apiHandler<any[]>(response);
  },

  // Get a specific credit report by ID
  async getCreditReport(reportId: string): Promise<any> {
    const response = await fetchWithAuth(`/credit-reports/${reportId}`);
    return apiHandler<any>(response);
  },

  // Add a new credit report for a user
  async addCreditReport(userId: string, data: CreditReportData): Promise<any> {
    const response = await fetchWithAuth(`/users/${userId}/credit-reports`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return apiHandler<any>(response);
  },

  // Update an existing credit report
  async updateCreditReport(reportId: string, data: Partial<CreditReportData>): Promise<any> {
    const response = await fetchWithAuth(`/credit-reports/${reportId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return apiHandler<any>(response);
  },

  // Delete a credit report
  async deleteCreditReport(reportId: string): Promise<void> {
    const response = await fetchWithAuth(`/credit-reports/${reportId}`, {
      method: 'DELETE',
    });
    await apiHandler<void>(response);
  },

  // Get credit score changes over time for a specific bureau
  async getCreditScoreHistory(userId: string, bureau: string): Promise<any[]> {
    const response = await fetchWithAuth(`/users/${userId}/credit-history?bureau=${bureau}`);
    return apiHandler<any[]>(response);
  },

  // Get recommendations based on credit reports
  async getRecommendations(userId: string): Promise<any[]> {
    const response = await fetchWithAuth(`/users/${userId}/recommendations`);
    return apiHandler<any[]>(response);
  },

  // Import a credit report from a file (multi-part form data)
  async importCreditReport(userId: string, file: File, bureau: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bureau', bureau);

    const response = await fetchWithAuth(`/users/${userId}/import-report`, {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it with the boundary
      },
    });
    return apiHandler<any>(response);
  },

  // Connect to a bureau's API directly
  async connectBureauApi(userId: string, bureau: string, credentials: any): Promise<void> {
    const response = await fetchWithAuth(`/users/${userId}/connect-bureau`, {
      method: 'POST',
      body: JSON.stringify({
        bureau,
        credentials,
      }),
    });
    await apiHandler<void>(response);
  },

  // Refresh a report by pulling latest data from bureau
  async refreshReport(userId: string, bureau: string): Promise<any> {
    const response = await fetchWithAuth(`/users/${userId}/refresh-report`, {
      method: 'POST',
      body: JSON.stringify({ bureau }),
    });
    return apiHandler<any>(response);
  },

  // Disconnect from a bureau
  async disconnectBureau(userId: string, bureau: string): Promise<void> {
    const response = await fetchWithAuth(`/users/${userId}/disconnect-bureau`, {
      method: 'POST',
      body: JSON.stringify({ bureau }),
    });
    await apiHandler<void>(response);
  },

  // Dispute an item on the credit report
  async disputeItem(reportId: string, itemId: string, reason: string): Promise<any> {
    const response = await fetchWithAuth(`/credit-reports/${reportId}/dispute`, {
      method: 'POST',
      body: JSON.stringify({
        itemId,
        reason,
      }),
    });
    return apiHandler<any>(response);
  },

  // Get status of disputes
  async getDisputes(userId: string): Promise<any[]> {
    const response = await fetchWithAuth(`/users/${userId}/disputes`);
    return apiHandler<any[]>(response);
  },
};

export default creditService; 