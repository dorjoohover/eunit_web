import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { logoMiniWhite } from "@/utils/assets";

import Head from "next/head";
import Navbar from "@/components/navbar";
import { AppWrapper, useAppContext } from "./_context";
import { Providers } from "./_providers/chakra.provider";
import { fonts } from "./_fonts/rubik";
import NextAuthProvider from "./_context/auth";

import ScrollTop from "@/components/global/scrollTop";
import { getUser } from "./(api)/user.api";

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
  
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <Head>
        <link
          rel=" shortcut icon"
          href={logoMiniWhite}
          type="image/png"
          sizes="32x32"
        />
      </Head>
      <body>
        <NextAuthProvider>
          <Providers>
     
              <AppWrapper>
                <Navbar />
                {children}
                <ScrollTop />
              </AppWrapper>
        
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
