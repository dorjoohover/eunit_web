"use client";
import { STYLES } from "@/styles";
import { Assets } from "@/utils/assets";
import mergeNames from "@/utils/functions";
import { motion } from "framer-motion";
import Image from "next/image";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
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
}
