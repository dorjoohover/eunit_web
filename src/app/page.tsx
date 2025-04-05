"use client";
import { ReportWrapper } from "@/_context";
import { Colors } from "@/base/constants";
import { DistrictCard } from "@/components/shared/card";
import {
  defaultMapCenter,
  defaultMapZoom,
  defaultPhoneMapCenter,
  districts,
} from "@/utils/values";
import { Box, Center, Flex, Loader, Text, Title } from "@mantine/core";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { MarkerAssests, video } from "@/utils/assets";
import { useFetch, useMediaQuery } from "@mantine/hooks";
import { api } from "@/utils/routes";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Home() {
  const { data, loading } = useFetch<{
    payload: { avg: number; name: string; count: number }[];
  }>(`${api}ad/district`);

  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const matches = useMediaQuery("(min-width: 50em)");

  useEffect(() => {
    if (!localStorage.getItem("hasViewedVideo")) {
      setShowVideo(true);
    }
  }, []);

  const handleVideoEnd = () => {
    localStorage.setItem("hasViewedVideo", "true");
    setShowVideo(false);
  };
  const [mapLoading, setMaploading] = useState(false);
  const handleNavigation = (id: number) => {
    router.push(`/report?district=${id}`);
  };

  const markers = useMemo(
    () => [
      {
        id: 6,

        icon: MarkerAssests.orange,
        position: { lat: 47.921558220631354, lng: 106.90669349078951 },
      },
      {
        id: 1,
        icon: MarkerAssests.yellow,
        position: { lat: 47.92683312588844, lng: 106.92951836341966 },
      },
      {
        id: 0,
        icon: MarkerAssests.pink,
        position: { lat: 47.89864663332739, lng: 106.89576814269692 },
      },
      {
        id: 2,
        icon: MarkerAssests.aqua,
        position: { lat: 47.924932363836156, lng: 106.81154741227641 },
      },
      {
        id: 4,
        icon: MarkerAssests.purple,
        position: { lat: 47.91581798272838, lng: 106.96618360245022 },
      },
      {
        id: 5,
        icon: MarkerAssests.green,
        position: { lat: 47.910709907527625, lng: 106.8783333148136 },
      },
      {
        id: 3,
        icon: MarkerAssests.blue,
        position: { lat: 47.771730825448216, lng: 107.25424468977218 },
      },
    ],
    []
  );

  const districtColors = useMemo(
    () => ({
      "Хан-Уул": "#FF2079",
      Баянзүрх: "#B026FF",
      Сүхбаатар: "#DFFF00",
      Налайх: "#40E0D0",
      Чингэлтэй: "#FF6700",
      Баянгол: "#39FF14",
      Сонгинохайрхан: "#00FFFF",
    }),
    []
  );
  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     const token = await user.getIdToken(true);
  //     console.log("Token:", token);
  //   } else {
  //     console.log("User not logged in");
  //   }
  // });
  const handleMapLoad = (map: any) => {
    setMaploading(true);

    google.maps.event.addListenerOnce(map, "tilesloaded", () => {
      setMaploading(false);
    });
  };
  return (
    <div
      className="relative pt-16"
      style={{
        backgroundColor: Colors.lightIvory,
        width: matches ? "100%" : "100%",
        paddingLeft: matches ? 60 : 0,
      }}
    >
      {/* {showVideo && (
        <div className="video-wrapper">
          <video
            src={video}
            autoPlay
            muted
            playsInline
            className="video"
            onEnded={handleVideoEnd}
          />
        </div>
      )} */}

      <ReportWrapper>
        <Box
          pb={{ md: 100, sm: 60, base: 20 }}
          mx="auto"
          px={16}
          maw={1100}
          // mb={{ md: 100, sm: 60, base: 20 }}
        >
          <Title
            c="headBlue"
            maw={900}
            mx="auto"
            ta="center"
            mt={32}
            fz={{ md: 57, sm: 45, base: 32 }}
            fw="900"
          >
            Орон сууцны үнэлгээ
          </Title>

          <Flex justify="center">
            <Box w="auto" bg="#ECEFF2" style={{ borderRadius: 10 }} my={50}>
              <Text c="main" p={15}>
                Энэхүү үнэ нь тухайн дүүрэгт байрших орон сууцуудын дундаж үнэ
                юм. 😇
              </Text>
            </Box>
          </Flex>
          {loading ||
            (mapLoading && (
              <Center h="80vh">
                <Loader type="bars" />
              </Center>
            ))}

          <div
            className="parent"
            style={{
              visibility: loading || mapLoading ? "hidden" : "visible",
            }}
          >
            {data?.payload?.map((d, i) => {
              const k = d.name as keyof typeof districtColors;
              return (
                <Box key={i} className={`div${i + 1}`}>
                  {districtColors[k] && (
                    <DistrictCard
                      bg={districtColors[k]}
                      text={d.name}
                      price={Math.round(d.avg)}
                      count={d.count}
                    />
                  )}
                </Box>
              );
            })}

            <Box
              w="100%"
              className="div8"
              style={{
                borderRadius: 15,
                overflow: "hidden",
                filter: "drop-shadow(0px 0px 10px #00000025)",
              }}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={matches ? defaultMapCenter : defaultPhoneMapCenter}
                zoom={defaultMapZoom}
                options={{
                  zoomControl: true,
                  tilt: 0,
                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                  disableDefaultUI: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                  streetViewControl: false,
                  zoom: 11,
                  gestureHandling: "greedy",
                }}
                onLoad={(e) => handleMapLoad(e)}
              >
                {markers.map((marker) => (
                  <MarkerF
                    key={marker.id}
                    position={marker.position}
                    icon={marker.icon}
                    onClick={() => handleNavigation(marker.id)}
                  />
                ))}
              </GoogleMap>
            </Box>
          </div>
        </Box>
      </ReportWrapper>
    </div>
  );
}
