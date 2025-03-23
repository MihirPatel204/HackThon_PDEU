import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define interfaces for our data
interface ApiStatus {
  name: string;
  status: 'online' | 'offline' | 'degraded';
  latency: number;
  lastChecked: string;
}

interface CustomerRisk {
  id: string;
  name: string;
  email: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  bureauScores: {
    experian?: number;
    equifax?: number;
    transunion?: number;
  };
  lastUpdated: string;
}

const AdminPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([]);
  const [customerRisks, setCustomerRisks] = useState<CustomerRisk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'customers' | 'settings'>('dashboard');

  // Function to fetch API statuses
  const fetchApiStatuses = async () => {
    try {
      // Mock data for demonstration
      const mockApiStatuses: ApiStatus[] = [
        {
          name: 'Experian API',
          status: 'online',
          latency: 230,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Equifax API',
          status: 'online',
          latency: 189,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'TransUnion API',
          status: 'degraded',
          latency: 450,
          lastChecked: new Date().toISOString()
        },
        {
          name: 'Risk Assessment Engine',
          status: 'online',
          latency: 95,
          lastChecked: new Date().toISOString()
        }
      ];
      
      setApiStatuses(mockApiStatuses);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch API statuses');
    }
  };

  // Function to fetch customer risk data
  const fetchCustomerRisks = async () => {
    try {
      // Mock data for demonstration
      const mockCustomerRisks: CustomerRisk[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          riskLevel: 'low',
          riskScore: 82,
          bureauScores: {
            experian: 750,
            equifax: 735,
            transunion: 742
          },
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          riskLevel: 'medium',
          riskScore: 58,
          bureauScores: {
            experian: 680,
            equifax: 665,
            transunion: 672
          },
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        {
          id: '3',
          name: 'Bob Johnson',
          email: 'bob.johnson@example.com',
          riskLevel: 'high',
          riskScore: 35,
          bureauScores: {
            experian: 590,
            equifax: 605,
            transunion: 580
          },
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        {
          id: '4',
          name: 'Alice Williams',
          email: 'alice.williams@example.com',
          riskLevel: 'low',
          riskScore: 78,
          bureauScores: {
            experian: 720,
            equifax: 725,
            transunion: 715
          },
          lastUpdated: new Date().toISOString().split('T')[0]
        },
        {
          id: '5',
          name: 'Charlie Brown',
          email: 'charlie.brown@example.com',
          riskLevel: 'medium',
          riskScore: 62,
          bureauScores: {
            experian: 695,
            equifax: 680,
            transunion: 688
          },
          lastUpdated: new Date().toISOString().split('T')[0]
        }
      ];
      
      setCustomerRisks(mockCustomerRisks);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch customer risk data');
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchApiStatuses(), fetchCustomerRisks()]);
      setLoading(false);
    };
    
    fetchData();
    
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Render a status badge based on status
  const renderStatusBadge = (status: 'online' | 'offline' | 'degraded') => {
    const badgeClasses = {
      online: 'bg-success',
      offline: 'bg-danger',
      degraded: 'bg-warning'
    };
    
    return (
      <span className={`badge ${badgeClasses[status]} rounded-pill px-3`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Render risk level badge
  const renderRiskBadge = (riskLevel: 'low' | 'medium' | 'high') => {
    const badgeClasses = {
      low: 'bg-success',
      medium: 'bg-warning text-dark',
      high: 'bg-danger'
    };
    
    return (
      <span className={`badge ${badgeClasses[riskLevel]} rounded-pill px-3`}>
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
      </span>
    );
  };

  // Redirect if not authenticated (or not admin in a real app)
  if (!authLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-fluid py-4 px-4">
      {/* Admin Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-0 text-primary fw-bold">Admin Dashboard</h1>
              <p className="text-muted mb-0">Manage credit bureau APIs and monitor customer risk</p>
            </div>
            <div className="d-flex">
              <div className="input-group me-2 shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input type="text" className="form-control border-start-0" placeholder="Search..." />
                <button className="btn btn-primary rounded-end">
                  Search
                </button>
              </div>
              <button className="btn btn-primary rounded-pill shadow-sm">
                <i className="bi bi-gear-fill me-2"></i>Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Admin tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <i className="bi bi-people-fill me-2"></i>Customers
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="bi bi-gear me-2"></i>System Settings
          </button>
        </li>
      </ul>
        
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-4 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3 fs-5">Loading admin data...</span>
        </div>
      ) : (
        <div className="tab-content">
          {/* Dashboard Tab */}
          <div className={`tab-pane fade ${activeTab === 'dashboard' ? 'show active' : ''}`}>
            {/* System Stats Cards */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white shadow border-0 h-100 rounded-3">
                  <div className="card-body d-flex p-4">
                    <div className="me-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-3">
                        <i className="bi bi-people-fill" style={{ fontSize: '2rem' }}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title text-white-50">Total Customers</h6>
                      <p className="card-text display-6 mb-0 fw-bold">125</p>
                      <small className="d-flex align-items-center">
                        <i className="bi bi-arrow-up-right me-1"></i>
                        <span>+12% from last month</span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white shadow border-0 h-100 rounded-3">
                  <div className="card-body d-flex p-4">
                    <div className="me-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-3">
                        <i className="bi bi-check-circle-fill" style={{ fontSize: '2rem' }}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title text-white-50">Successful API Calls</h6>
                      <p className="card-text display-6 mb-0 fw-bold">843</p>
                      <small>Last 24 hours</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-danger text-white shadow border-0 h-100 rounded-3">
                  <div className="card-body d-flex p-4">
                    <div className="me-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-3">
                        <i className="bi bi-x-circle-fill" style={{ fontSize: '2rem' }}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title text-white-50">Failed API Calls</h6>
                      <p className="card-text display-6 mb-0 fw-bold">17</p>
                      <small>Last 24 hours</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-warning text-dark shadow border-0 h-100 rounded-3">
                  <div className="card-body d-flex p-4">
                    <div className="me-3">
                      <div className="bg-white bg-opacity-25 rounded-circle p-3">
                        <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '2rem' }}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="card-title text-dark-50">High Risk Customers</h6>
                      <p className="card-text display-6 mb-0 fw-bold">8</p>
                      <small>Needs attention</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* API Status Section */}
            <div className="card mb-4 shadow border-0 rounded-3">
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="card-title mb-0 fw-bold">
                  <i className="bi bi-hdd-network me-2 text-primary"></i>Credit Bureau API Status
                </h5>
                <button className="btn btn-sm btn-outline-primary rounded-pill">
                  <i className="bi bi-arrow-clockwise me-1"></i>Refresh
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>API Name</th>
                        <th>Status</th>
                        <th>Latency (ms)</th>
                        <th>Last Checked</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiStatuses.map((api, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div 
                                className="status-indicator me-3 rounded-circle"
                                style={{ 
                                  width: '12px', 
                                  height: '12px', 
                                  background: api.status === 'online' ? '#28a745' : api.status === 'degraded' ? '#ffc107' : '#dc3545',
                                  boxShadow: `0 0 10px ${api.status === 'online' ? '#28a74560' : api.status === 'degraded' ? '#ffc10760' : '#dc354560'}`
                                }}
                              ></div>
                              <strong>{api.name}</strong>
                            </div>
                          </td>
                          <td>{renderStatusBadge(api.status)}</td>
                          <td>
                            <span className={api.latency > 300 ? 'text-danger' : 'text-success'}>
                              <i className={`bi ${api.latency > 300 ? 'bi-hourglass-split' : 'bi-lightning-charge'} me-1`}></i>
                              {api.latency} ms
                            </span>
                          </td>
                          <td>
                            <i className="bi bi-clock me-1 text-muted"></i>
                            {new Date(api.lastChecked).toLocaleString()}
                          </td>
                          <td>
                            <button 
                              className="btn btn-sm btn-outline-primary rounded-pill"
                              onClick={() => {
                                alert(`Manually checking ${api.name}...`);
                              }}
                            >
                              <i className="bi bi-arrow-repeat me-1"></i>Check Now
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* Customers Tab */}
          <div className={`tab-pane fade ${activeTab === 'customers' ? 'show active' : ''}`}>
            <div className="card shadow border-0 rounded-3">
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                <h5 className="card-title mb-0 fw-bold">
                  <i className="bi bi-shield-check me-2 text-primary"></i>Customer Risk Assessment
                </h5>
                <button className="btn btn-sm btn-success rounded-pill">
                  <i className="bi bi-plus-lg me-1"></i>Add Customer
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Risk Level</th>
                        <th>Risk Score</th>
                        <th>Bureau Scores</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerRisks.map((customer) => (
                        <tr key={customer.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="user-avatar me-2" style={{ 
                                width: '40px', 
                                height: '40px', 
                                borderRadius: '50%', 
                                background: `linear-gradient(135deg, #e9ecef, #ced4da)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                color: '#495057',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                              }}>
                                {customer.name.charAt(0)}
                              </div>
                              <div>
                                <strong>{customer.name}</strong>
                                <div className="small text-muted">ID: {customer.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i className="bi bi-envelope me-1 text-muted"></i>
                            {customer.email}
                          </td>
                          <td>{renderRiskBadge(customer.riskLevel)}</td>
                          <td>
                            <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
                              <div 
                                className={`progress-bar ${
                                  customer.riskScore >= 70 
                                    ? 'bg-success' 
                                    : customer.riskScore >= 50 
                                      ? 'bg-warning' 
                                      : 'bg-danger'
                                }`}
                                role="progressbar"
                                style={{ width: `${customer.riskScore}%` }}
                                aria-valuenow={customer.riskScore}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                              </div>
                            </div>
                            <small className="mt-1 d-block">
                              <strong>{customer.riskScore}</strong>/100
                            </small>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {customer.bureauScores.experian && (
                                <div className="bureau-score">
                                  <span className="badge bg-primary">
                                    <i className="bi bi-star-fill me-1 small"></i>
                                    Exp: {customer.bureauScores.experian}
                                  </span>
                                </div>
                              )}
                              {customer.bureauScores.equifax && (
                                <div className="bureau-score">
                                  <span className="badge bg-info text-dark">
                                    <i className="bi bi-star-fill me-1 small"></i>
                                    Eqf: {customer.bureauScores.equifax}
                                  </span>
                                </div>
                              )}
                              {customer.bureauScores.transunion && (
                                <div className="bureau-score">
                                  <span className="badge bg-secondary">
                                    <i className="bi bi-star-fill me-1 small"></i>
                                    TU: {customer.bureauScores.transunion}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <i className="bi bi-calendar-date me-1 text-muted"></i>
                            {customer.lastUpdated}
                          </td>
                          <td>
                            <div className="btn-group">
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => {
                                  alert(`Viewing details for ${customer.name}...`);
                                }}
                                data-bs-toggle="tooltip"
                                title="View Details"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => {
                                  alert(`Reassessing risk for ${customer.name}...`);
                                }}
                                data-bs-toggle="tooltip"
                                title="Reassess Risk"
                              >
                                <i className="bi bi-arrow-repeat"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => {
                                  alert(`Remove ${customer.name}?`);
                                }}
                                data-bs-toggle="tooltip"
                                title="Remove Customer"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer bg-white d-flex justify-content-between align-items-center py-3">
                <div>
                  <span className="badge bg-primary rounded-pill">
                    <i className="bi bi-people-fill me-1"></i>
                    Showing 5 of 125 customers
                  </span>
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className="page-item disabled">
                      <span className="page-link">
                        <i className="bi bi-chevron-left"></i>
                      </span>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">1</span>
                    </li>
                    <li className="page-item">
                      <button className="page-link">2</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">3</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Settings Tab */}
          <div className={`tab-pane fade ${activeTab === 'settings' ? 'show active' : ''}`}>
            <div className="card shadow border-0 rounded-3">
              <div className="card-header bg-white py-3">
                <h5 className="card-title mb-0 fw-bold">
                  <i className="bi bi-gear me-2 text-primary"></i>System Settings
                </h5>
              </div>
              <div className="card-body">
                <form>
                  <h6 className="mb-3 text-uppercase text-muted fw-bold d-flex align-items-center">
                    <i className="bi bi-hdd-network me-2"></i>API Configuration
                  </h6>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">Experian API Key</label>
                        <div className="input-group">
                          <input type="password" className="form-control" value="*******************" readOnly />
                          <button className="btn btn-outline-secondary" type="button">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-primary" type="button">
                            <i className="bi bi-arrow-repeat me-1"></i>Regenerate
                          </button>
                        </div>
                        <small className="text-muted mt-2 d-block">Last regenerated: 30 days ago</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">Experian API URL</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-link-45deg text-muted"></i>
                          </span>
                          <input type="text" className="form-control border-start-0" value="https://api.experian.com/credit-report" />
                        </div>
                        <small className="text-muted mt-2 d-block">Environment: Production</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">Equifax API Key</label>
                        <div className="input-group">
                          <input type="password" className="form-control" value="*******************" readOnly />
                          <button className="btn btn-outline-secondary" type="button">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-primary" type="button">
                            <i className="bi bi-arrow-repeat me-1"></i>Regenerate
                          </button>
                        </div>
                        <small className="text-muted mt-2 d-block">Last regenerated: 45 days ago</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">Equifax API URL</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-link-45deg text-muted"></i>
                          </span>
                          <input type="text" className="form-control border-start-0" value="https://api.equifax.com/credit-report" />
                        </div>
                        <small className="text-muted mt-2 d-block">Environment: Production</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">TransUnion API Key</label>
                        <div className="input-group">
                          <input type="password" className="form-control" value="*******************" readOnly />
                          <button className="btn btn-outline-secondary" type="button">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-primary" type="button">
                            <i className="bi bi-arrow-repeat me-1"></i>Regenerate
                          </button>
                        </div>
                        <small className="text-muted mt-2 d-block">Last regenerated: 15 days ago</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">TransUnion API URL</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-link-45deg text-muted"></i>
                          </span>
                          <input type="text" className="form-control border-start-0" value="https://api.transunion.com/credit-report" />
                        </div>
                        <small className="text-muted mt-2 d-block">Environment: Production</small>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <h6 className="mb-3 text-uppercase text-muted fw-bold d-flex align-items-center">
                    <i className="bi bi-sliders me-2"></i>System Configuration
                  </h6>
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">Data Refresh Interval (minutes)</label>
                        <div className="input-group">
                          <span className="input-group-text bg-white border-end-0">
                            <i className="bi bi-clock-history text-muted"></i>
                          </span>
                          <input type="number" className="form-control border-start-0" value="30" />
                        </div>
                        <small className="text-muted mt-2 d-block">Lower values may increase API costs</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3 p-3 bg-light rounded-3">
                        <label className="form-label fw-bold">Risk Algorithm Version</label>
                        <select className="form-select">
                          <option>v2.1.5 (Current)</option>
                          <option>v2.1.4</option>
                          <option>v2.1.3</option>
                        </select>
                        <small className="text-muted mt-2 d-block">Last updated: May 15, 2023</small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card mb-4 border-0 shadow-sm bg-light rounded-3">
                    <div className="card-body">
                      <h6 className="card-title fw-bold mb-3">System Mode Controls</h6>
                      
                      <div className="mb-3 d-flex justify-content-between align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="enableMockData" checked />
                            <label className="form-check-label fw-bold" htmlFor="enableMockData">
                              Enable Mock Data (Development Mode)
                            </label>
                          </div>
                          <small className="text-muted">Use sample data instead of real API calls</small>
                        </div>
                        <span className="badge bg-success rounded-pill">Enabled</span>
                      </div>
                      
                      <div className="mb-3 d-flex justify-content-between align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="enableDetailedLogs" checked />
                            <label className="form-check-label fw-bold" htmlFor="enableDetailedLogs">
                              Enable Detailed Logging
                            </label>
                          </div>
                          <small className="text-muted">Capture additional information for troubleshooting</small>
                        </div>
                        <span className="badge bg-success rounded-pill">Enabled</span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center p-3 bg-white rounded-3 shadow-sm">
                        <div>
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="maintenanceMode" />
                            <label className="form-check-label fw-bold" htmlFor="maintenanceMode">
                              Maintenance Mode
                            </label>
                          </div>
                          <small className="text-muted">Temporarily disable access to all users</small>
                        </div>
                        <span className="badge bg-secondary rounded-pill">Disabled</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end mt-4">
                    <button type="button" className="btn btn-outline-secondary me-2 rounded-pill">
                      <i className="bi bi-arrow-counterclockwise me-1"></i>Reset to Defaults
                    </button>
                    <button type="submit" className="btn btn-primary rounded-pill">
                      <i className="bi bi-save me-1"></i>Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage; 