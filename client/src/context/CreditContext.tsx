import React, { createContext, useContext, useState, ReactNode } from 'react';
import { creditService } from '../api';

// Define types
interface CreditContextType {
  loading: boolean;
  error: string | null;
  getCreditProfiles: (userId: string) => Promise<any[]>;
  getCreditReports: (userId: string) => Promise<any[]>;
  getCreditReport: (reportId: string) => Promise<any>;
  addCreditReport: (userId: string, data: any) => Promise<any>;
  updateCreditReport: (reportId: string, data: any) => Promise<any>;
  deleteCreditReport: (reportId: string) => Promise<void>;
  clearError: () => void;
}

// Create context
const CreditContext = createContext<CreditContextType | undefined>(undefined);

// Provider component
interface CreditProviderProps {
  children: ReactNode;
}

export const CreditProvider: React.FC<CreditProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get all credit profiles for a user (summary data)
  const getCreditProfiles = async (userId: string): Promise<any[]> => {
    try {
      setLoading(true);
      setError(null);
      return await creditService.getCreditProfiles(userId);
    } catch (err: any) {
      setError(err.message || 'Failed to get credit profiles');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get all detailed credit reports for a user
  const getCreditReports = async (userId: string): Promise<any[]> => {
    try {
      setLoading(true);
      setError(null);
      return await creditService.getCreditReports(userId);
    } catch (err: any) {
      setError(err.message || 'Failed to get credit reports');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a specific credit report by ID
  const getCreditReport = async (reportId: string): Promise<any> => {
    try {
      setLoading(true);
      setError(null);
      return await creditService.getCreditReport(reportId);
    } catch (err: any) {
      setError(err.message || 'Failed to get credit report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add a new credit report
  const addCreditReport = async (userId: string, data: any): Promise<any> => {
    try {
      setLoading(true);
      setError(null);
      return await creditService.addCreditReport(userId, data);
    } catch (err: any) {
      setError(err.message || 'Failed to add credit report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing credit report
  const updateCreditReport = async (reportId: string, data: any): Promise<any> => {
    try {
      setLoading(true);
      setError(null);
      return await creditService.updateCreditReport(reportId, data);
    } catch (err: any) {
      setError(err.message || 'Failed to update credit report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a credit report
  const deleteCreditReport = async (reportId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await creditService.deleteCreditReport(reportId);
    } catch (err: any) {
      setError(err.message || 'Failed to delete credit report');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear any errors
  const clearError = (): void => {
    setError(null);
  };

  const value = {
    loading,
    error,
    getCreditProfiles,
    getCreditReports,
    getCreditReport,
    addCreditReport,
    updateCreditReport,
    deleteCreditReport,
    clearError
  };

  return <CreditContext.Provider value={value}>{children}</CreditContext.Provider>;
};

// Custom hook to use credit context
export const useCredit = (): CreditContextType => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredit must be used within a CreditProvider');
  }
  return context;
};

export default CreditContext; 