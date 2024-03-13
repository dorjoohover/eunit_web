import { getAdByCategory } from "@/app/(api)/ad.api";
import { getConstants } from "@/app/(api)/constants.api";
import { useAppContext } from "@/app/_context";
import AdContent from "@/components/ad/adContent";
import MapCard from "@/components/ad/mapCard";
import ProAdContent from "@/components/ad/proAdContent";
import { ContainerX } from "@/components/container";
import MainContainer from "@/components/containers/mainContainer";
import FilterLayout from "@/components/filter";
import SkeletonContent from "@/components/global/skeletonContent";
import { Api } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import { CategoryModel } from "@/models/category.model";
import mergeNames from "@/utils/functions";
import { ConstantApi } from "@/utils/values";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";

import {
  GoogleMap,
  InfoWindow,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

import { useEffect, useMemo, useState } from "react";

const Category = ({ params }: { params: { slug: string } }) => {
  const [categories, setCategories] = useState<CategoryModel[]>();
  const { ads, setAds } = useAppContext();
  const init = async () => {
    try {
      await getConstants(ConstantApi.category, Api.GET).then((d) =>
        setCategories(d)
      );
      getAds(0);
    } catch (error) {}
  };

  const getAds = async (num: number) => {
    if (params.slug) {
      await getAdByCategory(params.slug, num).then((d) => setAds(d));
    }
  };

  useEffect(() => {
    init();
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const libraries = useMemo(() => ["places"], []);
  const [markerActive, setMarkerActive] = useState<number | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
    libraries: libraries as Libraries,
  });
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
      lat: 47.91887307876936,
      lng: 106.91757202148438,
    }),
    []
  );

  if (!isLoaded) {
    return <SkeletonContent />;
  }

  return (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <div className="relative flex flex-col gap-3 p-2">
          {/* //TODO Filter Box */}
          {params.slug && (
            <FilterLayout data={params.slug} isOpenMap={onOpen} />
          )}

          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* //TODO Engiin zar */}
            {ads?.specialAds && (
              <ProAdContent
                data={ads.specialAds}
                title={""}
                showLink="hidden"
                inCat={true}
                func={(n) => getAds(n)}
              />
            )}
          </Box>
          <Box>
            {/* //TODO Engiin zar */}
            {ads?.defaultAds && (
              <AdContent
                data={ads.defaultAds}
                title={""}
                showLink="hidden"
                inCat={true}
                func={(n) => getAds(n)}
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
        {/* <CustomModal></CustomModal> */}
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={"4xl"}>
          <ModalContent>
            <ModalHeader>Maps</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                    ads?.defaultAds?.ads.concat(
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
                              children={
                                // <div
                                //   onClick={() => router.push(`/ad/${m.num}`)}
                                //   className={mergeNames(
                                //     "h-[125px] aspect-4/3 flex flex-col cursor-pointer justify-end relative",
                                //     "group-hover:block "
                                //   )}
                                // >
                                //   <Image
                                //     src={
                                //       m.images[0] ??
                                //       "/images/HeaderSlider/1.jpg"
                                //     }
                                //     alt="map image"
                                //     className={mergeNames(
                                //       "absolute top-0 left-0 object-cover w-full h-full ",
                                //       ""
                                //     )}
                                //   />
                                //   <div className="absolute top-0 left-0 object-cover w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/50 to-slate-900/100 "></div>
                                //   <p className="z-10 text-base font-bold text-white">
                                //     {m.title}
                                //   </p>
                                //   <p className="z-10 text-base font-bold text-white">
                                //     {
                                //       m.items?.filter(
                                //         (f) => f.id == "price"
                                //       )[0]?.value
                                //     }
                                //   </p>
                                // </div>
                                <MapCard data={m} />
                              }
                              position={{
                                lat: parseFloat(m.location?.lat ?? 47.74604),
                                lng: parseFloat(m.location?.lng ?? 107.341515),
                              }}
                            />
                          )}
                        </MarkerF>
                      </div>
                    );
                  })}
              </GoogleMap>
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
