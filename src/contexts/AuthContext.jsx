import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import LoginModal from '../components/LoginModal';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMockMode = auth.app.options.apiKey === "YOUR_API_KEY" || !auth.app.options.apiKey;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const mockLogin = (providerName) => {
    return new Promise((resolve, reject) => {
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const popupUrl = `${window.location.origin}${window.location.pathname}#/mock-auth?provider=${providerName.toLowerCase()}`;
      
      const popup = window.open(
        popupUrl,
        'MockAuthPopup',
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const messageListener = (event) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data && event.data.type === 'MOCK_AUTH_SUCCESS') {
          const mockUser = event.data.user;
          setUser(mockUser);
          localStorage.setItem('snapcv_mock_user', JSON.stringify(mockUser));
          
          window.removeEventListener('message', messageListener);
          resolve({ user: mockUser });
        }
      };

      window.addEventListener('message', messageListener);

      // Clean up listener if window closed without messaging
      const checkClosed = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          // Don't reject, just let them close it
        }
      }, 1000);
    });
  };

  const loginWithGoogle = async () => {
    try {
      if (isMockMode) return await mockLogin('Google');
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithFacebook = async () => {
    try {
      if (isMockMode) return await mockLogin('Facebook');
      return await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (isMockMode) {
        setUser(null);
        localStorage.removeItem('snapcv_mock_user');
        return;
      }
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  useEffect(() => {
    // If not configured, check mock user
    if (isMockMode) {
      const mockUser = localStorage.getItem('snapcv_mock_user');
      if (mockUser) setUser(JSON.parse(mockUser));
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isMockMode]);

  const value = {
    user,
    loading,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    openLoginModal,
    closeLoginModal
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </AuthContext.Provider>
  );
};
