import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    try {
      // Mock login if Firebase is not yet configured by the user
      if (auth.app.options.apiKey === "YOUR_API_KEY" || !auth.app.options.apiKey) {
        console.warn("Firebase is not configured! Simulating login...");
        const mockUser = {
          uid: 'mock-uid-123',
          displayName: 'Test User',
          email: 'test@example.com',
          photoURL: 'https://ui-avatars.com/api/?name=Test+User'
        };
        setUser(mockUser);
        localStorage.setItem('snapcv_mock_user', JSON.stringify(mockUser));
        return { user: mockUser };
      }
      
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (auth.app.options.apiKey === "YOUR_API_KEY" || !auth.app.options.apiKey) {
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
    if (auth.app.options.apiKey === "YOUR_API_KEY" || !auth.app.options.apiKey) {
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
  }, []);

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
