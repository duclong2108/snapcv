import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './MockAuth.css';

export default function MockAuth() {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider') || 'google';

  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  const handleSelectAccount = (email, name, avatar) => {
    const userData = {
      uid: `mock-uid-${Date.now()}`,
      displayName: name,
      email: email,
      photoURL: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    if (window.opener) {
      window.opener.postMessage({ type: 'MOCK_AUTH_SUCCESS', user: userData }, window.location.origin);
      window.close();
    }
  };

  const handleSubmitCustom = (e) => {
    e.preventDefault();
    if (!customName || !customEmail) return;
    handleSelectAccount(customEmail, customName);
  };

  useEffect(() => {
    document.title = provider === 'google' ? 'Sign in - Google Accounts' : 'Log in to Facebook';
  }, [provider]);

  if (provider === 'facebook') {
    return (
      <div className="fb-auth-container">
        <div className="fb-auth-header">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <h1>facebook</h1>
        </div>
        <div className="fb-auth-card">
          {!showCustomForm ? (
            <>
              <div className="fb-auth-card__header">
                <h3>Log in to Facebook</h3>
                <p>To connect with SnapCV</p>
              </div>
              <div className="fb-auth-card__profile">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="John Doe" />
                <div className="fb-profile-info">
                  <strong>John Doe</strong>
                  <span>john.doe@gmail.com</span>
                </div>
              </div>
              <button className="fb-login-btn" onClick={() => handleSelectAccount('john.doe@gmail.com', 'John Doe', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80')}>
                Continue as John
              </button>
              <button className="fb-cancel-btn" style={{ marginBottom: '8px' }} onClick={() => setShowCustomForm(true)}>
                Log in as another user
              </button>
              <button className="fb-cancel-btn" onClick={() => window.close()}>
                Cancel
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmitCustom} className="fb-custom-form">
              <div className="fb-auth-card__header">
                <h3>Log in to Facebook</h3>
                <p>Enter your details to test with your real account info</p>
              </div>
              <div className="fb-input-group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={customName}
                  onChange={e => setCustomName(e.target.value)}
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  value={customEmail}
                  onChange={e => setCustomEmail(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="fb-login-btn">
                Log In
              </button>
              <button type="button" className="fb-cancel-btn" onClick={() => setShowCustomForm(false)}>
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Google Provider (Default)
  return (
    <div className="google-auth-container">
      <div className="google-auth-card">
        <div className="google-logo-wrapper">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        </div>
        <h2>Sign in with Google</h2>
        <p className="google-subtitle">to continue to SnapCV</p>

        {!showCustomForm ? (
          <div className="google-account-list">
            <div className="google-account-item" onClick={() => handleSelectAccount('john.doe@gmail.com', 'John Doe', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80')}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80" alt="John Doe" />
              <div className="google-account-info">
                <strong>John Doe</strong>
                <span>john.doe@gmail.com</span>
              </div>
            </div>

            <div className="google-account-item" onClick={() => handleSelectAccount('jane.smith@gmail.com', 'Jane Smith', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80')}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80" alt="Jane Smith" />
              <div className="google-account-info">
                <strong>Jane Smith</strong>
                <span>jane.smith@gmail.com</span>
              </div>
            </div>

            <div className="google-account-item google-use-another" onClick={() => setShowCustomForm(true)}>
              <div className="google-another-icon">👤</div>
              <div className="google-account-info">
                <strong>Use another account</strong>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitCustom} className="google-custom-form">
            <div className="google-input-group">
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Email address" 
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                required 
              />
            </div>
            <div className="google-form-actions">
              <button type="button" className="google-back-btn" onClick={() => setShowCustomForm(false)}>
                Back
              </button>
              <button type="submit" className="google-submit-btn">
                Next
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
