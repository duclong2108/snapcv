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
    console.warn(`Firebase is not configured! Simulating login with ${providerName}...`);
    const mockUser = {
      uid: `mock-uid-${Date.now()}`,
      displayName: 'Test User',
      email: `test.${providerName}@example.com`,
      photoURL: `https://ui-avatars.com/api/?name=Test+User&background=random`
    };
    setUser(mockUser);
    localStorage.setItem('snapcv_mock_user', JSON.stringify(mockUser));
    return { user: mockUser };
  };

  const loginWithGoogle = async () => {
    try {
      if (isMockMode) return mockLogin('Google');
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithFacebook = async () => {
    try {
      if (isMockMode) return mockLogin('Facebook');
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
