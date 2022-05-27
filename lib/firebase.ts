import { initializeApp, getApp } from 'firebase/app';
// these imports indicate 'next' to bundle them
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const app = (() => {
  // in the development phase, this code might be executed twice, but only one
  // app can be initialized with firebase
  try {
    return getApp();
  } catch (ex) {
    return initializeApp({
      apiKey: 'AIzaSyBMfmPWGDK_hugr1gw7IC7749ywuBQ4U8A',
      authDomain: 'nextfire-a6a96.firebaseapp.com',
      projectId: 'nextfire-a6a96',
      storageBucket: 'nextfire-a6a96.appspot.com',
      messagingSenderId: '710532354375',
      appId: '1:710532354375:web:f65f95fe9cacbd7cf23c62'
    });
  }
})();

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
