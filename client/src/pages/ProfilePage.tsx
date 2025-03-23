import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ProfileForm } from '../components';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'privacy'>('personal');

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-fluid py-4 px-4">
      {/* Profile Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-0 text-primary fw-bold">Your Profile</h1>
              <p className="text-muted mb-0">Manage your account information and settings</p>
            </div>
            <button className="btn btn-outline-primary rounded-pill">
              <i className="bi bi-arrow-clockwise me-2"></i>Refresh Data
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading State */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3 fs-5">Loading your profile...</span>
        </div>
      ) : (
        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-3 mb-4">
            {/* Profile Summary Card */}
            <div className="card shadow border-0 rounded-3 mb-4">
              <div className="card-body text-center">
                <div className="mb-3 position-relative">
                  <div 
                    className="avatar-circle mx-auto d-flex align-items-center justify-content-center position-relative"
                    style={{ 
                      width: '120px', 
                      height: '120px', 
                      backgroundColor: '#e9f5ff',
                      borderRadius: '50%',
                      fontSize: '48px',
                      fontWeight: 'bold',
                      color: '#0d6efd',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.07)'
                    }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    <div className="position-absolute bottom-0 end-0">
                      <button 
                        className="btn btn-primary btn-sm rounded-circle" 
                        style={{ width: '32px', height: '32px', padding: '0' }}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <h5 className="mb-1">{user?.name || 'User'}</h5>
                <p className="text-muted small mb-2">{user?.email || 'user@example.com'}</p>
                <div className="badge bg-success mb-3">Premium Member</div>
              </div>
              <div className="list-group list-group-flush rounded-bottom">
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'personal' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('personal')}
                >
                  <i className={`bi bi-person${activeTab === 'personal' ? '-fill' : ''} me-3`}></i>
                  Personal Information
                </button>
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'security' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <i className={`bi bi-shield-lock${activeTab === 'security' ? '-fill' : ''} me-3`}></i>
                  Security Settings
                </button>
                <button 
                  className={`list-group-item list-group-item-action d-flex align-items-center ${activeTab === 'privacy' ? 'active fw-bold' : ''}`}
                  onClick={() => setActiveTab('privacy')}
                >
                  <i className={`bi bi-eye-slash${activeTab === 'privacy' ? '-fill' : ''} me-3`}></i>
                  Privacy & Data
                </button>
              </div>
            </div>
            
            {/* Account Status Card */}
            <div className="card shadow border-0 rounded-3">
              <div className="card-body">
                <h6 className="card-title fw-bold mb-3">
                  <i className="bi bi-info-circle me-2 text-primary"></i>Account Status
                </h6>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small">Profile Completion</span>
                    <span className="small text-muted">85%</span>
                  </div>
                  <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      role="progressbar" 
                      style={{ width: '85%' }} 
                      aria-valuenow={85} 
                      aria-valuemin={0} 
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
                <div className="p-3 bg-light rounded-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <span className="small">
                      <i className="bi bi-calendar-check me-2 text-success"></i>Member Since
                    </span>
                    <span className="small text-muted">Jan 2023</span>
                  </div>
                </div>
                <div className="p-3 bg-light rounded-3 mb-2">
                  <div className="d-flex justify-content-between">
                    <span className="small">
                      <i className="bi bi-clock me-2 text-primary"></i>Last Login
                    </span>
                    <span className="small text-muted">Today</span>
                  </div>
                </div>
                <div className="p-3 bg-light rounded-3">
                  <div className="d-flex justify-content-between">
                    <span className="small">
                      <i className="bi bi-star me-2 text-warning"></i>Subscription
                    </span>
                    <span className="badge bg-primary rounded-pill px-3">Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-lg-9">
            <div className="tab-content">
              {/* Personal Information Tab */}
              <div className={`tab-pane fade ${activeTab === 'personal' ? 'show active' : ''}`}>
                <div className="card shadow border-0 rounded-3">
                  <div className="card-header bg-white py-3">
                    <h5 className="card-title mb-0 fw-bold">
                      <i className="bi bi-person-vcard me-2 text-primary"></i>Personal Information
                    </h5>
                  </div>
                  <div className="card-body">
                    <ProfileForm />
                  </div>
                </div>
              </div>
              
              {/* Security Settings Tab */}
              <div className={`tab-pane fade ${activeTab === 'security' ? 'show active' : ''}`}>
                <div className="card shadow border-0 rounded-3 mb-4">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                    <h5 className="card-title mb-0 fw-bold">
                      <i className="bi bi-shield-lock me-2 text-primary"></i>Security Settings
                    </h5>
                    <span className="badge bg-success rounded-pill px-3">
                      <i className="bi bi-shield-check me-1"></i>Secure
                    </span>
                  </div>
                  <div className="card-body">
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="fw-bold">
                        <i className="bi bi-key me-2 text-warning"></i>Password
                      </h6>
                      <p className="text-muted small">Last changed 30 days ago</p>
                      <button className="btn btn-sm btn-outline-primary rounded-pill">
                        <i className="bi bi-key me-2"></i>Change Password
                      </button>
                    </div>
                    
                    <hr />
                    
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="fw-bold">
                        <i className="bi bi-shield me-2 text-primary"></i>Two-Factor Authentication
                      </h6>
                      <div className="form-check form-switch mb-3">
                        <input className="form-check-input" type="checkbox" id="enableTwoFactor" />
                        <label className="form-check-label" htmlFor="enableTwoFactor">
                          Enable Two-Factor Authentication
                        </label>
                      </div>
                      <p className="text-muted small">
                        Add an extra layer of security to your account by requiring a verification code in addition to your password.
                      </p>
                      <button className="btn btn-sm btn-outline-primary rounded-pill">
                        <i className="bi bi-shield me-2"></i>Set Up 2FA
                      </button>
                    </div>
                    
                    <hr />
                    
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">
                        <i className="bi bi-pc-display me-2 text-success"></i>Login Sessions
                      </h6>
                      <p className="text-muted small">These are devices that have logged into your account.</p>
                      
                      <div className="list-group mb-3">
                        <div className="list-group-item border rounded-3 mb-2 border-success">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="d-flex align-items-center">
                                <div className="me-3 p-2 bg-light rounded-circle">
                                  <i className="bi bi-laptop fs-4 text-primary"></i>
                                </div>
                                <div>
                                  <h6 className="mb-0 fw-bold">Windows PC - Chrome</h6>
                                  <small className="text-muted">IP: 192.168.1.1 • New York, USA</small>
                                </div>
                              </div>
                            </div>
                            <span className="badge bg-success rounded-pill px-3">
                              <i className="bi bi-check-circle me-1"></i>Active Now
                            </span>
                          </div>
                        </div>
                        <div className="list-group-item border rounded-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <div className="d-flex align-items-center">
                                <div className="me-3 p-2 bg-light rounded-circle">
                                  <i className="bi bi-phone fs-4 text-info"></i>
                                </div>
                                <div>
                                  <h6 className="mb-0 fw-bold">iPhone - Safari</h6>
                                  <small className="text-muted">IP: 192.168.1.5 • New York, USA</small>
                                </div>
                              </div>
                            </div>
                            <button className="btn btn-sm btn-outline-danger rounded-pill">
                              <i className="bi bi-box-arrow-right me-1"></i>Sign Out
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <button className="btn btn-danger btn-sm rounded-pill">
                        <i className="bi bi-box-arrow-right me-2"></i>Sign Out All Devices
                      </button>
                    </div>
                    
                    <hr />
                    
                    <div>
                      <h6 className="fw-bold mb-3">
                        <i className="bi bi-clock-history me-2 text-info"></i>Login History
                      </h6>
                      <p className="text-muted small">Recent account activity</p>
                      
                      <div className="table-responsive">
                        <table className="table table-hover table-sm border">
                          <thead className="table-light">
                            <tr>
                              <th>Date & Time</th>
                              <th>Device</th>
                              <th>Location</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Today, 10:30 AM</td>
                              <td><i className="bi bi-laptop me-2"></i>Windows PC</td>
                              <td><i className="bi bi-geo-alt me-2"></i>New York, NY</td>
                              <td><span className="badge bg-success rounded-pill">Success</span></td>
                            </tr>
                            <tr>
                              <td>Yesterday, 8:15 PM</td>
                              <td><i className="bi bi-phone me-2"></i>iPhone</td>
                              <td><i className="bi bi-geo-alt me-2"></i>New York, NY</td>
                              <td><span className="badge bg-success rounded-pill">Success</span></td>
                            </tr>
                            <tr>
                              <td>Jun 12, 2023, 3:45 PM</td>
                              <td><i className="bi bi-question-circle me-2"></i>Unknown</td>
                              <td><i className="bi bi-geo-alt me-2"></i>Chicago, IL</td>
                              <td><span className="badge bg-danger rounded-pill">Failed</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card shadow border-0 rounded-3">
                  <div className="card-header bg-white py-3">
                    <h5 className="card-title mb-0 fw-bold">
                      <i className="bi bi-info-circle me-2 text-primary"></i>Security Tips
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-primary d-flex" role="alert">
                      <div className="me-3">
                        <i className="bi bi-shield-check fs-3"></i>
                      </div>
                      <div>
                        <h6 className="alert-heading fw-bold">Use a Strong Password</h6>
                        <p className="mb-0 small">Make sure to use a combination of letters, numbers, and special characters.</p>
                      </div>
                    </div>
                    
                    <div className="alert alert-warning d-flex" role="alert">
                      <div className="me-3">
                        <i className="bi bi-exclamation-triangle fs-3"></i>
                      </div>
                      <div>
                        <h6 className="alert-heading fw-bold">Enable Two-Factor Authentication</h6>
                        <p className="mb-0 small">Two-factor authentication adds an extra layer of security to your account.</p>
                      </div>
                    </div>
                    
                    <div className="alert alert-info d-flex" role="alert">
                      <div className="me-3">
                        <i className="bi bi-envelope-check fs-3"></i>
                      </div>
                      <div>
                        <h6 className="alert-heading fw-bold">Check Your Email Regularly</h6>
                        <p className="mb-0 small">We send important security notifications to your email address.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Privacy & Data Tab */}
              <div className={`tab-pane fade ${activeTab === 'privacy' ? 'show active' : ''}`}>
                <div className="card shadow border-0 rounded-3 mb-4">
                  <div className="card-header bg-white py-3">
                    <h5 className="card-title mb-0 fw-bold">
                      <i className="bi bi-eye-slash me-2 text-primary"></i>Privacy Settings
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Email Notifications</h6>
                      
                      <div className="form-check form-switch mb-3 p-3 bg-light rounded-3">
                        <input className="form-check-input" type="checkbox" id="emailScoreChanges" checked />
                        <label className="form-check-label" htmlFor="emailScoreChanges">
                          <strong>Credit Score Changes</strong>
                          <p className="text-muted small mb-0">Receive notifications when your credit score changes.</p>
                        </label>
                      </div>
                      
                      <div className="form-check form-switch mb-3 p-3 bg-light rounded-3">
                        <input className="form-check-input" type="checkbox" id="emailNewsletters" checked />
                        <label className="form-check-label" htmlFor="emailNewsletters">
                          <strong>Credit Tips & Newsletters</strong>
                          <p className="text-muted small mb-0">Receive educational content and tips to improve your credit.</p>
                        </label>
                      </div>
                      
                      <div className="form-check form-switch mb-3 p-3 bg-light rounded-3">
                        <input className="form-check-input" type="checkbox" id="emailPromotions" />
                        <label className="form-check-label" htmlFor="emailPromotions">
                          <strong>Promotional Offers</strong>
                          <p className="text-muted small mb-0">Receive special offers from our partners.</p>
                        </label>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Data Sharing</h6>
                      
                      <div className="form-check form-switch mb-3 p-3 bg-light rounded-3">
                        <input className="form-check-input" type="checkbox" id="shareAnonymousData" checked />
                        <label className="form-check-label" htmlFor="shareAnonymousData">
                          <strong>Anonymous Data Analytics</strong>
                          <p className="text-muted small mb-0">Allow us to use anonymized data to improve our services.</p>
                        </label>
                      </div>
                      
                      <div className="form-check form-switch mb-3 p-3 bg-light rounded-3">
                        <input className="form-check-input" type="checkbox" id="shareWithPartners" />
                        <label className="form-check-label" htmlFor="shareWithPartners">
                          <strong>Share with Partners</strong>
                          <p className="text-muted small mb-0">Allow us to share your data with trusted partners.</p>
                        </label>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Connected Services</h6>
                      
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="me-3 p-2 bg-white rounded-circle shadow-sm">
                            <i className="bi bi-bank fs-4 text-primary"></i>
                          </div>
                          <div>
                            <h6 className="mb-0">Bank of America</h6>
                            <small className="text-muted">Connected on Jun 10, 2023</small>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-danger rounded-pill">Disconnect</button>
                      </div>
                      
                      <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mb-3">
                        <div className="d-flex align-items-center">
                          <div className="me-3 p-2 bg-white rounded-circle shadow-sm">
                            <i className="bi bi-credit-card fs-4 text-success"></i>
                          </div>
                          <div>
                            <h6 className="mb-0">Capital One</h6>
                            <small className="text-muted">Connected on May 22, 2023</small>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-danger rounded-pill">Disconnect</button>
                      </div>
                      
                      <div className="text-center mt-3">
                        <button className="btn btn-outline-primary rounded-pill">
                          <i className="bi bi-plus-circle me-2"></i>Connect Another Service
                        </button>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div>
                      <h6 className="fw-bold mb-3 text-danger">Danger Zone</h6>
                      
                      <div className="alert alert-danger">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="alert-heading fw-bold">Delete Account</h6>
                            <p className="mb-0 small">This action is permanent and cannot be undone.</p>
                          </div>
                          <button className="btn btn-danger">Delete Account</button>
                        </div>
                      </div>
                      
                      <div className="alert alert-warning">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="alert-heading fw-bold">Export Your Data</h6>
                            <p className="mb-0 small">Download a copy of all your personal data.</p>
                          </div>
                          <button className="btn btn-warning">Export Data</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card shadow border-0 rounded-3">
                  <div className="card-header bg-white py-3">
                    <h5 className="card-title mb-0 fw-bold">
                      <i className="bi bi-lock me-2 text-primary"></i>Privacy Tips
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-info d-flex" role="alert">
                      <div className="me-3">
                        <i className="bi bi-eye-slash fs-3"></i>
                      </div>
                      <div>
                        <h6 className="alert-heading fw-bold">Regularly Review Connected Services</h6>
                        <p className="mb-0 small">Make sure to review and disconnect services you no longer use.</p>
                      </div>
                    </div>
                    
                    <div className="alert alert-primary d-flex" role="alert">
                      <div className="me-3">
                        <i className="bi bi-file-lock2 fs-3"></i>
                      </div>
                      <div>
                        <h6 className="alert-heading fw-bold">Be Careful What You Share</h6>
                        <p className="mb-0 small">Only share your personal information with trusted sources.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 