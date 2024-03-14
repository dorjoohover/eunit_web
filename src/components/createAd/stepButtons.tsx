import { Box, Heading, Text, useDisclosure } from "@chakra-ui/react";
import {
  GoogleMap,
  Libraries,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

import { useMemo } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { LoadingButton } from "../global/button";
import CustomModal from "../global/customModal";
import mergeNames from "@/utils/functions";
import WhiteBox from "./product/whiteBox";
import ImageGallery from "react-image-gallery";

import { GoogleMapsOptions } from "@/utils/values";
import { GoogleMapsType, StepTypes } from "@/utils/type";
import { CategoryStepsModel } from "@/models/category.model";
import { CreateAdSteps } from "@/config/enum";
import { ItemModel } from "@/models/items.model";
import { ProductInfo } from "@/app/ad/[slug]/page";

const ButtonProcess = () => {
  return (
    <div className="relative w-full h-5 overflow-hidden bg-emerald-700/30 rounded-xl">
      <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 h-5 w-[10vw]" />
      <p className="absolute top-0 left-[10vw] bottom-0 flex justify-center items-center font-semibold">
        10%
      </p>
    </div>
  );
};

const StepButtons = ({
  onPrev = () => {},
  loading = false,
  onNext = () => {},
  sharing = false,
  data,
  isLoaded,
  txt = "Дараах",
  filter = [],
  step,
  setCurrentStep,
}: {
  onPrev?: () => void;
  loading?: boolean;
  onNext?: () => void;
  sharing?: boolean;
  data: StepTypes;
  isLoaded: boolean;
  txt?: string;
  filter?: CategoryStepsModel[];
  step?: number;

  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { categories, setAds } = useAuth();

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
  //   libraries: GoogleMapsOptions.libraries,
  //   // libraries: libraries,
  // });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo<GoogleMapsType>(
    () =>
      ({
        lat: data?.map?.lat ?? 47.91887307876936,
        lng: data?.map?.lng ?? 106.91757202148438,
      } as GoogleMapsType),
    []
  );

  const top = () => {
    // window.scrollTo(0, 0);
  };

  return (
    <div className="mt-4">
      {/* <ButtonProcess /> */}
      <div className="flex flex-row justify-between pt-2">
        {step != -1 ? (
          <button
            onClick={onPrev}
            className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-red-400 rounded-full"
          >
            <FiArrowLeft size={20} />
            Буцах
          </button>
        ) : (
          <div></div>
        )}

        {step == 2 ? (
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            btnOpen={
              <>
                Дараах <FiArrowRight size={20} />
              </>
            }
            onclick={onNext}
            btnClose={<LoadingButton text="Илгээх" isLoading={loading} />}
            btnClose2="Буцах"
            header="Нэгтгэсэн мэдээлэл"
          >
            <Box maxWidth={"100%"} flex="0 0 100%" borderRadius="5px">
              <div className="flex flex-col w-full p-3 shadow-md gap-7 bg-bgGrey md:p-10 rounded-xl">
                {/*Product */}
                {data?.title && (
                  <Heading
                    variant={"mediumHeading"}
                    mb={5}
                    onClick={() => {
                      onClose(), setCurrentStep(1);
                    }}
                  >
                    {data.title}
                  </Heading>
                )}
                <Box
                  className={mergeNames(
                    "product__image",
                    "border-2 border-blue-900/20 shadow-md gallery"
                  )}
                  onClick={() => {
                    onClose(), setCurrentStep(1);
                  }}
                >
                  {data?.images ? (
                    <ImageGallery
                      thumbnailPosition="left"
                      showNav={false}
                      showFullscreenButton={false}
                      items={data?.images.map((i: any) => ({
                        original: i,
                        thumbnail: i,
                      }))}
                      // className="object-contain"
                    />
                  ) : (
                    // ene er ustgagdah ulaan shuu
                    <div className="grid w-full font-bold h-[30vh] bg-gray-700 text-white aspect-square place-items-center text-md">
                      Энэ заранд зураг байхгүй байна
                    </div>
                  )}
                </Box>
                <WhiteBox
                  heading="Хаяг"
                  className="grid xs:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                  {filter?.map((p) => {
                    if (p.step == CreateAdSteps.location) {
                      return (p.values as ItemModel[]).map((v, i) => {
                        let key: keyof StepTypes;
                        key = v.type as keyof StepTypes;

                        return (
                          <ProductInfo
                            key={i}
                            title={v.name}
                            id={v.parentId ?? ""}
                            value={data[key]?.toString() ?? ""}
                            func={() => {
                              onClose(), setCurrentStep(0);
                            }}
                            href={false}
                          />
                        );
                      });
                    }
                  })}
                </WhiteBox>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <WhiteBox
                    heading={sharing ? "Pdf file нэр" : "Зарын дэлгэрэнгүй"}
                    className="flex flex-col gap-3 "
                  >
                    <Text
                      className="text-[#5c727d] whitespace-pre-line"
                      onClick={() => {
                        onClose(), setCurrentStep(1);
                      }}
                    >
                      {data.desc ?? ""}
                      {/* {sharing ? data?.file?.[0]?.name : data?.desc} */}
                    </Text>
                  </WhiteBox>
                  <WhiteBox heading="Газрын зураг">
                    {isLoaded && (
                      <GoogleMap
                        onClick={() => {
                          onClose(), setCurrentStep(0);
                        }}
                        options={mapOptions}
                        zoom={14}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: "100%", height: "30vh" }}
                      >
                        {
                          {
                            lat:
                              data?.map?.lat ?? mapCenter?.lat,
                            lng:
                              data?.map?.lng ?? mapCenter?.lng,
                          } 
                        && (
                          <div>
                            <MarkerF
                              position={
                                
                                  {
                                    lat:
                                      data?.map?.lat ??
                                      mapCenter?.lat,
                                    lng:
                                      data?.map?.lng ??
                                      mapCenter?.lng,
                                  } 
                                
                              }
                              animation={google.maps.Animation.DROP}
                              // className={mergeNames("group")}
                            />
                          </div>
                        )}
                      </GoogleMap>
                    )}
                  </WhiteBox>
                </div>
                {data && (
                  <WhiteBox
                    heading="Мэдээлэл"
                    className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4"
                  >
                    <ProductInfo
                      title={"Үнэ"}
                      id={"price"}
                      value={data?.price?.toString() ?? ""}
                      func={() => {
                        onClose(), setCurrentStep(1);
                      }}
                      href={false}
                    />
                    <ProductInfo
                      title={"Нэгж талбайн үнэ"}
                      id={"unitPrice"}
                      value={data?.unitPrice?.toString() ?? ""}
                      func={() => {
                        onClose(), setCurrentStep(1);
                      }}
                      href={false}
                    />
                    <ProductInfo
                      title={"Талбай"}
                      id={"area"}
                      value={data?.area?.toString() ?? ""}
                      func={() => {
                        onClose(), setCurrentStep(1);
                      }}
                      href={false}
                    />
                    <ProductInfo
                      title={"Утас"}
                      id={"phone"}
                      value={data?.phone?.toString() ?? ""}
                      func={() => {
                        onClose(), setCurrentStep(1);
                      }}
                      href={false}
                    />
                    {filter?.map((p) => {
                      if (p.step == CreateAdSteps.detail) {
                        return (p.values as ItemModel[]).map((v, i) => {
                          let key: keyof StepTypes;
                          key = v.type as keyof StepTypes;
                          return (
                            <ProductInfo
                              key={i}
                              title={v.name}
                              id={v.parentId ?? ""}
                              value={data[key]?.toString() ?? ""}
                              func={() => {
                                onClose(), setCurrentStep(2);
                              }}
                              href={false}
                            />
                          );
                        });
                      }
                    })}
                  </WhiteBox>
                )}
              </div>
            </Box>
          </CustomModal>
        ) : (
          <button
            disabled={loading}
            onClick={onNext}
            className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 rounded-full a"
          >
            {txt}
            <FiArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepButtons;
