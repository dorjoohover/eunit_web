import { UserModel } from "@/models/user.model";
import { Assets, cardBg } from "@/utils/assets";
import { exo2 } from "@/utils/fonts";
import { TransactionValues } from "@/utils/values";
import { Box, Button, Flex, Paper, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { ReactNode } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";

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
          text={`${user?.wallet} E-unit оноо`}
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
      <Text fz={24} ta={"center"} mt={40} c={"white"}>
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
      </Flex>
    </Box>
  );
};
