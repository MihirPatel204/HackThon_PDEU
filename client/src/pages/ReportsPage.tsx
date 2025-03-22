import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Navbar, Footer, DetailedReport } from '../components';
import { useAuth } from '../context/AuthContext';
import { useCredit } from '../context/CreditContext';

const ReportsPage: React.FC = () => {
  const { reportId } = useParams<{ reportId?: string }>();
  const { user, loading: authLoading } = useAuth();
  const { getCreditReports, getCreditReport, loading, error } = useCredit();
  const [reports, setReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          if (reportId) {
            // Fetch a specific report
            const report = await getCreditReport(reportId);
            setSelectedReport(report);
          } else {
            // Fetch all reports
            const data = await getCreditReports(user.id);
            setReports(data);
            
            // If we have reports but no selected one, select the first
            if (data.length > 0 && !selectedReport) {
              setSelectedReport(data[0]);
            }
          }
        } catch (error) {
          console.error('Error fetching credit reports:', error);
        }
      }
    };

    fetchData();
  }, [user, reportId, getCreditReports, getCreditReport, selectedReport]);

  // Select a report to view details
  const handleSelectReport = (report: any) => {
    setSelectedReport(report);
  };

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-4">
        <h1 className="mb-4">Credit Reports</h1>
        
        {error && <div className="alert alert-danger mb-4">{error}</div>}
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-3">Loading credit reports...</p>
          </div>
        ) : (
          <>
            {reports.length === 0 ? (
              <div className="card">
                <div className="card-body text-center">
                  <h3>No Credit Reports Found</h3>
                  <p>You don't have any credit reports yet. Click the button below to add your first report.</p>
                  <button className="btn btn-primary mt-3">Add Credit Report</button>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-header">
                      <h3>Your Reports</h3>
                    </div>
                    <div className="card-body p-0">
                      <ul className="list-group list-group-flush">
                        {reports.map((report) => (
                          <li
                            key={report.id}
                            className={`list-group-item ${selectedReport && selectedReport.id === report.id ? 'active' : ''}`}
                            onClick={() => handleSelectReport(report)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="d-flex justify-content-between align-items-center">
                              <span>{report.bureau}</span>
                              <span className="badge badge-primary">{report.score}</span>
                            </div>
                            <small className="text-muted">Last updated: {report.lastUpdated}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-outline-primary btn-block">Add New Report</button>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-9">
                  {selectedReport ? (
                    <DetailedReport report={selectedReport} />
                  ) : (
                    <div className="card">
                      <div className="card-body text-center">
                        <h3>Select a Report</h3>
                        <p>Please select a credit report from the list to view its details.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportsPage; 