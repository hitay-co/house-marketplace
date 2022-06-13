import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBfCguH8BnSZ8jBFp7H8ICKt_t-e4ae1ek',
  authDomain: 'house-marketplace-app-a1535.firebaseapp.com',
  projectId: 'house-marketplace-app-a1535',
  storageBucket: 'house-marketplace-app-a1535.appspot.com',
  messagingSenderId: '1002680321565',
  appId: '1:1002680321565:web:dd188fa70631d6a77768f4',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
