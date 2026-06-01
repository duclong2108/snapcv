import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHNFwTJ5u8bEnYIpoHHzJDvTL784cCR1Q",
  authDomain: "snapcv-app.firebaseapp.com",
  projectId: "snapcv-app",
  storageBucket: "snapcv-app.firebasestorage.app",
  messagingSenderId: "1036667552302",
  appId: "1:1036667552302:web:2cdb5f31597f45028615bf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const facebookProvider = new FacebookAuthProvider();
