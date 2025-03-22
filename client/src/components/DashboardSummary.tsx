import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCredit } from '../context/CreditContext';
import CreditScoreCard from './CreditScoreCard';

const DashboardSummary: React.FC = () => {
  const { user } = useAuth();
  const { getCreditProfiles, loading } = useCredit();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await getCreditProfiles(user.id);
          setProfiles(data);
        } catch (error) {
          console.error('Error fetching credit profiles:', error);
        }
      }
    };

    fetchData();
  }, [user, getCreditProfiles]);

  // Calculate average score across all bureaus
  const calculateAverageScore = (): number => {
    if (!profiles || profiles.length === 0) return 0;
    
    const totalScore = profiles.reduce((sum, profile) => sum + profile.score, 0);
    return Math.round(totalScore / profiles.length);
  };

  if (loading) {
    return <div className="text-center p-4">Loading your credit profiles...</div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Credit Score Summary</h2>
      </div>
      <div className="card-body">
        {profiles.length === 0 ? (
          <div className="text-center">
            <p>No credit profiles found. Start by adding your first credit report.</p>
            <Link to="/reports" className="btn btn-primary mt-2">Add Credit Report</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <h3>Average Credit Score</h3>
              <div className="score-circle">
                <span className="score-number">{calculateAverageScore()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {profiles.map((profile) => (
                <CreditScoreCard
                  key={profile.id}
                  bureau={profile.bureau}
                  score={profile.score}
                  lastUpdated={profile.lastUpdated}
                  onClick={() => window.location.href = `/reports/${profile.id}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="card-footer">
        <Link to="/reports" className="btn btn-primary">View Detailed Reports</Link>
      </div>
    </div>
  );
};

export default DashboardSummary; 