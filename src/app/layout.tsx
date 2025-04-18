import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { logoMiniWhite } from "@/utils/assets";
import { APIProvider } from "@vis.gl/react-google-maps";
import Head from "next/head";
import Navbar from "@/components/navbar";
import { AppWrapper } from "./_context";
import { fonts } from "./_fonts/rubik";
import NextAuthProvider from "./_context/auth";
import "@mantine/core/styles.css";
import ScrollTop from "@/components/global/scrollTop";
import {
  ColorSchemeScript,
  MantineProvider,
  MantineThemeProvider,
} from "@mantine/core";
import { theme } from "../theme";

import { Suspense } from "react";
import Loading from "./loading";
import { cookies, headers } from "next/headers";
import AdminBar from "@/components/navbar/adminBar";
import { Notifications } from "@mantine/notifications";
export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Eunit - Монголын зарын сайт",
    template: "Eunit | %s",
  },
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const type = cookies().get("type");

  return (
    <html lang="en" className={fonts.rubik.variable}>
      {/* <html lang="en"> */}
      <Head>
        <link
          rel=" shortcut icon"
          href={logoMiniWhite}
          type="image/png"
          sizes="32x32"
        />
        {/* <ColorSchemeScript />{" "} */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M0TJV3RY7T"
        ></script>
        <script>
          {/* window.dataLayer = window.dataLayer || []; function gtag() */}
          {/* {dataLayer.push(arguments)} */}
          {/* gtag('js', new Date()); gtag('config', 'G-M0TJV3RY7T'); */}
        </script>
      </Head>
      <body>
        <MantineProvider defaultColorScheme="light">
          <MantineThemeProvider theme={theme}>
            <NextAuthProvider>
              <Notifications />
              <AppWrapper>
                <Suspense fallback={<Loading />}>
                  {type?.value == "admin" || type?.value == "system" ? (
                    <AdminBar />
                  ) : (
                    <Navbar />
                  )}
                  {children}

                  <ScrollTop />
                </Suspense>
              </AppWrapper>
            </NextAuthProvider>
          </MantineThemeProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
