"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { Assets } from "@/utils/assets";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Image,
  Text,
  TextInput,
} from "@mantine/core";
import { GoogleIcon } from "@/components/icons";
import { Colors } from "@/base/constants";
import { useForm } from "@mantine/form";
import { BiPhone } from "react-icons/bi";
import { MdOutlinePersonSearch } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
interface FormType {
  username?: string;
  password?: string;
  accept?: boolean;
}

const Page = () => {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };
  const form = useForm<FormType>({
    mode: "uncontrolled",
    initialValues: {
      accept: false,
    },
  });
  return (
    <Flex pt={60} h={"calc(100vh - 60px)"} bg={"lightIvory"}>
      <Flex flex={1} justify={"center"} align={"center"}>
        <Box
          pos={"relative"}
          maw={512}
          w={"auto"}
          h={"80%"}
          mx={"auto"}
          style={{
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          {" "}
          <Image
            src={Assets.login}
            alt="login page side image"
            className="object-contain h-full"
          />
          {/* <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60" /> */}
        </Box>
      </Flex>

      <Flex flex={1} align={"center"}>
        <Flex direction={"column"} gap={30} maw={500} h={"80%"}>
          <Text ta={"center"} fz={30}>
            Нэвтрэх
          </Text>
          <Text ta={"center"}>
            Манай технологи нь нууц үг шаарддаггүй бөгөөд та нэвтрэх болон
            бүртгүүлэхдээ өөрийн GMAIL хаягийг ашиглахад хангалттай
          </Text>
          <Button
            c={"black"}
            unstyled
            bg={"white"}
            w={"100%"}
            h={"auto"}
            style={{
              border: `2px solid ${Colors.stroke}`,
              borderRadius: 10,
            }}
            fz={"1.1em"}
            onClick={() => handleGoogleSignIn()}
          >
            <Flex w={"100%"} justify={"center"} align={"center"} py={16}>
              <GoogleIcon size="1.4em" />
              <Text c={"black"} fz={"1.1em"}>
                Google хаягаар нэвтрэх
              </Text>
            </Flex>
          </Button>
          <Flex gap={8} align={"center"}>
            <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
            <Text fw={500} fz={18}>
              эсвэл
            </Text>
            <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
          </Flex>
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values);
            })}
          >
            <TextInput
              variant="icon"
              leftSection={<BiPhone />}
              key={form.key("username")}
              {...form.getInputProps("username")}
              mb={30}
            />
            <TextInput
              mb={30}
              variant="icon"
              leftSection={<MdOutlinePersonSearch />}
              rightSection={<IoEye />}
              // rightSection={<IoEyeOff/>}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />

            <Flex mb={30}>
              <Checkbox
                checked={form.values.accept}
                onChange={(e) =>
                  form.setValues((prev) => ({
                    ...prev,
                    accept: e.currentTarget.checked,
                  }))
                }
              />
              <Text fz={18}>
                Би нууцлалын бодлого болон дотоод журмын дүрмийг зөвшөөрч байна.
              </Text>
            </Flex>
            <Button type="submit" w={"100%"}>
              Нэвтрэх
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Page;
