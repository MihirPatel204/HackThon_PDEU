import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-accent">Multi-Bureau</span> Credit System
            </h1>
            <div className="hero-tagline">
              <span className="hero-tagline-line">All Your Credit Scores.</span>
              <span className="hero-tagline-line">One Dashboard.</span>
              <span className="hero-tagline-line">Total Control.</span>
            </div>
            <p className="hero-description">
              Track, monitor, and improve your credit scores from all major bureaus with our comprehensive dashboard designed to help you achieve financial success.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="hero-button button-primary">
                <span className="button-icon">🚀</span>
                <span>Get Started Free</span>
              </Link>
              <Link to="/login" className="hero-button button-secondary">
                <span className="button-icon">👋</span>
                <span>Sign In</span>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">10K+</span>
                <span className="hero-stat-label">Active Users</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">3</span>
                <span className="hero-stat-label">Credit Bureaus</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">97%</span>
                <span className="hero-stat-label">Satisfaction Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="dashboard-preview">
              <div className="dashboard-preview-content">
                <div className="dashboard-preview-header">
                  <div className="dashboard-score-summary">
                    <div className="dashboard-score excellent">
                      <div className="score-number">740</div>
                      <div className="score-label">Experian</div>
                    </div>
                    <div className="dashboard-score good">
                      <div className="score-number">725</div>
                      <div className="score-label">Equifax</div>
                    </div>
                    <div className="dashboard-score good">
                      <div className="score-number">715</div>
                      <div className="score-label">TransUnion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Platform?</h2>
            <p className="section-subtitle">Everything you need to master your credit score, all in one place</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📊</span>
              </div>
              <h3 className="feature-title">Multi-Bureau Tracking</h3>
              <p className="feature-description">
                Monitor your credit scores across Experian, Equifax, and TransUnion in one comprehensive dashboard for complete visibility.
              </p>
              <div className="feature-tag">Time-Saving</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🔍</span>
              </div>
              <h3 className="feature-title">Advanced Score Analysis</h3>
              <p className="feature-description">
                Understand exactly what affects your score with detailed factor analysis, historical trends, and personalized insights.
              </p>
              <div className="feature-tag">Data-Driven</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📈</span>
              </div>
              <h3 className="feature-title">Score Improvement Plan</h3>
              <p className="feature-description">
                Receive AI-powered recommendations tailored to your specific credit situation to boost your scores quickly and effectively.
              </p>
              <div className="feature-tag">Personalized</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🔔</span>
              </div>
              <h3 className="feature-title">Real-time Alerts</h3>
              <p className="feature-description">
                Get instant notifications about changes to your credit report, potential fraud, or important updates that could affect your score.
              </p>
              <div className="feature-tag">Proactive</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">🔐</span>
              </div>
              <h3 className="feature-title">Bank-Level Security</h3>
              <p className="feature-description">
                Rest easy knowing your data is protected with enterprise-grade encryption, secure authentication, and privacy controls.
              </p>
              <div className="feature-tag">Secure</div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">📱</span>
              </div>
              <h3 className="feature-title">Mobile Friendly</h3>
              <p className="feature-description">
                Access your credit information anytime, anywhere with our fully responsive design optimized for all devices.
              </p>
              <div className="feature-tag">Accessible</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Get started in minutes with just a few simple steps</p>
          </div>
          
          <div className="steps-container">
            <div className="steps-connector"></div>
            
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Create Your Account</h4>
                <p className="step-description">
                  Sign up in less than 2 minutes with our simple, secure registration process. No credit card required.
                </p>
              </div>
              <div className="step-icon">👤</div>
            </div>
            
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Connect Your Bureaus</h4>
                <p className="step-description">
                  Securely link your credit bureau accounts using our encrypted connection system for real-time data.
                </p>
              </div>
              <div className="step-icon">🔄</div>
            </div>
            
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Get Your Unified Dashboard</h4>
                <p className="step-description">
                  Instantly access your comprehensive credit profile with scores from all three major bureaus.
                </p>
              </div>
              <div className="step-icon">📊</div>
            </div>
            
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Follow Your Custom Plan</h4>
                <p className="step-description">
                  Implement the personalized recommendations to systematically improve your credit scores over time.
                </p>
              </div>
              <div className="step-icon">📈</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">Join thousands of satisfied customers who have improved their credit</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">JD</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">John Doe</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "I was able to increase my credit score by 85 points in just 3 months following the recommendations. The multi-bureau tracking saved me so much time!"
              </p>
              <div className="testimonial-result">+85 points in 3 months</div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">JS</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Jane Smith</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "The real-time alerts helped me catch a fraudulent account that appeared on my credit report. Without this system, I might not have noticed for months."
              </p>
              <div className="testimonial-result">Prevented identity theft</div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-avatar">RJ</div>
                <div className="testimonial-info">
                  <div className="testimonial-name">Robert Johnson</div>
                  <div className="testimonial-stars">★★★★★</div>
                </div>
              </div>
              <p className="testimonial-text">
                "As a first-time home buyer, I needed to get my credit in shape fast. This platform guided me through exactly what to do, and I was approved for my mortgage!"
              </p>
              <div className="testimonial-result">Mortgage approved</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Take Control of Your Credit?</h2>
              <p className="cta-description">
                Join thousands of users who have already improved their credit scores with our platform. Start your journey today!
              </p>
              <div className="cta-actions">
                <Link to="/register" className="cta-button">
                  <span>Create Free Account</span>
                  <span className="button-arrow">→</span>
                </Link>
                <div className="cta-guarantee">
                  <span className="guarantee-icon">🛡️</span>
                  <span>30-day satisfaction guarantee</span>
                </div>
              </div>
            </div>
            <div className="cta-image">
              <div className="cta-score-animation">
                <div className="score-meter">
                  <div className="score-needle"></div>
                </div>
                <div className="score-value">+124 pts</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 