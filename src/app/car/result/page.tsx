"use client";

import { getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import { IconText, ReportTitle, Spacer } from "@/components/report/shared";
import { TbNumber } from "react-icons/tb";
import { LuPaintRoller } from "react-icons/lu";
import { GiCarWheel, GiGearStickPattern } from "react-icons/gi";
import {
  formatNumber,
  formatPhoneNumber,
  money,
  parseDate,
  reportDescription,
} from "@/utils/functions";
import { api } from "@/utils/routes";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Highlight,
  px,
  Text,
  Title,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoMdDownload } from "react-icons/io";
import { MdApartment } from "react-icons/md";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { FaBeer, FaCar, FaCogs, FaPaintBrush, FaRoute } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";
import { GeneralWidget, ResultWidget } from "@/components/report/result";
import { UserModel } from "@/models/user.model";
import { BiCalendar } from "react-icons/bi";
import { IoCarSportOutline, IoColorFillOutline } from "react-icons/io5";
import { upperFirst } from "lodash";
import { BsBookmark, BsFuelPump } from "react-icons/bs";
import { PiArmchairBold, PiEngine, PiSteeringWheel } from "react-icons/pi";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { IconManualGearbox } from "@tabler/icons-react";
import { RiCarLine } from "react-icons/ri";

type ResultDataType = {
  brand?: string;
  mark?: string;
  capacity?: string;
  color?: string;
  manufacture?: number;
  gearbox?: string;
  engine?: string;
  entry?: number;
  type?: string;
  hurd?: string;
  drive?: string;
  interior?: string;
  mileage?: number;
  conditions?: string;
  createdAt?: Date;
  price?: number;
};
type ResultType = {
  data: ResultDataType;
  user: UserModel;
};

const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(min-width: 50em)");
  const id = params.get("id");
  const { user, refetchUser } = useAppContext();
  const [date, setDate] = useState<Date | null>(null);
  const [data, setData] = useState<ResultType>();
  const router = useRouter();
  const getResult = async () => {
    setLoading(true);
    if (id == null) return;

    refetchUser();
    const res = await getRequestResult(+id);
    console.log(res);
    if (!res.success) {
      notifications.show({
        message: res.message,
      });
      router.back();
      return;
    }
    if (!res?.token) {
      router.push("/login");
      return;
    }
    if (res.success) {
      setData(res.data);
      const date = new Date(`${res.data?.data.createdAt}`);
      date.setDate(date.getDate() + 7);
      setDate(date);
    }
    setLoading(false);
  };

  const carFields = [
    { name: "Бренд", key: "brand", icon: <IoCarSportOutline size={24} /> },
    { name: "Марк", key: "mark", icon: <BsBookmark size={24} /> },
    { name: "Багтаамж", key: "capacity", icon: <PiEngine size={24} /> },
    { name: "Өнгө", key: "color", icon: <IoColorFillOutline size={24} /> },
    {
      name: "Үйлдвэрлэсэн",
      key: "manufacture",
      icon: <CiCalendarDate size={24} />,
    },
    { name: "Импортлосон", key: "entry", icon: <CiCalendar size={24} /> },
    { name: "Гүйлт", key: "mileage", icon: <AiOutlineDashboard size={24} /> },
    {
      name: "Хөдөлгүүрийн төрөл",
      key: "engine",
      icon: <BsFuelPump size={24} />,
    },
    { name: "Хүрд", key: "hurd", icon: <PiSteeringWheel size={24} /> },
    {
      name: "Хурдны хайрцаг",
      key: "gearbox",
      icon: <GiGearStickPattern size={24} />,
    },
    {
      name: "Салоны өнгө",
      key: "interior",
      icon: <LuPaintRoller size={24} />,
    },
    { name: "Төрөл", key: "type", icon: <RiCarLine size={24} /> },
    { name: "Хөтлөгч", key: "drive", icon: <GiCarWheel size={24} /> },
    { name: "Нөхцөл", key: "conditions", icon: <TbNumber size={24} /> },
  ];

  useEffect(() => {
    getResult();
  }, []);
  if (loading)
    return (
      <Center>
        <Loading />
      </Center>
    );

  return (
    <Box>
      <ReportTitle>
        <Box>
          <Flex pt={{ sm: 40, base: 32 }} w={"100%"} align={"center"}>
            <Box
              style={{
                background:
                  "linear-gradient(90deg, rgba(40,80,250,1) 0%, rgba(24,47,148,1) 100%)",
              }}
              h={{
                sm: 50,
                base: 36,
              }}
              w={"100%"}
              maw={600}
            />
            <Text
              c={"#182F94"}
              tt={"uppercase"}
              fw={"bold"}
              fz={{
                sm: 56,
                xs: 40,
                base: 30,
              }}
            >
              Лавлагаа
            </Text>
          </Flex>
          <Spacer
            size={{
              sm: 40,
              base: 32,
            }}
          />
          <Flex
            // style={{
            //   borderBottom: `1px solid ${Colors.deepMose20}`,
            // }}
            // mb={20}
            // mx={'auto'}
            justify={"center"}
            tt={"uppercase"}
            // pb={10}
          >
            <Text
              fz={{
                sm: 40,
                xs: 30,
                base: 20,
              }}
              fw={700}
              ta={"center"}
            >
              Зах зээлийн үнэ цэний лавлагаа
            </Text>
          </Flex>
          <Spacer
            size={{
              sm: 40,
              base: 32,
            }}
          />
          <GeneralWidget title="Ерөнхий мэдээлэл">
            <div
              className={`flex ${
                matches ? "flex-row" : "flex-col"
              } justify-between`}
            >
              {(data?.user?.firstname || data?.user?.lastname) && (
                <Flex>
                  <Text fz={{ sm: 20, base: 16 }} fw={300}>
                    Овог нэр:
                  </Text>
                  <Text fw={600} fz={{ sm: 20, base: 16 }}>
                    {data?.user?.lastname ?? ""} {data?.user?.firstname ?? ""}
                  </Text>
                </Flex>
              )}
              {data?.user?.email && (
                <Flex>
                  <Text fw={300} fz={{ sm: 20, base: 16 }}>
                    Цахим хаяг:
                  </Text>
                  <Text fw={600} fz={{ sm: 20, base: 16 }}>
                    {data?.user.email}
                  </Text>
                </Flex>
              )}
              {data?.user?.phone && (
                <Flex>
                  <Text fz={{ sm: 20, base: 16 }} fw={300}>
                    Утасны дугаар:
                  </Text>
                  <Text fw={600} fz={{ sm: 20, base: 16 }}>
                    {formatPhoneNumber(data?.user?.phone) ?? ""}
                  </Text>
                </Flex>
              )}
            </div>
            <Spacer size={10} />
            <IconText
              child={<IoCarSportOutline size={24} />}
              text={"Автомашин"}
            />

            <Spacer size={20} />
          </GeneralWidget>
          <GeneralWidget title="Тооцоолол">
            <Highlight
              // mt={24}
              // mb={32}
              fz={{
                sm: 20,
                base: 16,
              }}
              highlight={[`${money((data?.data?.price ?? 0).toString(), "₮")}`]}
              highlightStyles={{
                background: Colors.main,
                color: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              children={`
                    Таны сонгосон хотхоны м.кв үнэ цэн: ${money(
                      (data?.data?.price ?? 0).toString(),
                      "₮"
                    )}`}
            ></Highlight>

            <Spacer size={20} />
          </GeneralWidget>
          <GeneralWidget title="Тайлбар">
            <Highlight
              fz={{
                sm: 20,
                base: 16,
              }}
              ta={"justify"}
              highlight={[
                `${money(`${data?.data?.price ?? ""}`, "", 100000)} төгрөг`,
              ]}
              highlightStyles={{
                background: Colors.main,
                color: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              children={`${reportDescription(
                `${data?.user?.lastname ?? ""} ${
                  data?.user?.firstname ??
                  (data?.user?.lastname == null
                    ? data?.user?.phone
                      ? formatPhoneNumber(data?.user?.phone)
                      : data?.user?.email ?? ""
                    : "")
                }`,
                1,
                data?.data?.price ?? 0,
                undefined,
                {
                  brand: data?.data?.brand,
                  manufacture: data?.data?.manufacture,
                  mark: data?.data?.mark,
                  engine: data?.data?.engine,
                  entry: data?.data?.entry,
                  capacity: data?.data?.capacity,
                }
              )}`}
            ></Highlight>
          </GeneralWidget>
          <GeneralWidget title="Техникийн үзүүлэлт">
            <Grid>
              {carFields.map((carField, index) => (
                <Grid.Col span={{ lg: 3, md: 3, sm: 4, base: 6 }} key={index}>
                  <Flex
                    gap="md"
                    justify="left"
                    align="center"
                    direction="row"
                    w={"100%"}
                    wrap="wrap"
                    style={{
                      border: "1px solid #DDDDDD",
                      borderRadius: 12,
                    }}
                    py={12}
                    px={{
                      md: "10%",
                      base: 10,
                    }}
                  >
                    {carField.icon}
                    <Box>
                      <Text
                        fz={{
                          sm: 12,
                          base: 12,
                        }}
                        fw={"bold"}
                        c={"#262626"}
                        lh={1}
                      >
                        {carField.name}
                      </Text>
                      <Text
                        fz={{
                          lg: 20,

                          base: 16,
                        }}
                        lh={1.1}
                        fw={300}
                      >
                        {upperFirst(
                          `${
                            carField.key == "mileage"
                              ? `${money(
                                  `${
                                    data?.data[
                                      carField.key as keyof ResultDataType
                                    ]
                                  }`
                                )}км`
                              : data?.data[carField.key as keyof ResultDataType]
                          }`
                        )}
                      </Text>
                    </Box>
                  </Flex>
                </Grid.Col>
              ))}
            </Grid>
          </GeneralWidget>

          <Spacer size={100} />
          <Text
            ta={"end"}
            fw={700}
            fz={{
              sm: 20,
              base: 16,
            }}
          >
            Хүчинтэй хугацаа дуусах огноо:{" "}
            {date != null ? parseDate(date, ".") : ""}
          </Text>
          <Box
            style={{
              borderBottom: `1px solid #0000004d`,
            }}
            h={20}
            w={"100%"}
          ></Box>
          <Spacer size={20} />
          <Text fz={{ sm: 20, base: 16 }} ta={"justify"}>
            Энэхүү лавлагаа нь 7 хоногийн хугацаанд хүчинтэй бөгөөд ямар нэгэн
            байдлаар олшруулахыг хориглоно.
          </Text>
          <Text fz={{ sm: 20, base: 16 }} fw={700}>
            ©2025 www.eunit.mn. Бүх эрх хуулиар хамгаалагдсан.
          </Text>
          <Spacer size={24} />

          <Spacer size={24} />
          <Flex w={"100%"} justify={"center"}>
            <Link href={`${api}request/service/pdf/${id}`} target="_blank">
              <Button
                radius={32}
                px={20}
                bg={"main"}
                fz={20}
                py={12}
                h={"auto"}
                leftSection={
                  <Box
                    bg={"white"}
                    p={4}
                    style={{
                      borderRadius: "100%",
                    }}
                  >
                    <IoMdDownload color={Colors.main} size={14} />
                  </Box>
                }
              >
                Татаж авах (PDF)
              </Button>
            </Link>
          </Flex>
          <Spacer
            size={{
              md: 32,
              base: 16,
            }}
          />
        </Box>

        <Spacer
          size={{
            md: 80,
            sm: 60,
            base: 40,
          }}
        />
        <Link href={"/report"}>
          <Button
            bg={"main"}
            py={8}
            h={"auto"}
            radius={0}
            leftSection={<IoIosArrowRoundBack color="white" size={24} />}
          >
            Дахин лавлагаа авах
          </Button>
        </Link>
        <Spacer size={40} />
      </ReportTitle>
      <Box
        style={{
          borderTopColor: Colors.deepMose20,
          borderTopWidth: 1,
          borderTopStyle: "solid",
        }}
        w={"100%"}
        bg={"white"}
      ></Box>

      <Box
        style={{
          borderTopColor: Colors.deepMose20,
          borderTopWidth: 1,
          borderTopStyle: "solid",
        }}
        w={"100%"}
        bg={"white"}
      ></Box>
    </Box>
  );
};

export default Page;
