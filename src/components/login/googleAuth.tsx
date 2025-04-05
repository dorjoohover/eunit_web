import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { Button, Flex, Text } from "@mantine/core";
import { Colors } from "@/base/constants";
import { GoogleIcon } from "../icons";

const GoogleAuth = () => {
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      const token = await user.user.getIdToken();
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
  return (
    <Button
      c={"black"}
      unstyled
      bg={"white"}
      w={"100%"}
      h={"auto"}
      style={{
        border: `2px solid ${Colors.stroke}`,
        borderRadius: 10,
      }}
      fz={"1.1em"}
      onClick={() => signInWithGoogle()}
    >
      <Flex w={"100%"} justify={"center"} align={"center"} py={8}>
        <GoogleIcon size="1.4em" />
        <Text c={"black"} fz={"1.1em"}>
          Google хаягаар нэвтрэх
        </Text>
      </Flex>
    </Button>
  );
};

export default GoogleAuth;
