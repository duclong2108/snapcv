import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

// Get all resumes for a user
export const getUserResumes = async (userId) => {
  try {
    const resumesRef = collection(db, 'users', userId, 'resumes');
    const q = query(resumesRef, orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return [];
  }
};

// Get a specific resume
export const getResume = async (userId, resumeId) => {
  try {
    const docRef = doc(db, 'users', userId, 'resumes', resumeId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting resume:', error);
    return null;
  }
};

// Save resume data to Firestore
export const saveResumeToCloud = async (userId, resumeId, data, title = 'Untitled Resume') => {
  try {
    const docRef = doc(db, 'users', userId, 'resumes', resumeId);
    await setDoc(docRef, {
      ...data,
      title,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving to cloud:', error);
    return false;
  }
};

// Delete a resume
export const deleteResume = async (userId, resumeId) => {
  try {
    await deleteDoc(doc(db, 'users', userId, 'resumes', resumeId));
    return true;
  } catch (error) {
    console.error('Error deleting resume:', error);
    return false;
  }
};

// Backward compatibility (if needed)
export const loadResumeFromCloud = async (userId) => {
  const resumes = await getUserResumes(userId);
  if (resumes.length > 0) {
     return resumes[0].resume; // return the most recent one
  }
  return null;
};

export const loadSettingsFromCloud = async (userId) => {
  const resumes = await getUserResumes(userId);
  if (resumes.length > 0) {
     return resumes[0].settings; // return the most recent one
  }
  return null;
};
