import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

const GoogleAuth = () => {
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      const token = user.user.getIdToken();
      if (token) {
        const res = await fetch("/api/login/phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
        }).then((d) => d.json());
        if (res.success) {
          notifications.show({
            position: "top-center",
            message: "Амжилттай нэвтэрлээ!",
          });
          router.refresh();
        } else {
          notifications.show({ position: "top-center", message: res.message });
        }
      } else {
        notifications.show({
          position: "top-center",
          message: "Амжилтгүй дахин оролдоно уу",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
};

export default GoogleAuth;
