"use client";
import { loginUser } from "@/app/(api)/auth.api";
import { getUser } from "@/app/(api)/user.api";
import { useAppContext } from "@/app/_context";
import { UserStatus } from "@/config/enum";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import mergeNames from "@/utils/functions";
import { STYLES } from "@/styles";
import Image from "next/image";
import { Assets } from "@/utils/assets";
import { useEffect, useState } from "react";
import { UserModel } from "@/models/user.model";
const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const login = async () => {
    const res = await loginUser(
      session!.user!.email!,
      session!.user!.image!,
      session!.user!.name!
    );

    if (res)
      await getUser()
        .then((d) => {
          if (d != null) {
            localStorage.setItem("user", JSON.stringify(d));
          }
        })
        .catch(() => {});
  };
  useEffect(() => {
    if (status == "unauthenticated") router.push("/");
    if (status === "authenticated") {
      login().then(() => router.push("/"));
    }
  }, [status]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 w-screen h-screen bg-bgdark/90 lds-ellipsis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <div className="w-full h-full bg-red-500"></div> */}
      <div
        className={mergeNames(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          STYLES.flexCenter,
          "flex-col items-center"
        )}
      >
        <Image
          src={Assets.logoWhite}
          width={90}
          height={90}
          objectFit="cover"
          alt=""
        />
        <span className="loader"></span>
      </div>
    </motion.div>
  );
};
export default Page;
