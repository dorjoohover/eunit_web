"use client";
import { ReportWrapper } from "@/_context";
import { Colors } from "@/base/constants";
import { DistrictCard } from "@/components/shared/card";
import {
  defaultMapCenter,
  defaultMapContainerStyle,
  defaultMapOptions,
  defaultMapZoom,
} from "@/utils/values";
import { Box, Flex, Grid, Text, Title } from "@mantine/core";
import { GoogleMap, Marker, MarkerF } from "@react-google-maps/api";
import Image from "next/image";
import {
  AdvancedMarker,
  AdvancedMarkerAnchorPoint,
  CollisionBehavior,
} from "@vis.gl/react-google-maps";
import { Assets, IconAssets, MarkerAssests, video } from "@/utils/assets";
import { useFetch } from "@mantine/hooks";
import { api } from "@/utils/routes";
export default function Home() {
  const { data, loading } = useFetch<{
    payload: { avg: number; name: string; count: number }[];
  }>(`${api}ad/district`);
  const center = {
    lat: 47.918873, // Ulaanbaatar latitude
    lng: 106.917366, // Ulaanbaatar longitude
  };

  const markers = [
    {
      id: 1,
      icon: MarkerAssests.orange,
      position: { lat: 47.921558220631354, lng: 106.90669349078951 },
    },
    {
      id: 2,
      icon: MarkerAssests.yellow,
      position: { lat: 47.92683312588844, lng: 106.92951836341966 },
    },
    {
      id: 3,
      icon: MarkerAssests.pink,
      position: { lat: 47.89864663332739, lng: 106.89576814269692 },
    },
    {
      id: 4,
      icon: MarkerAssests.aqua,
      position: { lat: 47.924932363836156, lng: 106.81154741227641 },
    },
    {
      id: 5,
      icon: MarkerAssests.purple,
      position: { lat: 47.91581798272838, lng: 106.96618360245022 },
    },
    {
      id: 6,
      icon: MarkerAssests.green,
      position: { lat: 47.910709907527625, lng: 106.8783333148136 },
    },
    {
      id: 7,
      icon: MarkerAssests.blue,
      position: { lat: 47.771730825448216, lng: 107.25424468977218 },
    },
  ];

  return (
    <div
      className={`bg-[${Colors.lightIvory}] relative  top-[60px] left-[60px]`}
      style={{
        width: "calc(100vw - 70px)",
      }}
    >
      <ReportWrapper>
        <Box pb={80} mx={"auto"} maw={1100} mb={100}>
          <Title
            mt={40}
            c={"headBlue"}
            mx={"auto"}
            ta={"center"}
            maw={900}
            tt={"capitalize"}
            fz={57}
            fw={"900"}
          >
            Таны хөрөнгийн үнэ цэнийг нэг товчлуурт багтаана!
          </Title>
          <Box maw={1100} px={20} my={60} mx={"auto"}>
            <video
              autoPlay
              style={{
                borderRadius: 20,
              }}
              loop
            >
              <source src={video} type="video/mp4" />
            </video>
          </Box>

          <Title
            c={"headBlue"}
            maw={900}
            mx={"auto"}
            ta={"center"}
            fz={57}
            fw={"900"}
            tt={"capitalize"}
          >
            Дүүргүүдийн орон сууцны үнэлгээ
          </Title>
          <Flex justify={"center"}>
            {" "}
            <Box
              w={"auto"}
              bg={"#ECEFF2"}
              style={{
                borderRadius: 10,
              }}
              my={50}
            >
              <Text c={"main"} p={15}>
                Энэхүү үнэлгээ нь тухайн дүүрэгт байрших олон орон сууцны дундаж
                юм. 😇
              </Text>
            </Box>
          </Flex>
          <Flex columnGap={0} mb={32}>
            <Box flex={1} mr={16}>
              {data?.payload?.map((d, i) => {
                if (d.name == "Хан-Уул")
                  return (
                    <DistrictCard
                      bg="#B026FF"
                      key={i}
                      text={d.name}
                      price={Math.round(d.avg)}
                      count={d.count}
                    />
                  );
              })}
            </Box>
            <Box flex={1} mx={16}>
              {data?.payload?.map((d, i) => {
                if (d.name == "Баянзүрх")
                  return (
                    <DistrictCard
                      key={i}
                      bg="#B026FF"
                      text={d.name}
                      price={Math.round(d.avg)}
                      count={d.count}
                    />
                  );
              })}
            </Box>
            <Box flex={1} mx={16}>
              {data?.payload?.map((d, i) => {
                if (d.name == "Сүхбаатар")
                  return (
                    <DistrictCard
                      key={i}
                      bg="#DFFF00"
                      text={d.name}
                      price={Math.round(d.avg)}
                      count={d.count}
                    />
                  );
              })}
            </Box>
            <Box flex={1} ml={16}>
              {data?.payload?.map((d, i) => {
                if (d.name == "Налайх")
                  return (
                    <DistrictCard
                      key={i}
                      bg="#40E0D0"
                      text={d.name}
                      price={Math.round(d.avg)}
                      count={d.count}
                    />
                  );
              })}
            </Box>
          </Flex>
          <Flex columnGap={0}>
            <Flex direction={"column"} flex={1} gap={32}>
              <Box flex={1} mr={16}>
                {data?.payload?.map((d, i) => {
                  if (d.name == "Чингэлтэй")
                    return (
                      <DistrictCard
                        key={i}
                        bg="#FF6700"
                        text={d.name}
                        price={Math.round(d.avg)}
                        count={d.count}
                      />
                    );
                })}
              </Box>
              <Box flex={1} mr={16}>
                {data?.payload?.map((d, i) => {
                  if (d.name == "Баянгол")
                    return (
                      <DistrictCard
                        key={i}
                        bg="#39FF14"
                        text={d.name}
                        price={Math.round(d.avg)}
                        count={d.count}
                      />
                    );
                })}
              </Box>
              <Box flex={1} mr={16}>
                {data?.payload?.map((d, i) => {
                  if (d.name == "Сонгинохайрхан")
                    return (
                      <DistrictCard
                        key={i}
                        bg="#00FFFF"
                        text={d.name}
                        price={Math.round(d.avg)}
                        count={d.count}
                      />
                    );
                })}
              </Box>
            </Flex>
            <Box flex={3} ml={16}>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={{
                  lat: 47.85301568040689,
                  lng: 107.03947398892948,
                }}
                zoom={defaultMapZoom}
                options={{
                  zoomControl: true,
                  tilt: 0,

                  // featureType: "water",
                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                  disableDefaultUI: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  streetViewControl: false,
                  zoom: 11,
                  gestureHandling: "greedy",
                }}
              >
                {markers.map((marker) => (
                  <MarkerF
                    position={marker.position}
                    icon={marker.icon}
                    key={marker.id}
                  ></MarkerF>
                ))}
              </GoogleMap>
            </Box>
          </Flex>
        </Box>
      </ReportWrapper>
    </div>
  );
}
