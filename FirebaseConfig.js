// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4SFaj-IDPUK35SkxD8JuHW1xR9nbdD-Q",
  authDomain: "cherryai-884d1.firebaseapp.com",
  projectId: "cherryai-884d1",
  storageBucket: "cherryai-884d1.appspot.com",
  messagingSenderId: "827754310820",
  appId: "1:827754310820:web:da13499cc8e29b597dca31",
  measurementId: "G-NHB9R2J636"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
