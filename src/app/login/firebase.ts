import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBw3lhapHYCPut50wOqUG-pLoQdUGps0qI",
  authDomain: "eunit-otp.firebaseapp.com",
  projectId: "eunit-otp",
  storageBucket: "eunit-otp.firebasestorage.app",
  messagingSenderId: "966034073048",
  appId: "1:966034073048:web:4644367fae343034213ead",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
