import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  Loader,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { MdPhoneIphone } from "react-icons/md";
import { HiOutlineRefresh, HiOutlineX } from "react-icons/hi";
import { Colors } from "@/base/constants";
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}
const PhoneAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
      }
    );
  }, []);

  const sendOTP = async () => {
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        `+976${phone}`,
        appVerifier
      );
      setConfirmationResult(confirmation);
      startCountdown();
      notifications.show({
        message: "Илгээлээ.",
        position: "top-center",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
  const verifyOTP = async () => {
    try {
      setLoading(true);
      const confirm = await confirmationResult?.confirm(otp);
      const token = await confirm?.user?.getIdToken();
      if (token) {
        const res = await fetch("/api/login/phone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token }),
        }).then((d) => d.json());
        if (res.success) {
          notifications.show({
            position: "top-center",
            message: "Амжилттай нэвтэрлээ!",
          });
          router.refresh();
        } else {
          notifications.show({ position: "top-center", message: res.message });
        }
      } else {
        notifications.show({
          position: "top-center",
          message: "Амжилтгүй дахин оролдоно уу",
        });
      }
    } catch (error) {
      console.error("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setLoading(true);
      await sendOTP();
      setCountdown(60);
      startCountdown();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);
  };
  const close = () => {
    setLoading(false);
    setCountdown(60);
    startCountdown();
    setConfirmationResult(null);
  };
  return (
    <Flex align={"end"}>
      {!confirmationResult ? (
        <>
          <TextInput
          accept="[0-9]"
            flex={{
              base: 8,
              md: 3,
            }}
            variant="icon"
            pe={"8px 20px 8px 65px"}
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
            height={54}
            onChange={(e) => setPhone(e as string)}
            styles={{
              label: {
                color: "#566476",
                fontSize: 16,
              },
            }}
            label="Утасны дугаар"
            leftSectionWidth={80}
          />
          <Button
            flex={{
              base: 3,
              md: 2,
            }}
            onClick={sendOTP}
            w={"100%"}
            bg={"main"}
            radius={10}
            fz={{
              base: 16,
              sm: 20,
              lg: 24,
            }}
            disabled={loading}
            py={8}
            h={54}
            mt={25}
          >
            {loading ? <Loader type="bars" color="white" /> : "Нэвтрэх"}
          </Button>
        </>
      ) : (
        <>
          <Modal.Root
            opened={confirmationResult != null}
            centered
            size={"md"}
            onClose={() => setConfirmationResult(null)}
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
                  onClick={close}
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
                  <NumberInput
                    variant="icon"
                    maxLength={6}
                    w={"100%"}
                    mb={25}
                    maw={"100%"}
                    pe={"8px 150px 8px 20px"}
                    // className="relative"
                    rightSection={
                      <Box className="flex">
                        {countdown > 0 || loading ? (
                          <Text c={"main"}>{countdown} секунд</Text>
                        ) : (
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
                            onClick={() => resendOTP()}
                          >
                            Дахин илгээх
                          </Button>
                        )}
                      </Box>
                    }
                    onChange={(e) => setOtp(`${e}`)}
                    ta={"start"}
                    styles={{
                      input: {
                        color: "#546274",
                      },
                    }}
                    style={{}}
                    c={"#546274"}
                    error={
                      otp.length == 6 ? false : "*6 оронтой тоо байх ёстой."
                    }
                    placeholder="Нууц үг оруулна уу."
                    rightSectionWidth={150}
                  />
                </Stack>
                <Button
                  onClick={() => verifyOTP()}
                  bg={otp.length == 6 ? "main" : "#546274"}
                  py={18}
                  h={"auto"}
                  fz={24}
                  w={"100%"}
                  disabled={otp.length != 6}
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
        </>
      )}
      <div id="recaptcha-container" />
    </Flex>
  );
};

export default PhoneAuth;
