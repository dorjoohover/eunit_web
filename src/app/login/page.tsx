"use client";

import { notifications } from "@mantine/notifications";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";
import React, { FormEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { Assets } from "@/utils/assets";
import { HiOutlineRefresh, HiOutlineX } from "react-icons/hi";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Image,
  Loader,
  Modal,
  PinInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { GoogleIcon } from "@/components/icons";
import { Colors } from "@/base/constants";
import { MdOutlinePersonSearch, MdPhoneIphone } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Page() {
  const [phone, setPhone] = useState("");

  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [resendTimer, setResendTimer] = useState(60);
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const router = useRouter();
  const verifyOtp = async () => {
    setLoading(true);
    try {
      const result = await confirmation.confirm(pin);
      const idToken = await result.user.getIdToken(true);
      // const idToken =
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkMjUwZDIyYTkzODVmYzQ4NDJhYTU2YWJhZjUzZmU5NDcxNmVjNTQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXVuaXQtb3RwIiwiYXVkIjoiZXVuaXQtb3RwIiwiYXV0aF90aW1lIjoxNzM5MTUzODgzLCJ1c2VyX2lkIjoiNzBBbGVCUmpsS2JQcnpnTWkyZVFRUEk3bjU1MyIsInN1YiI6IjcwQWxlQlJqbEtiUHJ6Z01pMmVRUVBJN241NTMiLCJpYXQiOjE3MzkxNTM4ODMsImV4cCI6MTczOTE1NzQ4MywicGhvbmVfbnVtYmVyIjoiKzk3Njg4OTkyODY0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTc2ODg5OTI4NjQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwaG9uZSJ9fQ.XHoZOeQBoR7qFLYmJTobw1B8Qa70WQ2YP_24QrZ5Lsm3tlRoMyX0JdAM-ZEdzFJClXhnTd8U1xGVvDJFt4bkUpCYTaOaQ9wtXlZ1oKCSusCjmeZlIu0L70S3_EOQarh3sgbho6wN64FXhOwNFotT6kRB6PBfugHHNM0oXUBaOrVhHJWavGzN1dNwlJstJQt2olUsbYm9u9BoHwZrBbxbs5qad_bTkYhpRkjBeHkEeQYuBUC2IK366BO9MuPH1JWbr1MX_Tio3QPWbKM6gVG4xHbmyzqDr0ewTnUnfxVgAnSQ9651v8rYNbhtMg5Vga2gR4D-8Uqh-8VQ2L95sUlgPA";
      const res = await fetch("/api/login/phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      }).then((d) => d.json());
      if (res.success) {
        notifications.show({ message: "Амжилттай нэвтэрлээ!" });
        router.push("/");
      } else {
        notifications.show({ message: res.message });
      }
    } catch (error: any) {
      console.log(error);
      notifications.show({ message: "Invalid OTP. Try again." });
    }
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };
  const [pin, setPin] = useState("");
  const matches = useMediaQuery("(min-width: 50em)");

  const sendCode = async () => {
    try {
      setLoading(true);
      setResendTimer(60);
      // Ensure reCAPTCHA is properly initialized
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      console.log(phone);
      const formattedPhone = `+976${phone}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptcha
      );
      setConfirmation(confirmationResult);
      console.log("OTP sent successfully:", confirmationResult);
      notifications.show({
        message: "Илгээлээ.",
      });
      setLoading(false);
      setStep(2);
      return confirmationResult;
    } catch (error: any) {
      notifications.show({
        message: `${error?.message ?? error}`,
      });
      setLoading(false);
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div>
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
        columnGap={matches ? "5%" : "0%"}
        // rowGap={!matches ? "5%" : "0%"}
      >
        <Flex
          flex={1}
          justify={!matches ? "center" : "right"}
          mt={{
            sm: 0,
            base: 16,
          }}
          align={"center"}
        >
          <Box
            pos={"relative"}
            maw={"calc(100vh / 1070 * 512 )"}
            w={"100%"}
            h={"calc(100vh / 1070 * 685)"}
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

        <Flex flex={1} justify={!matches ? "center" : "left"} align={"center"}>
          <Flex
            direction={"column"}
            gap={0}
            maw={450}
            justify={"center"}
            h={"calc(100vh / 1070 * 685)"}
          >
            <Text ta={"center"} fz={30} mb={25}>
              Нэвтрэх
            </Text>
            <Text ta={"center"} mb={25}>
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
            <Flex gap={8} align={"center"} my={30}>
              <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
              <Text fw={500} fz={18}>
                эсвэл
              </Text>
              <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
            </Flex>
            <Flex>
              {step == 1 && (
                <TextInput
                  flex={3}
                  variant="icon"
                  pe={"8px 20px 8px 80px"}
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
                  leftSectionWidth={80}
                />
              )}
              <Button
                flex={2}
                onClick={() => sendCode()}
                w={"100%"}
                bg={"main"}
                radius={10}
                fz={24}
                py={8}
                h={54}
                mt={25}
              >
                {loading ? <Loader type="bars" color="white" /> : "Нэвтрэх"}
              </Button>
            </Flex>

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
        
          </form> */}
          </Flex>
        </Flex>
      </Flex>{" "}
      {step == 2 && (
        <Modal.Root
          opened={step == 2}
          centered
          size={"md"}
          onClose={() => setStep(1)}
        >
          <Modal.Overlay />

          <Modal.Content px={32} py={20} radius={20} bg={"lightIvory"}>
            <Modal.Header px={0} bg={"lightIvory"}>
              <Modal.Title c={"headBlue"} fz={30} fw={"bold"}>
                Нэг удаагийн нууц үг
              </Modal.Title>
              <Button
                unstyled
                p={8}
                onClick={() => setStep(1)}
                className={`border bg-transparent hover:bg-main hover:text-white transition-all rounded-full border-[${Colors.stroke}]`}
              >
                <HiOutlineX size={26} />
              </Button>
            </Modal.Header>
            <div>
              <Stack align="start">
                <Text fz={18} fw={200} lh={1.2} mb={40}>
                  Таны дугаарт нэг удаагийн нууц үг явуулсан бөгөөд хугацаа
                  дууссаны дараа дахин илгээх товч дээр дарна уу.
                </Text>
                <TextInput
                  variant="icon"
                  maxLength={6}
                  w={"100%"}
                  mb={25}
                  pe={"8px 150px 8px 20px"}
                  // className="relative"
                  rightSection={
                    <Box className="flex">
                      {resendTimer == 0 ? (
                        <Button
                          px={0}
                          bg={"transparent"}
                          c={"main"}
                          rightSection={
                            <HiOutlineRefresh
                              color={Colors.main}
                              fontSize={24}
                            />
                          }
                          onClick={() => sendCode()}
                        >
                          Дахин илгээх
                        </Button>
                      ) : (
                        <Text c={"main"}>{resendTimer} секунд</Text>
                      )}
                    </Box>
                  }
                  onChange={(e) => setPin(e.target.value)}
                  ta={"start"}
                  styles={{
                    input: {},
                  }}
                  style={{}}
                  c={"#546274"}
                  error={pin.length == 6 ? false : "*6 оронтой тоо байх ёстой."}
                  placeholder="Нууц үг оруулна уу."
                  rightSectionWidth={150}
                />
              </Stack>
              <Button
                onClick={() => verifyOtp()}
                bg={pin.length == 6 ? "main" : "#546274"}
                py={18}
                h={"auto"}
                fz={24}
                w={"100%"}
                disabled={pin.length != 6}
              >
                {loading ? (
                  <Loader type="bars" color="white" />
                ) : (
                  "Баталгаажуулах"
                )}
              </Button>
            </div>
          </Modal.Content>
        </Modal.Root>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
