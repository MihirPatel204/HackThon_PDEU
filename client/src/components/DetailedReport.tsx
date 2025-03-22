import React from 'react';
import CreditScoreCard from './CreditScoreCard';

interface CreditFactor {
  factor: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface CreditAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  creditLimit?: number;
  paymentStatus: string;
  lastReported: string;
}

interface DetailedReportProps {
  report: {
    id: string;
    bureau: string;
    score: number;
    lastUpdated: string;
    factors: CreditFactor[];
    accounts: CreditAccount[];
  };
}

const DetailedReport: React.FC<DetailedReportProps> = ({ report }) => {
  const getImpactClass = (impact: string): string => {
    switch (impact) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-danger';
      default:
        return 'text-muted';
    }
  };

  return (
    <div className="detailed-report">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <CreditScoreCard
            bureau={report.bureau}
            score={report.score}
            lastUpdated={report.lastUpdated}
          />
        </div>
        
        <div className="md:col-span-2">
          <div className="card mb-4">
            <div className="card-header">
              <h3>Credit Factors</h3>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {report.factors.map((factor, index) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>{factor.factor}</strong>
                      <span className={getImpactClass(factor.impact)}>
                        {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)}
                      </span>
                    </div>
                    <p className="mb-0 text-sm">{factor.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mt-4">
        <div className="card-header">
          <h3>Credit Accounts</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Balance</th>
                  <th>Credit Limit</th>
                  <th>Payment Status</th>
                  <th>Last Reported</th>
                </tr>
              </thead>
              <tbody>
                {report.accounts.map((account) => (
                  <tr key={account.id}>
                    <td>{account.name}</td>
                    <td>{account.type}</td>
                    <td>${account.balance.toLocaleString()}</td>
                    <td>{account.creditLimit ? `$${account.creditLimit.toLocaleString()}` : 'N/A'}</td>
                    <td>{account.paymentStatus}</td>
                    <td>{account.lastReported}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport; 