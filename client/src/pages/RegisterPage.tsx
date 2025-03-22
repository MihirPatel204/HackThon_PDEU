import React from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterForm } from '../components';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { user, loading } = useAuth();

  // Redirect to dashboard if already logged in
  if (!loading && user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <RegisterForm />
        </div>
        <div className="auth-background">
          <div className="auth-background-content">
            <h2>Join Our Credit Platform</h2>
            <p>Create an account to access comprehensive credit information and tools.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">💯</span>
                <span>Track All Bureau Scores</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">🔔</span>
                <span>Credit Monitoring Alerts</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">📱</span>
                <span>Mobile Friendly Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage; 