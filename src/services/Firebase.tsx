// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAV_OwW0f-Fhw68mPK2cCdZ90ul8NxZTss',
  authDomain: 'tasks-4efa9.firebaseapp.com',
  projectId: 'tasks-4efa9',
  storageBucket: 'tasks-4efa9.appspot.com',
  messagingSenderId: '275713237216',
  appId: '1:275713237216:web:5bed92172796346e66f085',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirebase = () => {
  return app;
};

export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);

export const userSignOut = () => {
  signOut(authentication);
};
