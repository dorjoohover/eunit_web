"use client";

import { getUserData } from "@/(api)/auth.api";
import { getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import {
<<<<<<< HEAD
=======
  AnalyzeWidget,
  ApartmentInfo,
  GeneralWidget,
>>>>>>> main
  ResultWidget,
  UserWidget,
} from "@/components/report/result";
import {
  IconText,
  InlineText,
  ReportTitle,
  Spacer,
} from "@/components/report/shared";
import { LocationModel } from "@/models/location.model";
<<<<<<< HEAD
import { formatNumber, money, parseDate } from "@/utils/functions";
import { api } from "@/utils/routes";
=======
import { Assets } from "@/utils/assets";
import {
  formatNumber,
  formatPhoneNumber,
  money,
  parseDate,
  reportDescription,
} from "@/utils/functions";
import { api, ConstantApi } from "@/utils/routes";
>>>>>>> main
import {
  defaultMapCenter,
  defaultMapContainerStyle,
  defaultMapOptions,
  defaultMapZoom,
} from "@/utils/values";
<<<<<<< HEAD
import { Box, Button, Center, Flex, Text } from "@mantine/core";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
=======
import { Box, Button, Center, Flex, Highlight, Text } from "@mantine/core";
import { useFetch, useMediaQuery } from "@mantine/hooks";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { BiCalendar, BiDownload } from "react-icons/bi";
>>>>>>> main
import { CiLocationOn } from "react-icons/ci";
import {
  IoIosArrowRoundBack,
  IoMdDownload,
} from "react-icons/io";
import { MdApartment } from "react-icons/md";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { UserModel } from "@/models/user.model";
type ResultType = {
  data: {
    min?: number;
    max?: number;
    avg?: number;
    area?: number;
    createdAt?: Date;
    no?: string;
    floor?: number;
    room?: number;
  };
  user: UserModel;

  location: LocationModel;
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
    if (!res?.success) {
      notifications.show({
        message: res?.message,
      });
      router.back();
      return;
    }
    if (!res?.token) {
      router.push("/login");
      return;
    }
    if (res.success) {
      console.log(res.data);
      setData(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);
  if (loading)
    return (
      <Center>
        <Loading />
      </Center>
    );

  const address = `${data?.location.city}, ${data?.location.district}, 
               ${
                 data?.location?.khoroo
                   ? `${data?.location?.khoroo}-р хороо,`
                   : ""
               } ${data?.location.town}`;
  const date = new Date(`${data?.data.createdAt}`);
  date.setDate(date.getDate() + 7);

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
            {/* {id && (
              <Text
                fz={{
                  sm: 40,
                  xs: 30,
                  base: 20,
                }}
              >
                #{formatNumber(id)}
              </Text>
            )} */}
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
            <IconText child={<MdApartment size={24} />} text={"Орон сууц"} />
            <Spacer size={10} />
            <IconText child={<CiLocationOn size={24} />} text={address} />
            <Spacer size={10} />
            <IconText
              child={<BiCalendar size={24} />}
              text={parseDate(
                new Date(data?.data.createdAt?.toString() ?? Date()) ??
                  new Date(),
                "."
              )}
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
              highlight={[
                `₮${money((data?.data.min ?? 0).toString())}`,
                `₮${money((data?.data.max ?? 0).toString())}`,
              ]}
              highlightStyles={{
                background: Colors.main,
                color: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              children={`
              Таны сонгосон хотхоны м.кв үнэ цэн: ₮${money(
                (data?.data.min ?? 0).toString()
              )}-оос ₮${money((data?.data.max ?? 0).toString())} хооронд`}
            ></Highlight>

            <Spacer size={10} />
            <Highlight
              fz={{
                sm: 20,
                base: 16,
              }}
              highlight={[`₮${money((data?.data.avg ?? 0).toString())}`]}
              highlightStyles={{
                background: Colors.main,
                color: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              children={`
             Таны сонгосон сууцны м.кв тохиромжит үнэ: ₮${money(
               (data?.data.avg ?? 0).toString()
             )}`}
            ></Highlight>

            <Spacer size={10} />
            <Highlight
              fz={{
                sm: 20,
                base: 16,
              }}
              highlight={[
                `${money(
                  `${(data?.data.avg ?? 0) * (data?.data.area ?? 0)}`,
                  "₮",
                  100000
                )}`,
              ]}
              highlightStyles={{
                background: Colors.main,
                color: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              children={`
                   Таны ${
                     data?.data.area ?? ""
                   } м.кв орон сууцны нийт үнэ: ${money(
                `${(data?.data.avg ?? 0) * (data?.data.area ?? 0)}`,
                "₮",
                100000
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
                `${money(
                  `${(data?.data.avg ?? 0) * (data?.data.area ?? 0)}`,
                  "",
                  100000
                )} төгрөг`,
              ]}
              highlightStyles={{
                background: Colors.main,
                color: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              // Таны Улаанбаатар хот, Хан уул дүүрэг, 11-р хороо, 17020, Жардин хотхон, 120-р байр, 6 дугаар давхарын 3 өрөө 80м.кв орон сууцны өнөөгийн зах зээлийн үнэ 160,950,000.00 төгрөг орчмын үнэтэй байна.
              // Иргэн
              // } таны ${data?.location.city} хот, ${
              //   data?.location.district
              // } дүүрэг, ${data?.location.khoroo}-р хороо, ${
              //   data?.location.zipcode
              // }, ${data?.location.town} хотхон, ${
              //   data?.data.area
              // }м.кв орон сууцны
              // өнөөгийн зах зээлийн үнэ
              // ${money(
              //   `${(data?.data.avg ?? 0) * (data?.data.area ?? 0)}`,
              //   "",
              //   100000
              // )} төгрөг орчим үнэтэй байна. Энэхүү тооцоолол нь өгөгдөлд суурилж
              // тооцоолсон бөгөөд ±5%-ийн хооронд хэлбэлзэх боломжтой.
              children={`${reportDescription(
                `${data?.user?.lastname ?? ""} ${
                  data?.user?.firstname ??
                  (data?.user?.lastname == null
                    ? data?.user?.phone
                      ? formatPhoneNumber(data?.user?.phone)
                      : data?.user?.email ?? ""
                    : "")
                }`,
                data?.data.area,
                data?.data.avg,
                data?.location,
                {
                  no: data?.data?.no,
                  floor: data?.data?.floor,
                  room: data?.data?.room,
                }
              )}`}
            ></Highlight>
          </GeneralWidget>
          {/* <Flex
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
            <IconText child={<MdApartment size={24} />} text={"Орон сууц"} />
          </Flex> */}
          {/* <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          />
          <InlineText
            text="Таны сонгосон хотхоны м.кв-н үнэ цэн:"
            label={`    ${money(`${data?.data.min}`, "₮ ")}-${money(
              `${data?.data.max}`,
              "₮ "
            )}`}
          />
          <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          />
          <InlineText
            text="Таны орон сууцны м.кв тохиромжит үнэ:"
            label={` ${money(`${data?.data.avg ?? 0}`, "₮ ")}`}
            labelProps={{ c: "main" }}
          /> */}
          {/* <Spacer
            size={{
              md: 40,
              sm: 30,
              base: 20,
            }}
          /> */}
          <Spacer size={100} />
          <Text
            ta={"end"}
            fw={700}
            fz={{
              sm: 20,
              base: 16,
            }}
          >
            Хүчинтэй хугацаа дуусах огноо: {parseDate(date, ".")}
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
          {/* <ResultWidget title={"Макро мэдээлэл"} props={{ w: "100%" }}>
            <Text
              fz={{
                md: 24,
                sm: 20,
                base: 16,
              }}
              mt={40}
            >
              Монгол банкны орон сууцны үнийн индекс
            </Text>
            <Text
              c={"grey"}
              fz={{
                md: 20,
                sm: 16,
                base: 14,
              }}
              mb={40}
            >
              Орон сууцны борлуулалт болон түрээсийн үнийн чиг хандлага, сул
              орон тоо, хүн амын өсөлт хөгжил
            </Text>
            <Box
              w={"100%"}
              className="makro"
              px={{
                md: 20,
                base: 0,
              }}
              py={12}
            >
              <Flex
                columnGap={40}
                direction={{
                  md: "row",
                  base: "column",
                }}
              >
                <AnalyzeWidget
                  border
                  label="Сүүлийн 1 жилээр"
                  text="Орон сууцны үнийн өсөлт"
                  value={12}
                />
                <Box flex={1} />
              </Flex>
              <Flex
                columnGap={40}
                direction={{
                  md: "row",
                  base: "column",
                }}
              >
                <AnalyzeWidget
                  label="Сүүлийн 1 жилээр"
                  text="Хүн амын өсөлт хөгжил"
                  value={3}
                />
                <AnalyzeWidget
                  label="Сүүлийн 1 жилээр"
                  text="Хэрэглээний үнийн индекс"
                  value={6}
                />
              </Flex>
            </Box>
          </ResultWidget> */}
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
          <ResultWidget title={"Байршил"}>
            <Spacer size={40} />
            <GoogleMap
              mapContainerStyle={defaultMapContainerStyle}
              center={
                data?.location.lat && data.location.lng
                  ? {
                      lat: data?.location.lat,
                      lng: data?.location.lng,
                    }
                  : defaultMapCenter
              }
              zoom={defaultMapZoom}
              options={defaultMapOptions}
            >
              {data?.location.lat && data.location.lng && (
                <Marker
                  position={{
                    lat: data?.location.lat,
                    lng: data?.location.lng,
                  }}
                />
              )}
            </GoogleMap>
          </ResultWidget>
        </Box>
        {/* 
        <div
          id="pspdfkit"
          style={{
            width: "100%",
            height: "100vh",
          }}
        ></div> */}
        {/* <Spacer size={32} /> */}
        {/* <Text fz={30} fw={"bold"}>
          Санал болгож буй үйлчилгээ
        </Text>
        <Spacer size={32} />
        <Flex
          w={"100%"}
          pos={"relative"}
          columnGap={40}
          justify={"space-between"}
        >
          <ServiceCard
            bg={Assets.service}
            onClick={() => {}}
            text="Үнэлгээний тайлан"
          />
          <ServiceCard
            bg={Assets.service1}
            onClick={() => {}}
            text="оРОН СУУЦНЫ ДАТА ТАТАХ"
          />
        </Flex> */}
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
