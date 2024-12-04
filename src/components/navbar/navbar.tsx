"use client";
import { useAppContext } from "@/_context";
import { Colors, Sizes } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { Assets, IconAssets } from "@/utils/assets";
import { exo2 } from "@/utils/fonts";
import { money } from "@/utils/functions";
import { NavbarValue } from "@/utils/values";
import { Avatar, Box, Button, Container, Flex, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiWallet } from "react-icons/bi";

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
        <Image
          src={Assets.logoMiniBlue}
          width={40}
          height={40}
          alt="Logo Mini"
        />
      </Flex>

      <Box
        style={{
          borderBottomColor: Colors.deepMose20,
        }}
        className={`flex justify-between  border-b w-full`}
      >
        <ul className="flex justify-center items-center gap-10 px-5 mx-20">
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
                }}
              >
                {d.name}
              </Link>
            );
          })}
        </ul>
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
              {user != null && <Text>{money(`${user.wallet}`)}</Text>}
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
