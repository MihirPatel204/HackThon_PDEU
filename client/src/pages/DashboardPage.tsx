import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { DashboardSummary } from '../components';
import { useAuth } from '../context/AuthContext';
import { useCredit } from '../context/CreditContext';

const DashboardPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { loading: creditLoading, error, clearError } = useCredit();
  
  const recentActivity = [
    {
      id: 1,
      title: 'Experian Score Updated',
      description: 'Your Experian score increased by 5 points',
      timestamp: '3 days ago',
      icon: 'bi-graph-up',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'New Credit Card Added',
      description: 'A new Capital One credit card was added to your report',
      timestamp: '1 week ago',
      icon: 'bi-credit-card',
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'TransUnion Report Updated',
      description: 'Your TransUnion report has been refreshed',
      timestamp: '2 weeks ago',
      icon: 'bi-file-earmark-text',
      color: '#9C27B0'
    }
  ];

  useEffect(() => {
    // Clear any previous errors when the component mounts
    clearError();
  }, [clearError]);

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-fluid py-4 px-4" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
      {/* Dashboard Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-6 mb-0 fw-bold text-primary">
                <i className="bi bi-speedometer2 me-2"></i>
                Welcome, {user?.name?.split(' ')[0] || 'User'}
              </h1>
              <p className="text-muted mb-0 mt-1">Here's your credit profile overview</p>
            </div>
            <div className="d-flex">
              <Link to="/reports" className="btn btn-primary me-2 rounded-3 px-4">
                <i className="bi bi-file-earmark-text me-2"></i>View Reports
              </Link>
              <Link to="/profile" className="btn btn-outline-primary rounded-3 px-4">
                <i className="bi bi-person me-2"></i>My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger mb-4 shadow-sm" role="alert">
          <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            <div><strong>Error: </strong>{error}</div>
            <button 
              type="button" 
              className="btn-close ms-auto" 
              onClick={clearError}
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {authLoading || creditLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <div className="text-center">
            <div className="spinner-grow text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="fw-light text-primary">Loading your dashboard...</h4>
            <p className="text-muted">Please wait while we gather your credit information</p>
          </div>
        </div>
      ) : (
        <>
          {/* Credit Score Overview */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body p-4">
                  <DashboardSummary />
                </div>
              </div>
            </div>
          </div>
          
          <div className="row">
            {/* Recent Activity */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100 rounded-3">
                <div className="card-header bg-transparent d-flex justify-content-between align-items-center py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-activity text-primary me-2"></i>
                    Recent Activity
                  </h5>
                  <button className="btn btn-sm btn-outline-primary rounded-3">
                    <i className="bi bi-arrow-clockwise me-1"></i>Refresh
                  </button>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {recentActivity.map((activity) => (
                      <li key={activity.id} className="list-group-item px-0 py-3 border-bottom">
                        <div className="d-flex">
                          <div className="me-3">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center" 
                              style={{ 
                                width: '48px', 
                                height: '48px', 
                                background: `${activity.color}15`,
                                color: activity.color
                              }}
                            >
                              <i className={`bi ${activity.icon} fs-4`}></i>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-start flex-grow-1">
                            <div>
                              <h6 className="mb-1 fw-bold">{activity.title}</h6>
                              <p className="mb-0 text-muted small">{activity.description}</p>
                            </div>
                            <span className="badge bg-light text-dark rounded-pill px-3 py-2">
                              <i className="bi bi-clock me-1 text-muted"></i>
                              {activity.timestamp}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer bg-transparent text-center border-0">
                  <Link to="/activity" className="btn btn-sm btn-light text-primary">
                    View All Activity <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="col-md-6 mb-4">
              <div className="card border-0 shadow-sm h-100 rounded-3">
                <div className="card-header bg-transparent py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-lightbulb text-warning me-2"></i>
                    Recommendations
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-4 p-3 border rounded-3 bg-light">
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="mb-0 fw-bold">Reduce Credit Card Utilization</h6>
                      <span className="badge bg-warning text-dark">High Impact</span>
                    </div>
                    <p className="text-muted small mb-2">Your credit utilization is currently at 45%. Try to keep it under 30% to improve your score.</p>
                    <div className="progress mb-2" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar bg-warning" 
                        role="progressbar" 
                        style={{ width: '45%' }} 
                        aria-valuenow={45} 
                        aria-valuemin={0} 
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <small className="text-muted">Current: 45%</small>
                      <small className="text-muted">Target: &lt;30%</small>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-3 border rounded-3 bg-light">
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="mb-0 fw-bold">Consider a Credit Builder Loan</h6>
                      <span className="badge bg-info text-white">Medium Impact</span>
                    </div>
                    <p className="text-muted small mb-2">Adding a credit builder loan could help diversify your credit mix.</p>
                    <Link to="/recommendations/credit-builder" className="btn btn-sm btn-outline-primary mt-1">
                      <i className="bi bi-info-circle me-1"></i>
                      Learn More
                    </Link>
                  </div>
                  
                  <div className="p-3 border rounded-3 bg-light">
                    <div className="d-flex justify-content-between mb-2">
                      <h6 className="mb-0 fw-bold">Set Up Automatic Payments</h6>
                      <span className="badge bg-success text-white">Easy Win</span>
                    </div>
                    <p className="text-muted small mb-2">Never miss a payment by setting up automatic payments for all your accounts.</p>
                    <Link to="/recommendations/auto-pay" className="btn btn-sm btn-outline-primary mt-1">
                      <i className="bi bi-arrow-right-circle me-1"></i>
                      Set Up Now
                    </Link>
                  </div>
                </div>
                <div className="card-footer bg-transparent text-center">
                  <Link to="/recommendations" className="btn btn-primary">
                    <i className="bi bi-list-check me-2"></i>View All Recommendations
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Credit Factors */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-header bg-transparent py-3">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-diagram-3 text-primary me-2"></i>
                    Key Credit Factors
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <div className="p-3 border rounded-3 bg-light h-100">
                        <div className="d-flex justify-content-between mb-3">
                          <h6 className="mb-0 fw-bold">
                            <i className="bi bi-calendar-check me-2 text-success"></i>Payment History
                          </h6>
                          <span className="badge bg-success">Excellent</span>
                        </div>
                        <p className="small text-muted mb-3">You've made 98% of your payments on time.</p>
                        <div className="progress mb-3" style={{ height: '8px' }}>
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{ width: '98%' }} 
                            aria-valuenow={98} 
                            aria-valuemin={0} 
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <div>
                            <small className="text-muted fw-bold">Very High Impact</small>
                          </div>
                          <small className="text-success fw-bold">35% of Score</small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <div className="p-3 border rounded-3 bg-light h-100">
                        <div className="d-flex justify-content-between mb-3">
                          <h6 className="mb-0 fw-bold">
                            <i className="bi bi-credit-card me-2 text-warning"></i>Credit Utilization
                          </h6>
                          <span className="badge bg-warning text-dark">Fair</span>
                        </div>
                        <p className="small text-muted mb-3">You're using 45% of your available credit.</p>
                        <div className="progress mb-3" style={{ height: '8px' }}>
                          <div 
                            className="progress-bar bg-warning" 
                            role="progressbar" 
                            style={{ width: '45%' }} 
                            aria-valuenow={45} 
                            aria-valuemin={0} 
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <div>
                            <small className="text-muted fw-bold">High Impact</small>
                          </div>
                          <small className="text-warning fw-bold">30% of Score</small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-4 mb-3">
                      <div className="p-3 border rounded-3 bg-light h-100">
                        <div className="d-flex justify-content-between mb-3">
                          <h6 className="mb-0 fw-bold">
                            <i className="bi bi-clock-history me-2 text-info"></i>Credit Age
                          </h6>
                          <span className="badge bg-info">Good</span>
                        </div>
                        <p className="small text-muted mb-3">Your average account age is 6 years, 3 months.</p>
                        <div className="progress mb-3" style={{ height: '8px' }}>
                          <div 
                            className="progress-bar bg-info" 
                            role="progressbar" 
                            style={{ width: '75%' }} 
                            aria-valuenow={75} 
                            aria-valuemin={0} 
                            aria-valuemax={100}
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <div>
                            <small className="text-muted fw-bold">Medium Impact</small>
                          </div>
                          <small className="text-info fw-bold">15% of Score</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <Link to="/factors" className="btn btn-outline-primary">
                      <i className="bi bi-pie-chart me-2"></i>View Detailed Factor Analysis
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage; 