import { UserIcon } from "./icons";
import { STYLES } from "@/styles/index";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { BsGrid } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineCalculator } from "react-icons/ai";
import { MdShare } from "react-icons/md";
import mergeNames from "@/utils/functions";
import { UserModel } from "@/models/user.model";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Feedback from "../global/feedback";
import { signOut } from "next-auth/react";
import { logOut } from "@/app/(api)/auth.api";
import { useAppContext } from "@/app/_context";
import { getUser } from "@/app/(api)/user.api";

const drawerItem = [
  {
    icon: <CgProfile />,
    text: "Хувийн мэдээлэл",
    href: "profile",
  },
  {
    icon: <BsGrid />,
    text: "Миний зарууд",
    href: "myads",
  },
  {
    icon: <MdShare />,
    text: "Хуваалцсан зарууд",
    href: "sharedads",
  },
  {
    icon: <FiHeart />,
    text: "Миний хүслүүд",
    href: "bookmark",
  },
  {
    icon: <IoWalletOutline />,
    text: "Хэтэвч",
    href: "wallet",
  },
  {
    icon: <AiOutlineCalculator />,
    text: "Үнэлгээ",
    href: "estimated",
  },
];

const BodyDrawer = ({
  user,
  onClose,
}: {
  user: UserModel;
  onClose: () => void;
}) => {
  return (
    <DrawerBody className="flex flex-col justify-between p-0 bg-bgdark/95">
      <div
        className={mergeNames(
          STYLES.flexBetween,
          "flex-col w-full my-auto items-center "
        )}
      >
        <div
          className={mergeNames(
            STYLES.flexCenter,
            "flex-col items-center text-white"
          )}
        >
          <Image
            // src={user?.image}
            src={
              user?.profileImg ??
              "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
            }
            alt="user image"
            referrerPolicy="no-referrer"
            className="w-[100px] aspect-square rounded-full bg-gray-400 object-cover mt-10"
          />
          <h2 className="text-[22px] mt-2 font-bold">{user?.username ?? ""}</h2>
          <h2 className="text-[14px] font-semibold">{user?.email ?? ""}</h2>
        </div>
      </div>
      <div className="flex flex-col p-4 text-center bg-white rounded-t-2xl">
        <div className="grid grid-cols-2 gap-4 py-3">
          {drawerItem.map((d, i) => {
            return (
              <DownLink
                key={i}
                onClick={onClose}
                icon={d.icon}
                href={`/account/${d.href}`}
                text={d.text}
              />
            );
          })}
        </div>
        <div className="w-full h-[1px] mt-4 mb-4 bg-gray-200 inline-block" />
        <div className="flex flex-col space-y-2 ">
          <Feedback />
          <Link
            href={"/"}
            onClick={() => {
              signOut();
              logOut();
            }}
            className="py-2 font-semibold text-white rounded-md bg-mainBlossom hover:bg-red-500 "
          >
            Гарах
          </Link>
        </div>
      </div>
    </DrawerBody>
  );
};

const DownLink = ({
  onClick = () => {},
  text,
  icon,
  href,
}: {
  href?: string;
  text?: string;
  icon?: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href ?? "/"}
      className={mergeNames(
        "px-5 py-4 transition-all ease-in-out border-2 rounded-lg h-[100px] group hover:bg-gray-100 text-mainBlossom text-bold",
        STYLES.flexCenter,
        "flex-col items-center"
      )}
      onClick={() => {
        if (onClick != null) {
          onClick();
        }
      }}
    >
      {text && text?.length > 0 ? (
        <>
          <p className="text-[30px] mb-2">{icon}</p>
          <Text className="font-semibold">{text}</Text>
        </>
      ) : (
        ""
      )}
    </Link>
  );
};

const UserDrawer = () => {
  const [active, setActive] = useState(false);
  const { user } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="relative">
      <UserIcon text="Профайл" onClick={onOpen} word={active} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent className="bg-transparent">
          <DrawerCloseButton className="text-white" />

          <BodyDrawer user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserDrawer;
