import { Box, BoxComponentProps, Flex, Text } from "@mantine/core";
import { ReportTitle } from "./shared";
import { districts } from "@/utils/values";
import { Colors } from "@/base/constants";
import { money, parseDate } from "@/utils/functions";
import { ReactNode } from "react";
import { MdApartment, MdOutlineShowChart } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { UserModel } from "@/models/user.model";
import { useMediaQuery } from "@mantine/hooks";

export const ReportResult = ({
  data,
  payload,
}: {
  payload: {
    district: string;
    location: string;
    town: string;
    id?: number;
    area?: number;
  };
  data: { min?: number; max?: number; avg?: number };
}) => {
  return (
    <Box>
      <ReportTitle text={payload.town}>
        <Box>
          <Text fz={30} pb={40}>
            Зах зээлийн үнэлгээ
          </Text>
          <Flex
            style={{
              borderBottom: `1px solid ${Colors.deepMose20}`,
            }}
            justify={"start"}
            w={"100%"}
          >
            <Flex>
              <MdApartment />
              <Text>Орон сууц</Text>
            </Flex>
            <Flex>
              <CiLocationOn />
              <Text>
                Улаанбаатар хот,{" "}
                {districts.filter((d) => d.id == payload.district)[0].name},{" "}
                {payload.town}
              </Text>
            </Flex>
          </Flex>
          <Flex align={"center"} gap={16}>
            <Text fz={30}>Эд хөрөнгийн үнэ цэнэ нь хооронд:</Text>
            <Text fz={48}>
              {money(`${data.min}`, "MNT ")}-{money(`${data.max}`, "MNT ")}
            </Text>
          </Flex>
          <Flex gap={16} align={"center"}>
            <Text fz={30}>Таны орон сууцны тохиромжит үнэлгээ:</Text>
            <Text fz={48} bg={"main"} c={"white"}>
              {money(`${data.avg}`, "MNT ")}
            </Text>
          </Flex>
          <Text>Үнэлгээ хийсэн он сар: {parseDate(new Date(), ".")}</Text>
          <ResultWidget title={"Орон сууцны мэдээлэл"}>
            <ApartmentInfo
              text={`Улаанбаатар хот, ${
                districts.filter((d) => d.id == payload.district)[0].name
              }, 
        ${payload.town}`}
              title="Хаяг"
            />
            <ApartmentInfo
              text={`Орон сууц`}
              title="Үл хөдлөх хөрөнгийн төрөл"
            />
            <ApartmentInfo text={`2024`} title="Ашиглалтанд орсон он" />
            <ApartmentInfo text={`80м.кв`} title="Талбайн хэмжээ" />
          </ResultWidget>
          {/* <ResultWidget title={"Макро мэдээлэл"}>
            <ApartmentInfo
              text={`Улаанбаатар хот, ${
                districts.filter((d) => d.id == payload.district)[0].name
              }, 
        ${payload.town}`}
              title="Хаяг"
            />
            <ApartmentInfo
              text={`Орон сууц`}
              title="Үл хөдлөх хөрөнгийн төрөл"
            />
            <ApartmentInfo text={`2024`} title="Ашиглалтанд орсон он" />
            <ApartmentInfo text={`80м.кв`} title="Талбайн хэмжээ" />
          </ResultWidget> */}
          <ResultWidget title={"Байршил"}>
            <ApartmentInfo
              text={`Улаанбаатар хот, ${
                districts.filter((d) => d.id == payload.district)[0].name
              }, 
        ${payload.town}`}
              title="Хаяг"
            />
            <ApartmentInfo
              text={`Орон сууц`}
              title="Үл хөдлөх хөрөнгийн төрөл"
            />
            <ApartmentInfo text={`2024`} title="Ашиглалтанд орсон он" />
            <ApartmentInfo text={`80м.кв`} title="Талбайн хэмжээ" />
          </ResultWidget>
        </Box>
      </ReportTitle>
    </Box>
  );
};

export const ApartmentInfo = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  return (
    <Flex
      style={{
        borderBottom: `1px solid ${Colors.mainGrey} `,
      }}
      my={24}
    >
      <Text c={"grey"} fz={20} lh={2} flex={2}>
        {title}
      </Text>
      <Text fz={20} lh={2} flex={3}>
        {text}
      </Text>
    </Flex>
  );
};

export const ResultWidget = ({
  title,
  children,
  props,
}: {
  title: string;
  props?: BoxComponentProps;
  children: ReactNode;
}) => {
  return (
    <Box>
      <Flex align={"center"} gap={32} pos={"relative"}>
        <Text
          fw={"bold"}
          fz={{
            md: 56,
            sm: 36,
            base: 24,
          }}
          lh={1}
          c={"headBlue"}
          className="text-nowrap"
        >
          {title}
        </Text>
        <Box h={1} w={"100%"} top={"10px"} pos={"relative"} bg={"deepMose20"} />
      </Flex>
      <Box mx={"auto"} {...props}>
        {children}
      </Box>
    </Box>
  );
};

export const UserWidget = ({ user }: { user?: UserModel }) => {
  return (
    <Flex columnGap={"50px"}>
      <Box>
        <Text
          fz={{
            sm: 20,
            base: 16,
          }}
        >
          Овог нэр
        </Text>
        <Text
          fz={{
            sm: 20,
            base: 16,
          }}
        >
          Цахим хаяг
        </Text>
        {user?.phone && (
          <Text
            fz={{
              sm: 20,
              base: 16,
            }}
          >
            Утасны дугаар
          </Text>
        )}
      </Box>
      <Box>
        <Text
          c={"grey"}
          fz={{
            sm: 20,
            base: 16,
          }}
        >
          {user?.name ?? "a"}
        </Text>
        <Text
          c={"grey"}
          fz={{
            sm: 20,
            base: 16,
          }}
        >
          {user?.email ?? "a"}
        </Text>

        {user?.phone && (
          <Text
            c={"grey"}
            fz={{
              sm: 20,
              base: 16,
            }}
          >
            {user?.phone ?? ""}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export const AnalyzeWidget = ({
  text,
  label,
  value,
  border,
}: {
  text: string;
  label: string;
  value: number;
  border?: boolean;
}) => {
  const matches = useMediaQuery("(min-width: 50em)");
  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      w={"100%"}
      flex={1}
      py={20}
      style={{
        borderBottom: border || !matches ? `1px solid ${Colors.mainGrey}` : "",
      }}
    >
      <Box>
        <Text
          fz={{
            sm: 20,
            base: 16,
          }}
          c={"grey"}
        >
          {label}
        </Text>
        <Text className="text-nowrap" fz={24}>
          {text}
        </Text>
      </Box>
      <Box>
        <Flex align={"center"}>
          <MdOutlineShowChart
            size={24}
            style={{
              transform: `scaleX(${value < 0 ? "-1" : "1"}) `,
            }}
            color={value < 0 ? "#F21824" : "#70A346"}
          />
          <Text fw={"bold"} fz={24}>
            {Math.abs(value)}%
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
