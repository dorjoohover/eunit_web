"use client";
import { useAppContext } from "@/_context";
import { Colors, Sizes } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { EunitIcon } from "@/theme/components/icon";
import { Assets, IconAssets } from "@/utils/assets";
import { exo2 } from "@/utils/fonts";
import { money } from "@/utils/functions";
import { NavbarValue } from "@/utils/values";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineUser } from "react-icons/ai";
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Flex,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { PiChartPieSliceLight } from "react-icons/pi";
import { IoMenuSharp, IoWalletOutline } from "react-icons/io5";
import { CiDatabase } from "react-icons/ci";

export const metadata = {
  title: "Next.js App",
  description: "Regular user pages",
};

const NavLinkStyle = (active: boolean) =>
  `h-full flex border-b-2  ${
    active ? ` opacity-100 text-[16.5px]` : "border-transparent opacity-70"
  } items-center transition-all text-${Colors.deepMose} uppercase font-bold `;
export const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAppContext();
  const matches = useMediaQuery("(min-width: 56.25em)");
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex
      bg={"lightIvory"}
      pos={"fixed"}
      top={0}
      justify={"space-between"}
      className={exo2.className}
      gap={0}
      style={{
        zIndex: 50,
        borderBottom: `${matches ? "0px" : "1px"} solid ${
          matches ? "transparent" : Colors.deepMose20
        }`,
      }}
      columnGap={0}
    >
      <Flex
        w={60}
        miw={60}
        h={60}
        align={"center"}
        justify={"center"}
        pl={Sizes.xs}
      >
        <Link href={"/"}>
          <Image
            src={Assets.logoMiniBlue}
            width={40}
            height={40}
            alt="Logo Mini"
          />
        </Link>
      </Flex>

      {matches ? (
        <Box
          style={{
            borderBottomColor: Colors.deepMose20,
          }}
          className={`flex justify-between  border-b w-full`}
        >
          <Flex mx={20} align={"center"} columnGap={10}>
            {NavbarValue.map((d, i) => {
              const include =
                pathname == "/" && d.href == "/"
                  ? true
                  : d.href != "/"
                  ? pathname.includes(d.href)
                  : false;
              return (
                <Link
                  key={i}
                  href={d.href}
                  className={NavLinkStyle(include)}
                  style={{
                    borderBottomColor: include ? Colors.main : "transparent",
                    margin: "0 10px",
                  }}
                >
                  {d.name}
                </Link>
              );
            })}
          </Flex>

          <Container variant="sideBorderLeft">
            <Link href={"/wallet"}>
              <Flex align={"center"}>
                <Flex w={95} py={7} justify={"center"} align={"center"}>
                  {user != null ? (
                    <BiWallet size={40} />
                  ) : (
                    <Image
                      src={IconAssets.profile}
                      alt="Profile"
                      width={45}
                      height={45}
                    />
                  )}
                </Flex>
                {user != null && (
                  <Flex gap={5} ml={10} align={"center"}>
                    <Text>{money(`${user.wallet}`)}</Text>
                    <EunitIcon />
                  </Flex>
                )}
              </Flex>
            </Link>
            <Link
              href={user != null ? "/profile" : "/login"}
              passHref
              className="h-full"
            >
              <Button
                px={Sizes["4xl"]}
                fw={"bold"}
                bg={"main"}
                h={"100%"}
                radius={0}
                fz={18}
                tt={"uppercase"}
              >
                {user != null
                  ? locale.data.NAVBAR.PROFILE
                  : locale.data.NAVBAR.LOGIN}
              </Button>
            </Link>
          </Container>
        </Box>
      ) : (
        <Flex align={"center"} justify={"end"}>
          <Button bg={"transparent"} onClick={open}>
            <IoMenuSharp fill="main" size={32} />
          </Button>
        </Flex>
      )}
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Box
          style={{
            borderBottomColor: Colors.deepMose20,
          }}
          className={`flex justify-between flex-col border-b w-full`}
        >
          <Link href={user != null ? "/wallet" : "/"}>
            <Flex align={"center"}>
              <Flex w={95} py={7} justify={"center"} align={"center"}>
                {user != null ? (
                  <BiWallet size={40} />
                ) : (
                  <Image
                    src={IconAssets.profile}
                    alt="Profile"
                    width={45}
                    height={45}
                  />
                )}
              </Flex>
              {user != null && (
                <Flex gap={5} ml={10} align={"center"}>
                  <Text>{money(`${user.wallet}`)}</Text>
                  <EunitIcon />
                </Flex>
              )}
            </Flex>
          </Link>
          <Link
            href={user != null ? "/profile" : "/login"}
            passHref
            className="h-full"
          >
            <Button
              px={Sizes["4xl"]}
              fw={"bold"}
              bg={"main"}
              h={"100%"}
              radius={0}
              fz={18}
              tt={"uppercase"}
            >
              {user != null
                ? locale.data.NAVBAR.PROFILE
                : locale.data.NAVBAR.LOGIN}
            </Button>
          </Link>
        </Box>
      </Drawer>
    </Flex>
  );
};
const BottomIcon = ({ d, color }: { color: string; d: string }) => {
  return d == "/" ? (
    <GrHomeRounded color={color} size={18} />
  ) : d == "/report" ? (
    <PiChartPieSliceLight color={color} size={20} />
  ) : d == "/data" ? (
    <CiDatabase color={color} size={22} />
  ) : d == "/wallet" ? (
    <IoWalletOutline color={color} size={18} />
  ) : (
    <AiOutlineUser color={color} size={20} />
  );
};

export const BottomNavigationBar = () => {
  const pathname = usePathname();

  return (
    <Flex
      align={"start"}
      pos={"fixed"}
      py={10}
      style={{
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        overflow: "hidden",
        filter: "drop-shadow(0px 3px 4px #000000)",
      }}
      bottom={0}
      left={0}
      right={0}
      columnGap={10}
      bg={"white"}
      w={"100%"}
    >
      {NavbarValue.map((d, i) => {
        const include =
          pathname == "/" && d.href == "/"
            ? true
            : d.href != "/"
            ? pathname.includes(d.href)
            : false;

        return (
          <Tooltip label={d.name} key={i}>
            <Link
              href={d.href}
              // className={NavLinkStyle(include)}
              style={{
                borderBottomColor: include ? Colors.main : "transparent",
                margin: "0 10px",
                height: "40px",
              }}
              className="h-full flex-1"
            >
              <Flex
                h={"100%"}
                direction={"column"}
                justify={"center"}
                align={"center"}
                gap={0}
              >
                <BottomIcon
                  d={d.href}
                  color={include ? Colors.main : "#7B94A7"}
                />
                {include && (
                  <Text fz={12} c={"main"}>
                    {" "}
                    {d.name}
                  </Text>
                )}
              </Flex>
            </Link>
          </Tooltip>
        );
      })}
    </Flex>
  );
};

export const SideBar = () => {
  return (
    <Box
      pos={"fixed"}
      left={0}
      bg={"lightIvory"}
      w={60}
      top={60}
      style={{
        borderRightColor: Colors.deepMose20,
        zIndex: 50,
        borderRightWidth: 1,
        height: "calc(100vh - 60px)",
      }}
    >
      <Flex
        direction={"column"}
        justify={"space-between"}
        h={"100%"}
        pos={"relative"}
        py={Sizes["2xl"]}
        gap={"20vh"}
      >
        <Text
          style={{
            transform: "rotate(-90deg) translateX(-100px) ",
            textWrap: "nowrap",
          }}
          tt={"uppercase"}
          fw={"bold"}
        >
          {locale.data.NAVBAR.REALSTATE_INFORMATION}
        </Text>
        <Flex
          direction={"column"}
          gap={Sizes.md}
          justify={"center"}
          align={"center"}
        >
          {[IconAssets.in, IconAssets.fb, IconAssets.ig].map((icon, i) => {
            return (
              <Link href={"/"} key={i}>
                <Flex
                  align={"center"}
                  justify={"center"}
                  h={14}
                  w={14}
                  pos={"relative"}
                >
                  <Image
                    src={icon}
                    alt="linkedIn"
                    objectFit="contain"
                    layout="fill"
                  />
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};
export const AdminNavbar = () => (
  <nav style={styles.navbar}>
    <Link href="/admin/dashboard">Dashboard</Link>
    <Link href="/admin/users">Manage Users</Link>
    <Link href="/admin/settings">Settings</Link>
    <Link href="/logout">Logout</Link>
  </nav>
);

const styles = {
  navbar: {
    background: "#333",
    padding: "10px",
  },
  link: {
    color: "#fff",
    marginRight: "15px",
    textDecoration: "none",
  },
};
