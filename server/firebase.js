// Import the functions you need from the SDKs you need
import en from './envConfig.js'
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Importa Firebase Storage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  
  apiKey: en.fireApiK,
  authDomain: en.fireDomain,
  projectId: en.firePId,
  storageBucket: en.fireStoreBuck,
  messagingSenderId: en.fireMess,
  appId: en.fireAppId,
  measurementId: en.fireMeasure
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

 
