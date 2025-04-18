"use client";

import { ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppContext } from "@/_context";
import { getUserData, loginUser } from "@/(api)/auth.api";
import {
  AdminNavbar,
  BottomNavigationBar,
  Navbar,
  SideBar,
} from "@/components/navbar/navbar";
import { Loading } from "./loading";
import { Footer } from "@/components/footer";
import { useMediaQuery } from "@mantine/hooks";
import { Box } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

type TemplateProps = {
  children: ReactNode;
};

const Template = ({ children }: TemplateProps) => {
  const { data: session, status } = useSession();
  const { user, setUser, refetchUser } = useAppContext();
  const matches = useMediaQuery("(min-width: 50em)");
  const router = useRouter();
  const pathname = usePathname();
  const syncUser = async () => {
    try {
      const { data: backendUser } = await getUserData();

      if (backendUser) {
        setUser(backendUser);
        return;
      }

      if (!user && session?.user) {
        const newUser = await loginUser(
          session.user.email!,
          session.user.image!,
          session.user.name!
        );
        if (newUser) setUser(newUser);
      } else {
        refetchUser();
      }
      if (pathname == "/login") {
        router.push("/");
        notifications.show({
          position: "top-center",
          message: "Амжилттай нэвтэрлээ!",
        });
      }
    } catch (error) {
      console.error("Error syncing user:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      syncUser();
    } else if (status === "unauthenticated") {
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
      <Box pl={!matches ? 0 : 60}>
        <Footer />
      </Box>
      {matches ? <SideBar /> : <BottomNavigationBar />}
    </>
  );
};

export default Template;
