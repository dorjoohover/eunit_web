"use client";
import { getFilteredAd } from "@/app/(api)/ad.api";

import { useAppContext } from "@/app/_context";
import AdContent from "@/components/ad/adContent";
import MapCard from "@/components/ad/mapCard";
import ProAdContent from "@/components/ad/proAdContent";
import { ContainerX } from "@/components/container";
import MainContainer from "@/components/containers/mainContainer";
import FilterLayout from "@/components/filter";
import { AdTypes, Api } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";

import { GoogleMap, InfoWindow, MarkerF } from "@react-google-maps/api";

import { useEffect, useMemo, useState } from "react";
import CategoryDynamicLoading from "./loading";
import CompareSelect from "@/components/account/details/compareSelect";

const Category = ({ params }: { params: { slug: string } }) => {
  const { ads, setAds, compare, isLoaded } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState({
    default: 0,
    special: 0,
  });
  const getAds = async () => {
    setIsLoading(true);
    if (params.slug) {
      const defaultAds = await getFilteredAd(
        params.slug,
        page.default,
        [],
        [],
        AdTypes.default,
        6,
        ads.defaultAds?.limit ?? 0
      );
      const specialAds = await getFilteredAd(
        params.slug,
        page.special,
        [],
        [],
        AdTypes.special,
        4,
        ads.specialAds?.limit ?? 0
      );
      setAds({ defaultAds, specialAds });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAds();
  }, [page]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [markerActive, setMarkerActive] = useState<number | null>(null);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: ads?.defaultAds?.[0]?.location?.lat ?? 47.91887307876936,
      lng: ads?.defaultAds?.[0]?.location?.lng ?? 106.91757202148438,
    }),
    [ads, ads?.defaultAds]
  );

  return (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <div className="relative flex flex-col gap-3 p-2">
          {/* //TODO Filter Box */}
          {params.slug && (
            <FilterLayout data={params.slug} isOpenMap={onOpen} />
          )}

          {isLoading && <CategoryDynamicLoading />}

          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* //TODO Engiin zar */}
            {ads?.specialAds && (
              <ProAdContent
                data={ads.specialAds}
                title={""}
                showLink="hidden"
                inCat={true}
                func={(n) => setPage((prev) => ({ ...prev, special: n }))}
              />
            )}
          </Box>
          <Box>
            {/* //TODO Engiin zar */}
            {ads?.defaultAds && (
              <AdContent
                pg={true}
                data={ads.defaultAds}
                title={""}
                n={6}
                showLink="hidden"
                inCat={true}
                func={(n) => setPage((prev) => ({ ...prev, default: n }))}
              />
            )}
            {ads?.defaultAds?.limit <= 0 && ads?.specialAds?.limit <= 0 && (
              <ContainerX>
                <div className="grid h-[80vh] text-2xl place-items-center">
                  Зар байхгүй байна
                </div>
              </ContainerX>
            )}
          </Box>
        </div>

        <CompareSelect btnView={false} />
        {compare.length > 0 && <div className="h-[250px]" />}
        {/* <CustomModal></CustomModal> */}
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={"4xl"}>
          <ModalContent>
            <ModalHeader>Maps</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {isLoaded && (
                <GoogleMap
                  // className={"map"}
                  options={mapOptions}
                  onClick={(e) => {
                    // setMap(e.latLng.toJSON());
                    // console.log(e.latLng.toJSON());
                  }}
                  zoom={14}
                  center={mapCenter}
                  mapTypeId={google.maps.MapTypeId.ROADMAP}
                  mapContainerStyle={{ width: "100%", height: "50vh" }}
                >
                  {isLoaded &&
                    (
                      ads?.defaultAds?.ads?.concat(
                        ads?.specialAds?.ads
                      ) as AdModel[]
                    )?.map((m, i) => {
                      return (
                        <div key={i}>
                          <MarkerF
                            position={{
                              lat: parseFloat(m.location?.lat ?? 47.74604),
                              lng: parseFloat(m.location?.lng ?? 107.341515),
                            }}
                            onMouseOver={() => setMarkerActive(i)}
                            onClick={() => setMarkerActive(i)}
                            animation={google.maps.Animation.DROP}
                            // className={mergeNames("group")}
                          >
                            {markerActive == i && (
                              <InfoWindow
                                options={{ zIndex: 120 }}
                                position={{
                                  lat: parseFloat(m.location?.lat ?? 47.74604),
                                  lng: parseFloat(
                                    m.location?.lng ?? 107.341515
                                  ),
                                }}
                              >
                                <MapCard data={m} />
                              </InfoWindow>
                            )}
                          </MarkerF>
                        </div>
                      );
                    })}
                </GoogleMap>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MainContainer>
    </Box>
  );
};

export default Category;
