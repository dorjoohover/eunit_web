"use client";
import { logOut } from "@/app/(api)/auth.api";
import Loading from "@/app/loading";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const signOut = async () => {
    await logOut().then((d) => {
      toast({
        title: "Амжилттай гарлаа.",
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
