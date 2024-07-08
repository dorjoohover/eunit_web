"use client";

import React from "react";
import { signIn } from "next-auth/react";
import mergeNames from "@/utils/functions";
import { STYLES } from "@/styles";
import { Button, Image } from "@chakra-ui/react";

import { ContainerXP } from "@/components/container";
import { GoogleIcon } from "@/components/global/icons";
import { Assets } from "@/utils/assets";
export default function LoginPage() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/login/verify" });
  };

  return (
    <ContainerXP
      className={mergeNames(
        "w-[auto] md:w-[800px] lg:w-[1000px] ",
        "relative grid grid-cols-1 md:grid-cols-2",
        "md:mx-auto md:my-10 m-0 rounded-xl overflow-hidden min-h-[550px]"
      )}
    >
      <div className="relative hidden bg-blue-900 md:block">
        <Image
          src={Assets.login}
          alt="login page side image"
          className="object-cover h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60" />
      </div>

      <div
        className={mergeNames(
          "relative bg-white shadow-lg rounded-2xl w-full p-5 md:p-10",
          "transition-all duration-500"
        )}
      >
        <Image
          src={Assets.logoBlue}
          alt="bom logo"
          className="w-[150px] mx-auto mb-10"
        />
        <>
          <div className={mergeNames(STYLES.loginWidth)}>
            <GoogleSignButton onClick={() => handleGoogleSignIn()} />
          </div>
        </>
      </div>
    </ContainerXP>
  );
}

const GoogleSignButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col gap-3 my-auto">
      <Button
        onClick={onClick}
        // onClick={() => handleGoogleSignIn()}
        className="gap-3 p-0 px-2 border-gray-200 rounded-lg"
      >
        <GoogleIcon size="1.2em" />
        Google хаягаар нэвтрэх
      </Button>
    </div>
  );
};
