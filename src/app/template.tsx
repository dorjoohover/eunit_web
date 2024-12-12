"use client";

import { ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppContext } from "@/_context";
import { getUserData, loginUser, logOut } from "@/(api)/auth.api";
import { UserType } from "@/config/enum";
import { AdminNavbar, Navbar } from "@/components/navbar/navbar";
import Loading from "./loading";
import { Footer } from "@/components/footer";

const Template = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();
  const { user, setUser, refetchUser } = useAppContext();

  useEffect(() => {
    const handler = async () => {
      try {
        const { data: dataUser } = await getUserData();
        console.log(dataUser);
        if ((dataUser == undefined || dataUser == null) && user == undefined) {
          if (data?.user != undefined) {
            const res = await loginUser(
              data.user.email!,
              data.user.image!,
              data.user.name!
            );
            if (res) setUser(res);
          }
        } else {
          if (data && dataUser) {
            setUser(dataUser);
          } else {
            logOut();
            refetchUser();
          }
        }
      } catch (error) {
        console.error("Error during handler execution:", error);
      }
    };

    if (status === "authenticated") {
      handler();
    }
    console.log(status);
    if (status === "unauthenticated") {
      logOut();
      refetchUser();
    }
  }, [status]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Template;
