import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path fill="#2c3e50" fillOpacity="1" d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,69.3C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
        </svg>
      </div>
      
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <h3 className="footer-logo">
                Credit<span className="footer-logo-accent">360</span>
              </h3>
              <div className="footer-logo-badge">Multi-Bureau</div>
            </div>
            
            <p className="footer-tagline">
              Your comprehensive credit monitoring solution across all major bureaus, helping you improve your financial health.
            </p>
            
            <div className="footer-newsletter">
              <h4 className="footer-newsletter-title">Get Credit Tips</h4>
              <p className="footer-newsletter-subtitle">Sign up for our newsletter</p>
              <div className="footer-subscribe">
                <input type="email" placeholder="Your email address" className="footer-email-input" />
                <button className="footer-subscribe-button">Subscribe</button>
              </div>
            </div>
            
            <div className="footer-social">
              <a href="https://twitter.com" className="social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.599-.1-.899a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.7 3H4.3A1.3 1.3 0 0 0 3 4.3v15.4A1.3 1.3 0 0 0 4.3 21h15.4a1.3 1.3 0 0 0 1.3-1.3V4.3A1.3 1.3 0 0 0 19.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.779 3.203 4.092v4.711z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                  <circle cx="16.806" cy="7.207" r="1.078"></circle>
                  <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-container">
            <div className="footer-links-group">
              <h4 className="footer-links-title">Service</h4>
              <ul className="footer-links-list">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                <li><Link to="/reports" className="footer-link">Credit Reports</Link></li>
                <li><Link to="/profile" className="footer-link">Profile Settings</Link></li>
                <li><Link to="/alerts" className="footer-link">Credit Alerts</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-links-title">Bureaus</h4>
              <ul className="footer-links-list">
                <li><a href="https://www.experian.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                  <span className="bureau-icon bureau-experian"></span>
                  Experian
                </a></li>
                <li><a href="https://www.equifax.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                  <span className="bureau-icon bureau-equifax"></span>
                  Equifax
                </a></li>
                <li><a href="https://www.transunion.com" className="footer-link" target="_blank" rel="noopener noreferrer">
                  <span className="bureau-icon bureau-transunion"></span>
                  TransUnion
                </a></li>
              </ul>
              <div className="footer-badge">Partners</div>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-links-title">Resources</h4>
              <ul className="footer-links-list">
                <li><Link to="/education" className="footer-link">Credit Education</Link></li>
                <li><Link to="/tips" className="footer-link">Improvement Tips</Link></li>
                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                <li><Link to="/blog" className="footer-link">Credit Blog</Link></li>
                <li><Link to="/calculator" className="footer-link">Score Calculator</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-group">
              <h4 className="footer-links-title">Company</h4>
              <ul className="footer-links-list">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
                <li><Link to="/careers" className="footer-link">Careers</Link></li>
                <li><Link to="/press" className="footer-link">Press Kit</Link></li>
              </ul>
              <div className="footer-app-links">
                <a href="#" className="app-download-button">
                  <span className="app-icon">📱</span>
                  <span className="app-text">Get the App</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} Credit360. All rights reserved.</p>
            <p className="footer-disclaimer">This is a demo application for educational purposes. Not affiliated with actual credit bureaus.</p>
          </div>
          
          <div className="footer-legal">
            <Link to="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-legal-separator">•</span>
            <Link to="/terms" className="footer-legal-link">Terms of Service</Link>
            <span className="footer-legal-separator">•</span>
            <Link to="/cookies" className="footer-legal-link">Cookie Policy</Link>
            <span className="footer-legal-separator">•</span>
            <Link to="/accessibility" className="footer-legal-link">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 