import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { user, loading } = useAuth();

  // Redirect to dashboard if already logged in
  if (!loading && user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <LoginForm />
        </div>
        <div className="auth-background">
          <div className="auth-background-content">
            <h2>Multi-Bureau Credit System</h2>
            <p>Access your consolidated credit information from multiple bureaus in one place.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">📊</span>
                <span>Comprehensive Credit Reports</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">📈</span>
                <span>Score Improvement Tips</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">🔐</span>
                <span>Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage; 