"use client";

import { getUserData } from "@/(api)/auth.api";
import { getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Colors } from "@/base/constants";
import {
  AnalyzeWidget,
  ApartmentInfo,
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
import { money, parseDate } from "@/utils/functions";
import { ConstantApi } from "@/utils/routes";
import {
  defaultMapCenter,
  defaultMapContainerStyle,
  defaultMapOptions,
  defaultMapZoom,
} from "@/utils/values";
import { Box, Center, Flex, Loader, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdApartment } from "react-icons/md";

type ResultType = {
  data: {
    min?: number;
    max?: number;
    avg?: number;
    area?: number;
    createdAt?: Date;
  };

  location: LocationModel;
};

const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const id = params.get("id");
  const { user, setUser } = useAppContext();
  const area = params.get("area");
  const [data, setData] = useState<ResultType>();
  const router = useRouter();
  const getResult = async () => {
    // setLoading(true);
    if (id == null) return;
    const res = await getRequestResult(+id);
    console.log(res);
    if (!res?.token) {
      // router.push("/login");
      return;
    }
    if (res.success) {
      console.log(res);
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
        <Loader />
      </Center>
    );

  const address = `${data?.location.city}, ${data?.location.district}, 
                ${data?.location.town}`;
  return (
    <Box>
      <ReportTitle text={data?.location.town ?? ""}>
        <Box>
          <Text fz={30} pb={40}>
            Зах зээлийн үнэлгээ
          </Text>
          <Flex
            style={{
              borderBottom: `1px solid ${Colors.deepMose20}`,
            }}
            pb={12}
            justify={"start"}
            w={"100%"}
            gap={40}
          >
            <IconText child={<MdApartment size={24} />} text={"Орон сууц"} />
            <IconText child={<CiLocationOn size={24} />} text={address} />
          </Flex>
          <Spacer size={20} />
          <InlineText
            text="Эд хөрөнгийн үнэ цэнэ нь хооронд:"
            label={`    ${money(`${data?.data.min}`, "MNT ")}-${money(
              `${data?.data.max}`,
              "MNT "
            )}`}
          />

          <Spacer size={40} />
          <InlineText
            text="Таны орон сууцны тохиромжит үнэлгээ:"
            label={` ${money(`${data?.data.avg}`, "MNT ")}`}
            labelProps={{ bg: "main", c: "white", py: 4, px: 20 }}
          />
          <Spacer size={20} />

          <Box w={150} h={1} bg={"deepMose20"} mb={24} mt={50} />
          <UserWidget user={user} location={address} />
          <Spacer size={100} />
          <Text c={"headBlue"} fz={20}>
            Үнэлгээ хийсэн он сар:
            {parseDate(
              new Date(data?.data.createdAt?.toString() ?? Date()) ??
                new Date(),
              "."
            )}
          </Text>
          <Spacer size={24} />
          <ResultWidget
            title={"Орон сууцны мэдээлэл"}
            props={{ maw: "1000px" }}
          >
            <ApartmentInfo text={address} title="Хаяг" />
            <ApartmentInfo
              text={`Орон сууц`}
              title="Үл хөдлөх хөрөнгийн төрөл"
            />
            <ApartmentInfo
              text={`${data?.location.operation ?? ""}`}
              title="Ашиглалтанд орсон он"
            />
            <ApartmentInfo
              text={`${data?.data.area ?? 0}м.кв`}
              title="Талбайн хэмжээ"
            />
          </ResultWidget>
          <Spacer size={24} />
          <ResultWidget title={"Макро мэдээлэл"} props={{ w: "100%" }}>
            <Text fz={24} mt={40}>
              Барилга хөгжлийн яамны датанд үндэслэж (гэж мэгээшаагад)
            </Text>
            <Text c={"grey"} fz={20} mb={40}>
              Орон сууцны борлуулалт болон түрээсийн үнийн чиг хандлага, сул
              орон тоо, хүн амын өсөлт хөгжил
            </Text>
            <Box
              w={"100%"}
              style={{
                border: `1px solid ${Colors.mainGrey}`,
              }}
              px={20}
              py={12}
            >
              <Flex gap={20}>
                <AnalyzeWidget
                  border
                  label="Сүүлийн 6 сараар"
                  text="Худалдан авах үнийн өсөлт"
                  value={-1}
                />
                <Box flex={1} />
              </Flex>
              <Flex gap={20}>
                <AnalyzeWidget
                  label="Сүүлийн 5 жилээр"
                  text="Хүн амын өсөлт хөгжил"
                  value={3}
                />
                <AnalyzeWidget
                  label="Сүүлийн 6 сараар"
                  text="Түрээсийн үнийн өсөлт"
                  value={6}
                />
              </Flex>
            </Box>
          </ResultWidget>
          <Spacer size={24} />
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
        <Spacer size={200} />
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
