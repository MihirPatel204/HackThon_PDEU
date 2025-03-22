import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Navbar, Footer, DashboardSummary } from '../components';
import { useAuth } from '../context/AuthContext';
import { useCredit } from '../context/CreditContext';

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { loading: creditLoading, error, clearError } = useCredit();

  useEffect(() => {
    // Clear any previous errors when the component mounts
    clearError();
  }, [clearError]);

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-4">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h1>Dashboard</h1>
          <div>
            <Link to="/reports" className="btn btn-primary mr-2">View Reports</Link>
            <Link to="/profile" className="btn btn-outline-primary">My Profile</Link>
          </div>
        </div>
        
        {error && (
          <div className="alert alert-danger mb-4">
            {error}
            <button 
              type="button" 
              className="close" 
              onClick={clearError}
            >
              <span>&times;</span>
            </button>
          </div>
        )}
        
        {authLoading || creditLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-3">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <DashboardSummary />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="card">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>Experian Score Updated</strong>
                          <p className="mb-0 text-sm">Your Experian score increased by 5 points</p>
                        </div>
                        <span className="text-muted">3 days ago</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>New Credit Card Added</strong>
                          <p className="mb-0 text-sm">A new Capital One credit card was added to your report</p>
                        </div>
                        <span className="text-muted">1 week ago</span>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong>TransUnion Report Updated</strong>
                          <p className="mb-0 text-sm">Your TransUnion report has been refreshed</p>
                        </div>
                        <span className="text-muted">2 weeks ago</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3>Recommendations</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <h5>Reduce Credit Card Utilization</h5>
                      <p>Your credit utilization is currently at 45%. Try to keep it under 30% to improve your score.</p>
                      <div className="progress">
                        <div 
                          className="progress-bar bg-warning" 
                          role="progressbar" 
                          style={{ width: '45%' }} 
                          aria-valuenow={45} 
                          aria-valuemin={0} 
                          aria-valuemax={100}
                        >
                          45%
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <h5>Consider a Credit Builder Loan</h5>
                      <p>Adding a credit builder loan could help diversify your credit mix.</p>
                      <Link to="/recommendations" className="btn btn-sm btn-outline-primary">Learn More</Link>
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <Link to="/recommendations" className="btn btn-outline-primary btn-block">View All Recommendations</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage; 