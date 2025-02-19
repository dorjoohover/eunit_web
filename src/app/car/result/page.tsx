"use client";

import { getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import { IconText, ReportTitle, Spacer } from "@/components/report/shared";
import { formatNumber, money, parseDate } from "@/utils/functions";
import { api } from "@/utils/routes";
import { Box, Button, Center, Flex, Grid, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoMdDownload } from "react-icons/io";
import { MdApartment } from "react-icons/md";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { FaBeer, FaCar, FaPaintBrush } from "react-icons/fa";

type ResultType = {
  brand?: string;
  mark?: string;
  motor?: string;
  motorType?: string;
  engineType?: string;
  steerType?: string;
  wheelDrive?: string;
  color?: string;
  meter?: string;
  manufactured?: string;
  imported?: string;
  avg: string;
  area: string;
};

const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const id = params.get("id");
  const { user, refetchUser } = useAppContext();
  const [data, setData] = useState<ResultType>();
  const router = useRouter();
  const getResult = async () => {
    setLoading(true);
    if (id == null) return;

    refetchUser();
    const res = await getRequestResult(+id);
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
    }
    setLoading(false);
  };

  const carFields = [
    { name: "Бренд" },
    { name: "Марк" },
    { name: "Хөдөлгүүрийн багтаамж" },
    { name: "Хөдөлгүүрийн төрөл" },
    { name: "Хурдны хайрцаг" },
    { name: "Хүрд" },
    { name: "Хөтлөгч" },
    { name: "Өнгө" },
    { name: "Гүйлт" },
    { name: "Үйлдвэрлэсэн он" },
    { name: "Импортлосон он" },
  ];

  useEffect(() => {
    getResult();
  }, []);
  //   if (loading)
  //     return (
  //       <Center>
  //         <Loading />
  //       </Center>
  //     );

  return (
    <Box>
      <ReportTitle text={data?.mark ?? "TOYOTA, PRIUS 20"}>
        <Box>
          <Flex mb={40} pb={10}>
            <Text
              fz={{
                sm: 30,
                base: 16,
              }}
              fw={{
                sm: "500",
                base: "700",
              }}
            >
              Зах зээлийн үнэлгээ
            </Text>
            {id && (
              <Text
                fz={{
                  sm: 30,
                  base: 16,
                }}
              >
                #{formatNumber(id)}
              </Text>
            )}
          </Flex>
          <Flex
            style={{
              borderBottom: `1px solid ${Colors.deepMose20}`,
            }}
            direction={{
              md: "row",
              base: "column",
            }}
            pb={12}
            justify={"start"}
            w={"100%"}
            columnGap={40}
          >
            <IconText child={<FaCar size={24} />} text={"Автомашин"} />
          </Flex>

          <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          />
          <Text
            c={"headBlue"}
            fz={{
              sm: 20,
              base: 16,
            }}
          >
            Таны {data?.manufactured} онд үйлдвэрлэгдэж {data?.imported} онд
            Монгол улсад импортлогдсон, {data?.brand} брендын
            {data?.mark} маркын {data?.motor ?? ""}ийн хөдөлгүүрийн багтаамжтай
            {data?.motorType} машины өнөөгийн зах зээлийн үнэ
            {money(
              `${Math.round(
                (Number(data?.avg) || 0) *
                  (parseFloat(`${data?.area}` || "0") || 0)
              )}`
            )}{" "}
            төгрөг орчим үнэтэй байна.
          </Text>
          <Spacer size={20} />
        </Box>
        <Spacer
          size={{
            md: 32,
            base: 16,
          }}
        />

        <Spacer size={32} />

        <Grid p={24}>
          <Grid.Col span={9}>
            <Box
              bg={"white"}
              p={16}
              style={{
                borderRadius: "12px",
              }}
            >
              <Box style={{ textAlign: "center" }}>
                <Text
                  fz={{
                    sm: 30,
                    base: 16,
                  }}
                  fw={{
                    sm: "500",
                    base: "700",
                  }}
                  c={Colors.headBlue}
                >
                  Тээврийн хэрэгслийн үзүүлэлтүүд
                </Text>
                <Spacer size={56} />
              </Box>
              <Grid>
                {carFields.map((carField, index) => (
                  <Grid.Col span={3} key={index}>
                    <Flex
                      mih={50}
                      gap="md"
                      justify="center"
                      align="center"
                      direction="row"
                      wrap="wrap"
                      style={{
                        borderRight: "2px solid black",
                      }}
                    >
                      <FaPaintBrush color="gray" size={50} />
                      <Box w={"70%"}>
                        <Text
                          fz={{
                            sm: 16,
                            base: 14,
                          }}
                          fw={{
                            sm: "500",
                            base: "700",
                          }}
                          c={"gray"}
                        >
                          {carField.name}
                        </Text>
                        <Text
                          fz={{
                            sm: 30,
                            base: 16,
                          }}
                          fw={{
                            sm: "500",
                            base: "700",
                          }}
                        >
                          Бренд
                        </Text>
                      </Box>
                    </Flex>
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          </Grid.Col>
          <Grid.Col span={3}>
            <Box
              bg={"white"}
              p={12}
              style={{
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <Text
                fz={{
                  sm: 30,
                  base: 14,
                }}
                fw={{
                  sm: "500",
                  base: "700",
                }}
                c={"gray"}
                mt={20}
              >
                Үнэлгээ
              </Text>
              <Text
                fz={{
                  sm: 36,
                  base: 14,
                }}
                fw={{
                  sm: "500",
                  base: "700",
                }}
                c={Colors.main}
                m={30}
              >
                ₮{money(`15999999`)}{" "}
              </Text>
            </Box>

            <Flex w={"100%"} justify={"center"} align={"center"} mih={150}>
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
          </Grid.Col>
        </Grid>

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
    </Box>
  );
};

export default Page;
