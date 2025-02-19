import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const GoogleAuth = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // User signed in
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default GoogleAuth;
