"use client";

import { notifications } from "@mantine/notifications";

import { auth } from "@/lib/firebase";
import { ConfirmationResult, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Assets } from "@/utils/assets";
import { HiOutlineRefresh, HiOutlineX } from "react-icons/hi";
import {
  Box,
  Button,
  Flex,
  Image,
  Loader,
  Modal,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import { GoogleIcon } from "@/components/icons";
import { Colors } from "@/base/constants";
import { MdPhoneIphone } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import PhoneAuth from "@/components/login/phoneAuth";
import GoogleAuth from "@/components/login/googleAuth";

export default function Page() {
  const [step, setStep] = useState(1);

  const matches = useMediaQuery("(min-width: 50em)");

  return (
    <div>
      <Flex
        pt={80}
        h={matches ? "calc(100vh - 60px)" : "100%"}
        px={20}
        w={!matches ? "100%" : "calc(100vw - 60px)"}
        left={!matches ? 0 : 60}
        bg={"lightIvory"}
        justify={"center"}
        direction={{
          sm: "row",
          base: "column-reverse",
        }}
        pb={{
          sm: 60,
          base: 20,
        }}
        columnGap={matches ? "5%" : "5%"}
        // rowGap={!matches ? "5%" : "0%"}
      >
        <Flex
          flex={1}
          justify={!matches ? "center" : "right"}
          mt={{
            sm: 0,
            base: 16,
          }}
          w={"100%"}
          align={"center"}
        >
          <Box
            pos={"relative"}
            maw={"calc(100vh / 1070 * 512)"}
            w={"100%"}
            h={"calc(100vh / 1070 * 685)"}
            style={{
              borderRadius: 30,
              overflow: "hidden",
            }}
          >
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
            h={matches ? "calc(100vh / 1070 * 685)" : "calc(80vh / 1070 * 685)"}
          >
            <Text ta={"center"} fz={30} mb={25}>
              Нэвтрэх
            </Text>
            <Text ta={"center"} mb={25}>
              Манай технологи нь нууц үг шаарддаггүй бөгөөд та нэвтрэх болон
              бүртгүүлэхдээ өөрийн GMAIL хаягийг ашиглахад хангалттай
            </Text>
            <GoogleAuth />
            <Flex gap={8} align={"center"} my={30}>
              <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
              <Text fw={500} fz={18}>
                эсвэл
              </Text>
              <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
            </Flex>
            <Flex align={"end"}>
              <PhoneAuth />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>

    // <div>
    //   <Flex
    //     pt={80}
    //     h={matches ? "calc(100vh - 60px)" : "100%"}
    //     px={20}
    //     w={!matches ? "100%" : "calc(100vw - 60px)"}
    //     left={!matches ? 0 : 60}
    //     bg={"lightIvory"}
    //     justify={"center"}
    //     direction={{
    //       sm: "row",
    //       base: "column-reverse",
    //     }}
    //     pb={{
    //       sm: 60,
    //       base: 20,
    //     }}
    //     columnGap={matches ? "5%" : "5%"}
    //     // rowGap={!matches ? "5%" : "0%"}
    //   >
    //     <Flex
    //       flex={1}
    //       justify={!matches ? "center" : "right"}
    //       mt={{
    //         sm: 0,
    //         base: 16,
    //       }}
    //       align={"center"}
    //     >
    //       <Box
    //         pos={"relative"}
    //         maw={"calc(100vh / 1070 * 512 )"}
    //         w={"100%"}
    //         h={"calc(100vh / 1070 * 685)"}
    //         style={{
    //           borderRadius: 30,
    //           overflow: "hidden",
    //         }}
    //       >
    //         {" "}
    //         <Image
    //           src={Assets.login}
    //           alt="login page side image"
    //           className="object-contain h-full"
    //         />
    //         {/* <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60" /> */}
    //       </Box>
    //     </Flex>

    //     <Flex flex={1} justify={!matches ? "center" : "left"} align={"center"}>
    //       <Flex
    //         direction={"column"}
    //         gap={0}
    //         maw={450}
    //         justify={"center"}
    //         h={matches ? "calc(100vh / 1070 * 685)" : "calc(80vh / 1070 * 685)"}
    //       >
    //         <Text ta={"center"} fz={30} mb={25}>
    //           Нэвтрэх
    //         </Text>
    //         <Text ta={"center"} mb={25}>
    //           Манай технологи нь нууц үг шаарддаггүй бөгөөд та нэвтрэх болон
    //           бүртгүүлэхдээ өөрийн GMAIL хаягийг ашиглахад хангалттай
    //         </Text>
    //         <Button
    //           c={"black"}
    //           unstyled
    //           bg={"white"}
    //           w={"100%"}
    //           h={"auto"}
    //           style={{
    //             border: `2px solid ${Colors.stroke}`,
    //             borderRadius: 10,
    //           }}
    //           fz={"1.1em"}
    //           onClick={() => signInWithGoogle()}
    //         >
    //           <Flex w={"100%"} justify={"center"} align={"center"} py={8}>
    //             <GoogleIcon size="1.4em" />
    //             <Text c={"black"} fz={"1.1em"}>
    //               Google хаягаар нэвтрэх
    //             </Text>
    //           </Flex>
    //         </Button>
    //         <Flex gap={8} align={"center"} my={30}>
    //           <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
    //           <Text fw={500} fz={18}>
    //             эсвэл
    //           </Text>
    //           <Box h={2} w={"100%"} bg={"#E0E0E0"}></Box>
    //         </Flex>
    //         <Flex align={"end"}>
    //           {step == 1 && (
    //             <NumberInput
    //               flex={{
    //                 base: 8,
    //                 lg: 4,
    //               }}
    //               variant="icon"
    //               pe={"8px 20px 8px 65px"}
    //               // className="relative"
    //               leftSection={
    //                 <Box className="flex">
    //                   <Flex
    //                     justify={"center"}
    //                     align={"center"}
    //                     gap={0}
    //                     rowGap={0}
    //                     columnGap={0}
    //                     px={10}
    //                   >
    //                     <MdPhoneIphone size={26} fill="#aaa" />
    //                     <Flex
    //                       gap={0}
    //                       rowGap={0}
    //                       align={"center"}
    //                       columnGap={0}
    //                       mr={0}
    //                       pr={0}
    //                     >
    //                       <Text
    //                         className=" flex align-center"
    //                         c="#566476"
    //                         style={{
    //                           fontSize: 18,
    //                         }}
    //                       >
    //                         +976
    //                       </Text>
    //                       <Box w={1} bg={"#566476"} py={8} ml={4}></Box>
    //                     </Flex>
    //                   </Flex>
    //                 </Box>
    //               }
    //               height={54}
    //               onChange={(e) => setPhone(e as string)}
    //               styles={{
    //                 label: {
    //                   color: "#566476",
    //                   fontSize: 16,
    //                 },
    //               }}
    //               label="Утасны дугаар"
    //               leftSectionWidth={80}
    //             />
    //           )}
    //           <Button
    //             flex={{
    //               base: 3,
    //               lg: 2,
    //             }}
    //             onClick={() => {
    //               sendCode();
    //             }}
    //             w={"100%"}
    //             bg={"main"}
    //             radius={10}
    //             fz={{
    //               base: 16,
    //               sm: 20,
    //               lg: 24,
    //             }}
    //             disabled={loading}
    //             py={8}
    //             h={54}
    //             mt={25}
    //           >
    //             {loading ? <Loader type="bars" color="white" /> : "Нэвтрэх"}
    //           </Button>
    //         </Flex>
    //       </Flex>
    //     </Flex>
    //   </Flex>{" "}
    //   {step == 2 && (
    //     <Modal.Root
    //       opened={step == 2}
    //       centered
    //       size={"md"}
    //       onClose={() => setStep(1)}
    //     >
    //       <Modal.Overlay />

    //       <Modal.Content px={32} py={20} radius={20} bg={"lightIvory"}>
    //         <Modal.Header px={0} bg={"lightIvory"}>
    //           <Modal.Title c={"headBlue"} fz={30} fw={"bold"}>
    //             Нэг удаагийн нууц үг
    //           </Modal.Title>
    //           <Button
    //             unstyled
    //             p={8}
    //             onClick={() => setStep(1)}
    //             className={`border bg-transparent hover:bg-main hover:text-white transition-all rounded-full border-[${Colors.stroke}]`}
    //           >
    //             <HiOutlineX size={26} />
    //           </Button>
    //         </Modal.Header>
    //         <div>
    //           <Stack align="start">
    //             <Text fz={18} fw={200} lh={1.2} mb={40}>
    //               Таны дугаарт нэг удаагийн нууц үг явуулсан бөгөөд хугацаа
    //               дууссаны дараа дахин илгээх товч дээр дарна уу.
    //             </Text>
    //             <NumberInput
    //               variant="icon"
    //               maxLength={6}
    //               w={"100%"}
    //               mb={25}
    //               maw={"100%"}
    //               pe={"8px 150px 8px 20px"}
    //               // className="relative"
    //               rightSection={
    //                 <Box className="flex">
    //                   {resendTimer == 0 ? (
    //                     <Button
    //                       px={0}
    //                       bg={"transparent"}
    //                       c={"main"}
    //                       rightSection={
    //                         <HiOutlineRefresh
    //                           color={Colors.main}
    //                           fontSize={24}
    //                         />
    //                       }
    //                       onClick={() => sendCode(true)}
    //                     >
    //                       Дахин илгээх
    //                     </Button>
    //                   ) : (
    //                     <Text c={"main"}>{resendTimer} секунд</Text>
    //                   )}
    //                 </Box>
    //               }
    //               onChange={(e) => setPin(`${e}`)}
    //               ta={"start"}
    //               styles={{
    //                 input: {
    //                   color: "#546274",
    //                 },
    //               }}
    //               style={{}}
    //               c={"#546274"}
    //               error={pin.length == 6 ? false : "*6 оронтой тоо байх ёстой."}
    //               placeholder="Нууц үг оруулна уу."
    //               rightSectionWidth={150}
    //             />
    //           </Stack>
    //           <Button
    //             onClick={() => verifyOtp()}
    //             bg={pin.length == 6 ? "main" : "#546274"}
    //             py={18}
    //             h={"auto"}
    //             fz={24}
    //             w={"100%"}
    //             disabled={pin.length != 6}
    //           >
    //             {loading ? (
    //               <Loader type="bars" color="white" />
    //             ) : (
    //               "Баталгаажуулах"
    //             )}
    //           </Button>
    //         </div>
    //       </Modal.Content>
    //     </Modal.Root>
    //   )}
    //   <div id="recaptcha-container"></div>
    // </div>
  );
}
