"use client";
import { logOut } from "@/app/(api)/auth.api";
import { useAppContext } from "@/app/_context";
import Loading from "@/app/loading";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const toast = useToast();
  const router = useRouter();
  const { setUser } = useAppContext();
  const signOut = async () => {
    await logOut().then((d) => {
      toast({
        title: "Амжилттай гарлаа.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUser(undefined);
      router.push("/");
    });
  };
  useEffect(() => {
    signOut();
  }, []);
  return <Loading />;
}
