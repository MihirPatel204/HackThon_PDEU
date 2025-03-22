import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { CreditProvider } from './CreditContext';

interface AppProvidersProps {
  children: ReactNode;
}

// Combined provider component to wrap the application
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <CreditProvider>
        {children}
      </CreditProvider>
    </AuthProvider>
  );
};

// Re-export hooks
export { useAuth } from './AuthContext';
export { useCredit } from './CreditContext'; 