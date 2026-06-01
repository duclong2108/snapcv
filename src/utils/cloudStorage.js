import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Save resume data to Firestore (debounced in Editor)
export const saveResumeToCloud = async (userId, resumeData) => {
  try {
    await setDoc(doc(db, 'resumes', userId), {
      resume: resumeData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving to cloud:', error);
    return false;
  }
};

// Load resume data from Firestore
export const loadResumeFromCloud = async (userId) => {
  try {
    const docRef = doc(db, 'resumes', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().resume;
    }
    return null;
  } catch (error) {
    console.error('Error loading from cloud:', error);
    return null;
  }
};

// Save settings to Firestore
export const saveSettingsToCloud = async (userId, settings) => {
  try {
    await setDoc(doc(db, 'resumes', userId), {
      settings: settings,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving settings to cloud:', error);
    return false;
  }
};

// Load settings from Firestore
export const loadSettingsFromCloud = async (userId) => {
  try {
    const docRef = doc(db, 'resumes', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().settings) {
      return docSnap.data().settings;
    }
    return null;
  } catch (error) {
    console.error('Error loading settings from cloud:', error);
    return null;
  }
};
