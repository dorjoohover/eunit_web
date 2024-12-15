"use client";

import { ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppContext } from "@/_context";
import { getUserData, loginUser, logOut } from "@/(api)/auth.api";
import { UserType } from "@/config/enum";
import {
  AdminNavbar,
  BottomNavigationBar,
  Navbar,
  SideBar,
} from "@/components/navbar/navbar";
import { Loading } from "./loading";
import { Footer } from "@/components/footer";
import { useMediaQuery } from "@mantine/hooks";

const Template = ({ children }: { children: ReactNode }) => {
  const { data, status } = useSession();
  const { user, setUser, refetchUser } = useAppContext();
  const matches = useMediaQuery("(min-width: 50em)");

  const handler = async () => {
    try {
      const { data: dataUser } = await getUserData();
      if ((dataUser == undefined || dataUser == null) && user == undefined) {
        if (data?.user != undefined) {
          console.log(data.user);
          const res = await loginUser(
            data?.user.email!,
            data?.user.image!,
            data?.user.name!
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
      // console.error("Error during handler execution:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      handler();
    }
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
      {matches && <SideBar />}
      {!matches && <BottomNavigationBar />}
    </>
  );
};

export default Template;
