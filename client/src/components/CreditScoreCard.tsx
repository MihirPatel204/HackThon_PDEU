import React from 'react';

interface CreditScoreCardProps {
  bureau: string;
  score: number;
  lastUpdated: string;
  onClick?: () => void;
}

const CreditScoreCard: React.FC<CreditScoreCardProps> = ({ 
  bureau, 
  score, 
  lastUpdated,
  onClick 
}) => {
  // Determine score class based on score value
  const getScoreClass = (score: number): string => {
    if (score >= 750) return 'score-excellent';
    if (score >= 700) return 'score-good';
    if (score >= 650) return 'score-fair';
    if (score >= 600) return 'score-poor';
    return 'score-bad';
  };

  // Get text description of the score
  const getScoreText = (score: number): string => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };

  return (
    <div className="card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="card-header">
        <h3>{bureau}</h3>
      </div>
      <div className="card-body text-center">
        <div className={`score-circle ${getScoreClass(score)}`}>
          <span className="score-number">{score}</span>
        </div>
        <p className="score-text">{getScoreText(score)}</p>
        <p className="text-sm">Last updated: {lastUpdated}</p>
      </div>
    </div>
  );
};

export default CreditScoreCard; 