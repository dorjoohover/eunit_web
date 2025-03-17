"use client";

import { getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import { IconText, ReportTitle, Spacer } from "@/components/report/shared";
import { formatNumber, money, parseDate } from "@/utils/functions";
import { api } from "@/utils/routes";
import { Box, Button, Center, Flex, Grid, px, Text, Title } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack, IoMdDownload } from "react-icons/io";
import { MdApartment } from "react-icons/md";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { FaBeer, FaCar, FaPaintBrush } from "react-icons/fa";
import { useMediaQuery } from "@mantine/hooks";

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
  const matches = useMediaQuery("(min-width: 50em)");
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
      <ReportTitle text={data?.mark ?? "TOYOTA PRIUS 20"}>
        <Box>
          <Flex mb={40} pb={10}>
            <Text
              fz={{
                sm: 30,
                base: 16,
              }}
              fw={{
                sm: "600",
                base: "700",
              }}    
              c={"headBlue"}        
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
            c={"headBlue"}
          >
            <IconText 
              child={<FaCar size={24} />} 
              text="Автомашин"
            />
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


        <Grid>
          <Grid.Col span={{"lg":9,"md":12,"sm":12}}>
            <Box
              bg={"white"}
              p={22}
              style={{
                borderRadius: "15px",
                boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.25)",
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
                <Spacer size={40} />
              </Box>
              
              <Grid>
                {carFields.map((carField, index) => (
                  <Grid.Col span={{"lg":3,"md":3,"sm":4,"base":6}} key={index}>
                    <Flex
                      mih={30}
                      gap="md"
                      justify="center"
                      align="center"
                      direction="row"
                      wrap="wrap"
                      style={{
                        borderRight: "1.5px solid black",
                      }}
                    >
                      <FaPaintBrush color="grey" size={30} />
                      <Box w={"70%"} h={70}>
                        <Text
                          fz={{
                            sm: 12,
                            base: 12,
                          }}
                          fw={{
                            sm: "400",
                            base: "400",
                          }}
                          c={"grey"}
                        >
                          {carField.name}
                        </Text>
                        <Text
                          fz={{
                            sm: 24,
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
          <Grid.Col span={{"lg":3,"md":12,"sm":12}}>
            
            <Box
              bg={"white"}
              py={22}
              px={62}
              style={{
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.25)",
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
                c={"headBlue"}
              >
                Үнэлгээ
              </Text>
              <Text
                fz={{
                  sm: 36,
                  base: 32,
                }}
                fw={{
                  sm: "500",
                  base: "700",
                }}
                c={Colors.main}
                mt={40}
                mb={15}
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
