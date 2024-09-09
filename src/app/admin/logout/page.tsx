"use client";
import { logOut } from "@/app/(api)/auth.api";
import Loading from "@/app/loading";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  
  const router = useRouter();
  const signOut = async () => {
    await logOut().then((d) => {
      notifications.show({
        message: "Амжилттай гарлаа.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      localStorage.removeItem('user')
      router.push("/");
    });
  };
  useEffect(() => {
    signOut();
  }, []);
  return <Loading />;
}
