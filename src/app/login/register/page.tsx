"use client";

import { notifications } from "@mantine/notifications";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import React, { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Assets } from "@/utils/assets";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Image,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { GoogleIcon } from "@/components/icons";
import { Colors } from "@/base/constants";
import { useForm } from "@mantine/form";
import { BiPhone } from "react-icons/bi";
import { MdOutlinePersonSearch, MdPhoneIphone } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useMediaQuery } from "@mantine/hooks";
import { FaKey } from "react-icons/fa";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  const verifyOtp = async () => {
    if (!payload.email || !payload.firstname || !payload.lastname) {
      notifications.show({
        message: "Мэдээлэл дутуу байна.",
      });
      return;
    }
    setLoading(true);
    try {
      const result = await confirmation.confirm(otp);
      const idToken = await result.user.getIdToken(true);
      // const idToken =
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMjUwZDIyYTkzODVmYzQ4NDJhYTU2YWJhZjUzZmU5NDcxNmVjNTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXVuaXQtb3RwIiwiYXVkIjoiZXVuaXQtb3RwIiwiYXV0aF90aW1lIjoxNzM5MTQ2NDYzLCJ1c2VyX2lkIjoiNzBBbGVCUmpsS2JQcnpnTWkyZVFRUEk3bjU1MyIsInN1YiI6IjcwQWxlQlJqbEtiUHJ6Z01pMmVRUVBJN241NTMiLCJpYXQiOjE3MzkxNDY0NjMsImV4cCI6MTczOTE1MDA2MywicGhvbmVfbnVtYmVyIjoiKzk3Njg4OTkyODY0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTc2ODg5OTI4NjQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.Xh_DFlr1-TvUBp8Ai55_3-qq_U1BQLevgLqstzkF9oypYXMPReluQFnnfGErYABcm3fT88HklcuieqwxmoYZWXxPTTBp_qx9KMALi4MlshXdzmt6-RNbmtHVCja29uMacjquTtyb5VsUyla5QGtG6nmns-dzGIL5u1quuYIfGX9Ehy6L0dyOnvB8oauDEJOFfqGOPPAvTSxh6A142xCNII_BW0pooJCAehXLGfsHCIrwftMzpQncIV3NR1o9yZ4EZMxuolXZbbYnih5-6NsvtRGVYupuejZmpCkSw2hzY1Jt43Belvo5vq9hUpN0SRnWLZ27FNYRQjNIcfXJ8xzLGg";
      const { lastname, firstname, email } = payload;
      const res = await fetch("/api/register/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken, lastname, firstname, email }),
      }).then((d) => d.json());
      if (res.success) {
        notifications.show({ message: "Амжилттай бүртгүүллээ!" });
      } else {
        notifications.show({ message: res.message });
      }
    } catch (error: any) {
      console.log(error);
      notifications.show({ message: "Invalid OTP. Try again." });
    }
    setLoading(false);
  };
  const [payload, setPayload] = useState({
    lastname: "",
    firstname: "",
    email: "",
  });

  const register = (e: FormEvent<HTMLFormElement>) => {
    console.log(e);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  const [pin, setPin] = useState("");
  const matches = useMediaQuery("(min-width: 50em)");
  const sendCode = async () => {
    try {
      // Ensure reCAPTCHA is properly initialized
      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible", // Or 'normal' for a visible CAPTCHA
            callback: (response: any) => {
              console.log("reCAPTCHA verified:", response);
            },
          }
        );
      }

      const appVerifier = (window as any).recaptchaVerifier;
      const formattedPhone = `+976${phone}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      setConfirmation(confirmationResult);
      console.log("OTP sent successfully:", confirmationResult);
      notifications.show({
        message: "Илгээлээ.",
      });
      setStep(2);
      return confirmationResult;
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <Flex
      pt={60}
      h={matches ? "calc(100vh - 60px)" : "100%"}
      px={20}
      bg={"lightIvory"}
      justify={"center"}
      direction={{
        sm: "row",
        base: "column-reverse",
      }}
      pb={{
        sm: 0,
        base: 32,
      }}
    >
      <Flex
        flex={1}
        justify={"center"}
        mt={{
          sm: 0,
          base: 16,
        }}
        align={"center"}
      >
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
      <div id="recaptcha-container"></div>
      <Flex flex={1} align={"center"}>
        <Flex direction={"column"} gap={30} maw={450} h={"80%"} mx={"auto"}>
          <Text ta={"center"} fz={30}>
            Бүртгүүлэх
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
            <Flex w={"100%"} justify={"center"} align={"center"} py={8}>
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
          {step == 1 && (
            <TextInput
              variant="icon"
              pe={"8px 100px 8px 80px"}
              // className="relative"
              leftSection={
                <Box className="flex">
                  <Flex
                    justify={"center"}
                    align={"center"}
                    gap={0}
                    rowGap={0}
                    columnGap={0}
                    px={10}
                  >
                    <MdPhoneIphone size={26} fill="#aaa" />
                    <Flex
                      gap={0}
                      rowGap={0}
                      align={"center"}
                      columnGap={0}
                      mr={0}
                      pr={0}
                    >
                      <Text
                        className=" flex align-center"
                        c="#566476"
                        style={{
                          fontSize: 18,
                        }}
                      >
                        +976
                      </Text>
                      <Box w={1} bg={"#566476"} py={8} ml={4}></Box>
                    </Flex>
                  </Flex>
                </Box>
              }
              onChange={(e) => setPhone(e.target.value)}
              styles={{
                label: {
                  color: "#566476",
                  fontSize: 18,
                },
              }}
              label="Утасны дугаар"
              rightSectionWidth={100}
              leftSectionWidth={80}
              rightSection={
                <Button
                  size="xs"
                  onClick={sendCode}
                  c={"#546274"}
                  bg={"#ECEFF2"}
                  radius={6}
                >
                  Код авах
                </Button>
              }
            />
          )}
          {step == 2 && (
            <div>
              {" "}
              <Stack align="start">
                <Text fz={18} fw={500} c="#566476">
                  Нэг удаагийн нууц үг
                </Text>
                <Flex
                  className="border-[#E7E5E4] border-2 rounded-[10px]"
                  align={"center"}
                  p={10}
                  bg={"white"}
                  h={"100%"}
                  mb={16}
                >
                  <FaKey fill="#aaa" />
                  <PinInput
                    length={6}
                    styles={{
                      root: {
                        width: "100%",
                        height: 64,
                      },
                      pinInput: {
                        height: "100%",
                        flex: 1,
                      },
                      input: {
                        backgroundColor: "#ECEFF2",
                        height: "100%",
                        borderRadius: 6,
                      },
                    }}
                    value={pin}
                    onChange={setPin}
                    type="number"
                    oneTimeCode
                  />
                </Flex>
              </Stack>
              <TextInput
                mb={16}
                variant="icon"
                placeholder="Овог"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, lastname: e.target.value }))
                }
              />
              <TextInput
                mb={16}
                variant="icon"
                placeholder="Нэр"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, firstname: e.target.value }))
                }
              />
              <TextInput
                mb={16}
                variant="icon"
                placeholder="И-майл"
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <Button
                onClick={() => verifyOtp()}
                bg={"main"}
                py={18}
                h={"auto"}
                w={"100%"}
                fz={24}
              >
                Бүртгүүлэх
              </Button>
            </div>
          )}

          {/* <form
            onSubmit={form.onSubmit((values) => {
              // console.log(values);
            })}
          >
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
          </form> */}
        </Flex>
      </Flex>
    </Flex>
  );
}
