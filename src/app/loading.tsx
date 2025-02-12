import { STYLES } from "@/styles";
import { Assets } from "@/utils/assets";
import { mergeNames } from "@/utils/functions";
import { Flex, Center, Loader } from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
export const Loading = () => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      pos={"fixed"}
      style={{
        zIndex: 1000,
      }}
      bg={"main"}
      inset={0}
    >
      <Loader color="white" type="bars" />
    </Flex>
    // <motion.div
    //   className="fixed top-0 left-0 z-50 w-screen h-screen bg-[#001529e6] lds-ellipsis"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   exit={{ opacity: 0 }}
    // >
    //   {/* <div className="w-full h-full bg-red-500"></div> */}
    //   <div
    //     className={mergeNames(
    //       "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    //       STYLES.flexCenter,
    //       "flex-col items-center"
    //     )}
    //   >
    //     <Image
    //       src={Assets.logoWhite}
    //       width={90}
    //       height={90}
    //       objectFit="cover"
    //       alt=""
    //     />
    //     <span className="loader"></span>
    //   </div>
    // </motion.div>
  );
};

const Load = () => {
  return <Loading />;
};

export default Load;
