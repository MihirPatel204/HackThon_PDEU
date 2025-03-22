import React from 'react';
import { Navigate } from 'react-router-dom';
import { Navbar, Footer, ProfileForm } from '../components';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-4">
        <h1 className="mb-4">Your Profile</h1>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-3">Loading your profile...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <ProfileForm />
              
              <div className="card mt-4">
                <div className="card-header">
                  <h3>Data Access & Privacy</h3>
                </div>
                <div className="card-body">
                  <h5>Data Access</h5>
                  <p>
                    You have control over your data. You can request a copy of all the data we have stored about you
                    or request deletion of your account and data at any time.
                  </p>
                  <div className="d-flex">
                    <button className="btn btn-outline-secondary mr-2">Download My Data</button>
                    <button className="btn btn-danger">Delete Account</button>
                  </div>
                  
                  <hr />
                  
                  <h5>Connected Services</h5>
                  <p>
                    You have connected the following credit bureaus to your account:
                  </p>
                  <ul className="list-group mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Experian
                      <button className="btn btn-sm btn-outline-danger">Disconnect</button>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      TransUnion
                      <button className="btn btn-sm btn-outline-danger">Disconnect</button>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Equifax
                      <button className="btn btn-sm btn-outline-danger">Disconnect</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="card mb-4">
                <div className="card-header">
                  <h3>Account Settings</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label className="d-flex justify-content-between align-items-center">
                      <span>Email Notifications</span>
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="emailNotifications" defaultChecked />
                        <label className="custom-control-label" htmlFor="emailNotifications"></label>
                      </div>
                    </label>
                    <small className="form-text text-muted">Receive email notifications about score changes</small>
                  </div>
                  
                  <div className="form-group">
                    <label className="d-flex justify-content-between align-items-center">
                      <span>SMS Alerts</span>
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="smsAlerts" />
                        <label className="custom-control-label" htmlFor="smsAlerts"></label>
                      </div>
                    </label>
                    <small className="form-text text-muted">Receive text messages for important alerts</small>
                  </div>
                  
                  <div className="form-group">
                    <label className="d-flex justify-content-between align-items-center">
                      <span>Two-Factor Authentication</span>
                      <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="twoFactor" />
                        <label className="custom-control-label" htmlFor="twoFactor"></label>
                      </div>
                    </label>
                    <small className="form-text text-muted">Enable 2FA for additional security</small>
                  </div>
                  
                  <button className="btn btn-primary btn-block mt-3">Save Settings</button>
                </div>
              </div>
              
              <div className="card">
                <div className="card-header">
                  <h3>Security & Privacy Tips</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Use a strong, unique password</li>
                    <li className="list-group-item">Enable two-factor authentication</li>
                    <li className="list-group-item">Regularly check your credit reports for unauthorized activity</li>
                    <li className="list-group-item">Consider a credit freeze if you suspect identity theft</li>
                    <li className="list-group-item">Use a secure internet connection when accessing your account</li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="/security-guide" className="btn btn-outline-primary btn-block">Read Our Security Guide</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage; 