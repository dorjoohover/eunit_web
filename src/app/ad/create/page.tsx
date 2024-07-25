"use client";

import { useAppContext } from "@/app/_context";
import { ContainerX } from "@/components/container";
import StepProgress from "@/components/global/stepProgress";
import useAd from "@/components/global/useAd";
import { AdSellType, Api, CreateAdSteps } from "@/config/enum";
import { CategoryModel, CategoryStepsModel } from "@/models/category.model";
import { ConstantApi, GoogleMapsOptions } from "@/utils/values";
import { Heading, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  MarkerProps,
  useLoadScript,
} from "@react-google-maps/api";
import {
  CacheVarType,
  CreateAdType,
  GeneralDataType,
  StepTypes,
} from "@/utils/type";
import Step1 from "@/components/createAd/step1";
import StepButtons from "@/components/createAd/stepButtons";
import { filterCategoryById } from "@/app/(api)/category.api";
import Step4 from "@/components/createAd/step4";
import { ItemModel } from "@/models/items.model";
import Step3 from "@/components/createAd/step3";
import FormTitle from "@/components/createAd/title";
import { createAd } from "@/app/(api)/ad.api";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function AdCreatePage() {
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [steps, setSteps] = useState<CategoryStepsModel[]>([]);
  const { user, categories } = useAppContext();

  const [types, setTypes] = useState<CreateAdType>({
    categoryId: -1,
    categoryName: "",
    subCategoryId: "",
    category_ID: "",
    sellType: AdSellType.nothing,
    adType: "",
  });

  const [locationData, setLocationData] = useState<StepTypes>();
  const [moreData, setMoreData] = useState<StepTypes>();
  const [cache, setCache] = useState<CacheVarType[]>([]);
  // FILTER INFORMATION - FOR WHICH DATA TO DISPLAY

  // STEP3 IIN DATA - PRICE, AREA, UNITPRICE, TITLE, DESC, IMAGE
  const [generalData, setGeneralData] = useState<StepTypes>({
    price: 0,
    area: 0,
    unitPrice: 0,
    title: "",
    desc: "",
    imgSelected: false,
    images: [],
    phone: parseInt(user?.phone ? user.phone : 0),
  });
  // STEP 3IIN RAW IMAGE FILES
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const filterCategory = async (id: string) => {
    await filterCategoryById(id).then((d) => {
      setSteps(d.steps);
    });
  };
  // THIS EFFECT IS FOR FETCHING FILTER DATA FOR STEP2,STEP3,STEP4
  useEffect(() => {
    if (
      categories != undefined &&
      types.subCategoryId != "" &&
      steps.length == 0
    ) {
      filterCategory(types.subCategoryId);
    }
    if (types.categoryName && types.subCategoryId) {
    } else {
    }
  }, [types]);
  const [isLoading, setIsLoading] = useState(false);
  // checking validation of steps in here
  const handleNextStep = () => {
    
    if (currentStep === -1)
      return checkConditionOnNextStep(
        types.categoryName != "" &&
          types.sellType != AdSellType.nothing &&
          types.subCategoryId != ""
      );
    if (currentStep == 0) {
      let check = true;

      (steps[0].values as ItemModel[]).map((s) => {
        let key: keyof StepTypes;
        key = s.type as keyof StepTypes;

        if (
          locationData == undefined ||
          locationData?.[key] == undefined ||
          locationData?.[key] == ""
        )
          check = false;
      });
      return checkConditionOnNextStep(check);
    }
    if (currentStep === 1)
      return checkConditionOnNextStep(
        generalData.price != 0 &&
          generalData.area != 0 &&
          generalData.unitPrice != 0 &&
          generalData.title != "" &&
          generalData.desc != ""
      );
    if (currentStep === 2) return validateStep4();
  };

  const checkConditionOnNextStep = (value: boolean) => {
    return value
      ? setCurrentStep((prev) => prev + 1)
      : toast({
          title: "Та бүх талбарыг бөглөнө үү.",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
  };

  const sendAd = async () => {
    setIsLoading(true);

    setTypes((prev) => ({
      ...prev,
    }));
    let fImages = new FormData();
    images?.map((prev, i) => {
      if (i < 8) {
        fImages.append(`files`, prev);
      }
    });
    let cateId = categories[types.categoryId!]._id;
    console.log(
      fImages,
      { ...locationData, ...generalData, ...moreData },
      types,
      steps,
      cateId
    );
    await createAd(
      fImages,
      { ...locationData, ...generalData, ...moreData },
      types,
      steps,
      cateId
    ).then((d) => {
      if (d) {
        toast({
          title: "Амжилттай нэмэгдлээ.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        router.push("/account/myads");
      }
    });
    setIsLoading(false);
  };
  const validateStep4 = async () => {
    setIsLoading(true);

    let emptyAd = true;
    (steps[2].values as ItemModel[]).map((f) => {
      let key: keyof StepTypes;
      key = f.type as keyof StepTypes;
      if (moreData?.[key] == undefined) {
        emptyAd = false;
      }
    });
    if (emptyAd) {
      if (user?.status != "banned") {
        await sendAd();
      } else {
        toast({
          title:
            "Та одоогоор зар илгээх боломжгүй байна. Email-ээ шалган Verify хийнэ үү",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Та бүх талбарыг бөглөнө үү.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => {
      return prev > -1 ? prev - 1 : prev;
    });
    top();
  };

  const top = () => {
    window.scrollTo(0, 0);
  };
  // const libraries = useMemo(() => ["places"], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: GoogleMapsOptions.libraries,
    // libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
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
    return <Loading />;
  }
  return (
    <div className="min-h-[80vh] py-10">
      <ContainerX>
        <StepProgress
          activeStep={currentStep}
          handleClick={(stepId) => setCurrentStep(stepId)}
          hasFourStep={types?.categoryName === "realState"}
        />

        {
          // STEP1 TYPES: CATEGORY, SUBCATEGORY, ADTYPE, SELLTYPE
          currentStep === -1 && (
            <Step1 {...{ types, setTypes }} categories={categories} />
          )
        }

        {steps?.map((step, index) => {
          if (currentStep == index) {
            if (step.step == CreateAdSteps.location)
              //STEP2: LOCATIONS - DISTRICT, LOCATION, COMMITTEE, TOWN

              return (
                <div key={index}>
                  <Step4
                    filter={step.values as ItemModel[]}
                    state={locationData}
                    handle={setLocationData}
                    cache={cache}
                    setCache={setCache}
                  />
                  <Heading variant="mediumHeading" className="mb-5 text-center">
                    Газрын зураг дээр байршлаа сонгоно уу
                  </Heading>
                  {isLoaded ? (
                    <GoogleMap
                      // className="shadow aspect-video"
                      options={mapOptions}
                      onClick={(e) => {
                        const selected = e.latLng?.toJSON();
                        if (selected) {
                          setLocationData((prev) => ({
                            ...prev,
                            map: selected,
                          }));
                        }
                      }}
                      zoom={14}
                      center={mapCenter}
                      mapTypeId={google.maps.MapTypeId.ROADMAP}
                      mapContainerStyle={{ width: "100%", height: "40vh" }}
                    >
                      {locationData?.map && (
                        <MarkerF
                          position={locationData.map}
                          onClick={() => {}}
                          animation={google.maps.Animation.DROP}
                        />
                      )}
                    </GoogleMap>
                  ) : <div className="w-full h-[40vh]"><Spinner/></div>}
                </div>
              );
            if (index == 1)
              return (
                <Step3
                  key={index}
                  filter={step.values as ItemModel[]}
                  images={images}
                  setImages={setImages}
                  generalData={generalData}
                  setGeneralData={setGeneralData}
                />
              );

            if (index == 2)
              return (
                <div key={index}>
                  <FormTitle>Дэлгэрэнгүй мэдээлэл</FormTitle>
                  <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
                    <Step4
                      filter={step.values as ItemModel[]}
                      state={moreData}
                      handle={setMoreData}
                      cache={cache}
                      setCache={setCache}
                    />
                  </div>
                </div>
              );
          }
        })}

        <StepButtons
          setCurrentStep={setCurrentStep}
          onNext={() => {
            handleNextStep(), top();
          }}
          onPrev={() => {
            handlePrevStep(), top();
          }}
          isLoaded={isLoaded}
          data={{ ...locationData, ...generalData, ...moreData }}
          filter={steps}
          loading={isLoading}
          txt={currentStep == 2 ? "Илгээх" : "Дараах"}
          step={currentStep}
        />
      </ContainerX>
    </div>
  );
}
