import { Colors } from "@/base/constants";
import { UserModel } from "@/models/user.model";
import { Assets, cardBg } from "@/utils/assets";
import { exo2 } from "@/utils/fonts";
import { money } from "@/utils/functions";
import { districts, TransactionValues } from "@/utils/values";
import {
  Box,
  Button,
  Center,
  Flex,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosArrowRoundForward, IoMdArrowForward } from "react-icons/io";

export const WalletCard = ({
  onClick,
  user,
}: {
  user?: UserModel;
  onClick: () => void;
}) => {
  return (
    <Box
      style={{
        borderRadius: 30,
        background: "linear-gradient(#9C2CF3 0%, #3A49F9 100%)",
        overflow: "hidden",
      }}
      px={32}
      py={28}
      pos={"relative"}
    >
      <Box
        pos={"absolute"}
        inset={0}
        style={{ zIndex: 0, backgroundImage: `url(${cardBg})` }}
      />
      <Flex
        direction={"column"}
        style={{ zIndex: 1 }}
        justify={"space-between"}
      >
        <WalletText
          label="Хэтэвчний үлдэгдэл"
          text={`${money(`${user?.wallet}`)} E-unit`}
          children={
            <Image
              src={Assets.logoMiniWhite}
              width={50}
              height={50}
              alt="Logo"
            />
          }
        />
        <Box h={50} />
        <WalletText
          label="Нэр"
          text={user?.name ?? ""}
          children={
            <Button
              bg={"white"}
              c={"headBlue"}
              rightSection={<BsFillPlusCircleFill size={18} fill="headBlue" />}
              radius={20}
              onClick={onClick}
            >
              Цэнэглэх
            </Button>
          }
        />
      </Flex>
    </Box>
  );
};

const WalletText = ({
  label,
  text,
  children,
}: {
  label: string;
  text: string;
  children: ReactNode;
}) => {
  return (
    <Flex justify={"space-between"} gap={50} align={"center"}>
      <Box>
        <Text opacity={0.5} c={"white"} mb={8}>
          {label}
        </Text>
        <Text fz={"1.5em"} c={"white"}>
          {text}
        </Text>
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
};

export const ChargeCard = ({
  user,
  onClick,
}: {
  user?: string;
  onClick: () => void;
}) => {
  return (
    <Box
      w={"100%"}
      style={{
        borderRadius: 20,
        background: "linear-gradient(#9C2CF3 0%, #3A49F9 100%)",
        overflow: "hidden",
      }}
      pos={"relative"}
    >
      <Box
        pos={"absolute"}
        inset={0}
        style={{
          zIndex: 0,
          backgroundImage: `url(${cardBg})`,
          backgroundSize: "cover",
        }}
      />
      <Center h={"400px"}>
        <Text c={"white"} fz={40}>
          Тун удахгүй
        </Text>
      </Center>
      {/* <Text fz={24} ta={"center"} mt={40} c={"white"}>
        Цэнэглэх-ХААН банк
      </Text>
      <Flex pb={50} px={50}>
        <Box flex={4} mr={25}>
          {TransactionValues(user ?? "").map((value, i) => {
            return (
              <Box key={i} mb={16}>
                <Text mb={16} c={"white"} fz={20}>
                  {value.name}
                </Text>
                <Text
                  style={{
                    border: `1px solid white`,
                    borderRadius: 10,
                  }}
                  px={14}
                  fz={16}
                  py={14}
                  bg={"deepMose20"}
                  c={"#9f9f9f"}
                >
                  {value.value}
                </Text>
              </Box>
            );
          })}
        </Box>
        <Box flex={3} ml={25}>
          <Text
            mb={20}
            fz={20}
            td={"underline"}
            c={"white"}
            className={exo2.className}
          >
            Анхааруулга
          </Text>
          <Text
            mb={20}
            fz={18}
            c={"white"}
            ta={"justify"}
            lh={1.1}
            className={exo2.className}
          >
            Банк хоорондын гүйлгээнээс хамаарч гүйлгээний утга өөрчлөгдөх
            тохиолдол байдаг тул банк доторх гүйлгээ хийх нь тохиромжтой.Өдөр
            бүрийн 23:30 - 01:30 цагийн хооронд төгрөгийн орлого хийхээс
            зайлсхийнэ үү. Тус цагт банкны өдрийн өндөрлөгөө хийгддэг тул
            орлогын мэдээлэл манай системд ирэлгүй, орлого нь орохгүй байх
            магадлалтай.{" "}
          </Text>
          <Button
            w={"100%"}
            onClick={onClick}
            c={"main"}
            bg={"white"}
            radius={5}
            py={16}
            h={"auto"}
            fz={16}
          >
            Шалгах
          </Button>
        </Box>
      </Flex> */}
    </Box>
  );
};

export const ServiceCard = ({
  text,
  onClick,
  bg,
}: {
  bg: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <Box
      mah={400}
      h={400}
      maw={550}
      w={"100%"}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <Box
        pos={"absolute"}
        bottom={16}
        left={12}
        bg={"white"}
        px={20}
        py={32}
        right={12}
      >
        <Text fz={42} tt={"uppercase"} lh={1.01} c={"main"} fw={"bold"}>
          {text}
        </Text>
        <Button
          rightSection={
            <IoIosArrowRoundForward color={Colors.main} size={32} />
          }
          onClick={onClick}
          bg={"transparent"}
          c={"black"}
          px={0}
        >
          Дэлгэрэнгүй үзэх
        </Button>
      </Box>
    </Box>
  );
};

export const DistrictCard = ({
  bg,
  text,
  count,
  price,
}: {
  bg: string;
  text: string;
  count: number;
  price: number;
}) => {
  const router = useRouter();
  const handle = () => {
    const value = districts.findIndex((d) => {
      return d.id.toLowerCase() == text.toLowerCase();
    });
    router.push(`/report?${`district=${value}`}`);
  };
  return (
    <Flex
      w={"100%"}
      bg={"#ECEFF2"}
      style={{
        borderRadius: 20,
      }}
      py={22}
      justify={"center"}
      className="cursor-pointer"
      onClick={() => handle()}
    >
      <Box>
        <Flex
          w={150}
          gap={10}
          bg={"headBlue"}
          justify={"center"}
          align={"center"}
          py={5.5}
          style={{
            borderRadius: 50,
          }}
          mb={30}
        >
          <Box
            w={10}
            h={10}
            style={{
              borderRadius: "100%",
            }}
            bg={bg}
          />
          <Text c={"white"}>{text}</Text>
        </Flex>
        <Text fz={24} c={"main"} ta={"center"}>
          {money(`${price}`, "₮")}
        </Text>
        <Text ta={"center"}>{count} мэдээлэл</Text>
      </Box>
    </Flex>
  );
};
