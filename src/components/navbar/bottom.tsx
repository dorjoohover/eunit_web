"use client";
import { STYLES } from "@/styles/index";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineClear } from "react-icons/md";
import CreateAdNav from "./createAdNav";
import NavCategory from "./navCategory";
import mergeNames from "@/utils/functions";
import { NavContainer } from "../container";

import { Assets } from "@/utils/assets";
import { CategoryModel } from "@/models/category.model";
import { useEffect, useState } from "react";
import { EstimatorIcon, UserIcon, WhiteHeartIcon } from "./icons";
import UserDrawer from "./userDrawer";
import { UserModel } from "@/models/user.model";
import { getSearchAds } from "@/app/(api)/ad.api";
import { motion } from "framer-motion";
import { useAppContext } from "@/app/_context";
import { Image } from "@chakra-ui/react";
import { getUser } from "@/app/(api)/user.api";
import { UserStatus } from "@/config/enum";
import { usePathname, useRouter } from "next/navigation";
const Bottom = ({
  categories,
}: {
  categories: CategoryModel[] | undefined;
}) => {
  const { user, setAds } = useAppContext();

  // const [isHoveringId, setIsHoveringId] = useState(true);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  // const handleMouseOver = (id) => {
  //   setIsHoveringId(id);
  // };

  // const handleMouseOut = () => {
  //   setIsHoveringId(false);
  // };
  // Visible end

  // Search start
  const [search, setSearch] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const searchAds = async () => {
    await getSearchAds(search).then((d) => {
      setAds(d);
      console.log(d);
      if (pathname.startsWith("account")) {
        router.push("/ad");
      }
    });
  };

  // Search end

  return (
    <div className={mergeNames("md:block hidden", "bg-mainBlossom ")}>
      <NavContainer>
        <div className="flex flex-row  items-center  justify-between gap-10 ">
          <div className="flex flex-row items-center ">
            <Link href="/" className="relative h-6 w-6">
              <Image
                src={Assets.logoMiniWhite}
                alt="Logo"
                objectFit="contain"
              />
            </Link>

            <NavCategory categories={categories} />
          </div>

          {/* baruun taliin bookmark search etc */}
          <div className="flex flex-row items-center text-white">
            <button
              className="h-full px-2"
              onClick={() => setActiveSearch(true)}
            >
              <HiOutlineSearch />
            </button>
            <Link href={"/account/mark"}>
              <WhiteHeartIcon />
            </Link>

            {user != undefined ? (
              <UserDrawer />
            ) : (
              <Link href={"/login"}>
                <UserIcon text="Нэвтрэх" />
              </Link>
            )}
            <CreateAdNav />
            <Link href={"/estimator"}>
              <EstimatorIcon />
            </Link>
          </div>
        </div>

        {/* Search input */}
        {activeSearch && (
          <motion.div
            onMouseOut={() => setActiveSearch(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                stiffness: 0,
                ease: "easeInOut",
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, y: -10 }}
            onMouseOver={() => setActiveSearch(true)}
            className={mergeNames(
              "bg-blue-900/[0.96] w-full absolute left-0",
              "py-2",
              STYLES.flexCenter,
              "items-center text-2xl text-blue-300"
            )}
          >
            <div className="relative flex flex-row items-center w-2/5 h-10">
              <button className="disabled">
                <HiOutlineSearch onClick={searchAds} />
              </button>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Зараа хайна уу"
                onKeyDown={(event: any) => {
                  if (event.key === "Enter") {
                    searchAds();
                  }
                }}
                value={search}
                className={mergeNames(
                  "h-full w-full p-2 text-base ml-2 border-none rounded-md placeholder-blue-300/40 bg-mainBlossom bg-opacity-40  focus:ring-0 "
                )}
              />
              <button
                onClick={() => setSearch("")}
                className={mergeNames(
                  "text-xs rounded-full p-[2px] bg-mainBlossom/80",
                  "absolute right-2"
                )}
              >
                <MdOutlineClear />
              </button>
            </div>
          </motion.div>
        )}
      </NavContainer>
    </div>
  );
};

export default Bottom;
