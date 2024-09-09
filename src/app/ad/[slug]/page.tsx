"use client";
import React, {
  Fragment,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import ImageGallery from "react-image-gallery";
import { useRouter } from "next/navigation";
import { BiArea, BiDoorOpen } from "react-icons/bi";
import { FaCopy, FaHeart } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";

import mergeNames, {
  getSellType,
  getSuggestionValue,
  profileImgUrl,
} from "@/utils/functions";
import ScrollTop from "@/components/global/scrollTop";
import MainContainer from "@/components/containers/mainContainer";
import Engage from "@/components/product/engage";
import { FetchAdUnitType, ItemType } from "@/utils/type";
import { GoogleMapsOptions, imageApi, locationCenter } from "@/utils/values";
import { AdModel } from "@/models/ad.model";
import { getAdById, getSuggestionAds } from "@/app/(api)/ad.api";
import moment from "moment";
import UserInfo, {
  SmallProductHeader,
  SmallUserInfo,
} from "@/components/ad/userInfo";
import { UserModel } from "@/models/user.model";

import { CategoryModel } from "@/models/category.model";
import ItemContainer from "@/components/createAd/product/itemContainer";
import { calcValue } from "@/components/ad/card";
import WhiteBox from "@/components/createAd/product/whiteBox";
import ProductHeader from "@/components/product/productHeader";
import { useAppContext } from "@/app/_context";
import { bookmark } from "@/app/(api)/user.api";
import ProductInfo from "@/components/createAd/product/info";
import { STYLES } from "@/styles";
import MapCard from "@/components/ad/mapCard";
import AdContent from "@/components/ad/adContent";
import { NoAds } from "@/components/account/myAds";
import { notifications } from "@mantine/notifications";
import {
  ActionIcon,
  Box,
  Flex,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";

export default function AdDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [data, setData] = useState<AdModel>();
  const { isLoaded } = useAppContext();

  const router = useRouter();
  const {
    mark,
    setMark,
    user,
    setUser,
  }: {
    user: UserModel;
    mark: number[];
    setMark: React.Dispatch<React.SetStateAction<number[]>>;
    setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [markerActive, setMarkerActive] = useState(0);
  const [suggestion, setSuggestion] = useState("map");
  const [suggestedAds, setSuggestedAds] = useState<FetchAdUnitType>();

  // const token = getCookie("token");
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const updateMark = async (id: number) => {
    if (!user) {
      notifications.show({
        message: "Та нэвтэрнэ үү",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (!loading) {
      try {
        setLoading(true);
        const body = mark.filter((m) => m != id);
        const was = body.length != mark.length;
        setMark((prev) => (!was ? [...prev, id] : body));
        was
          ? notifications.show({
              message: "Зар хүслээс хасагдлаа.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            })
          : notifications.show({
              message: "Зар хүсэлд нэмэгдлээ.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
        await bookmark(id);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };
  const mapCenter = useMemo(
    () => ({
      lat: parseFloat(
        data?.location?.lat?.toString() ?? locationCenter.lat.toString()
      ),
      lng: parseFloat(
        data?.location?.lng?.toString() ?? locationCenter.lng.toString()
      ),
    }),
    [data]
  );
  const getSuggestion = async (suggest: string) => {
    try {
      await getSuggestionAds(
        data?._id ?? "",
        {
          id: suggest,
          value:
            suggest != "map"
              ? data?.items.filter((s) => s.id == suggest)?.[0].value ?? ""
              : "",
        },
        0
      ).then((d: FetchAdUnitType) => {
        setSuggestedAds(d);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    await getAdById(params.slug).then((d) => setData(d));
  };

  useEffect(() => {
    if (data) getSuggestion(suggestion);
  }, [data, suggestion]);
  useEffect(() => {
    if (params.slug) {
      getData();
    }
  }, [params]);
  // const [open, setOpen] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
    notifications.show({
      message: `Холбоосыг хуулж авлаа`,
      status: "info",
      isClosable: true,
      duration: 1500,
    });
  };

  return (
    <Box m={2} id="main__product">
      <ScrollTop />

      <MainContainer>
        <Stack dir={"row"} py={2} gap={3} pos="relative">
          <Box maw={"100%"} flex="0 0 100%" className="rounded-[5px]">
            <div className="flex flex-col-reverse xl:flex-row gap-7">
              <div className="flex flex-col w-full gap-5 max-w-[1030px]">
                {/* <p className="text-darkBlue">/Үл хөдлөх/Орон сууц</p> */}
                <h1 className="my-5 text-lg font-semibold md:text-3xl">
                  {data?.title}
                </h1>
                <div className="flex items-center justify-between">
                  <Engage
                    date={moment(data?.createdAt).format("lll")}
                    num={data?.num}
                    view={
                      (data?.views?.length ?? 0) > 0 && (
                        <p>Үзсэн хүний тоо: {data?.views?.length}</p>
                      )
                    }
                  />
                  <div className="flex xl:hidden">
                    <AdButton
                      icon={<FaHeart />}
                      color={
                        mark?.find((b) => b == data?.num) != undefined
                          ? "red"
                          : "gray"
                      }
                      onClick={() => updateMark(data!.num)}
                    />
                    <AdButton
                      icon={<FaCopy />}
                      onClick={() => {
                        copyToClipboard();
                      }}
                    />
                  </div>
                </div>
                {data && (
                  <div className="flex items-end justify-between xl:hidden">
                    <SmallUserInfo
                      id={(data.user as UserModel)?._id ?? ""}
                      email={(data.user as UserModel)?.email ?? ""}
                      username={(data.user as UserModel)?.username ?? ""}
                      phone={
                        data.items?.filter((f) => f.id == "phone")?.[0]?.value
                      }
                      agent={
                        (data.user as UserModel)?.userType == "default"
                          ? "Энгийн"
                          : (data.user as UserModel)?.userType == "organization"
                          ? "Байгууллага"
                          : (data.user as UserModel)?.userType == "agent"
                          ? "Агент"
                          : (data.user as UserModel)?.userType
                      }
                      avatar={profileImgUrl(
                        (data.user as UserModel).profileImg
                      )}
                    />

                    <SmallProductHeader
                      price={
                        data?.items?.find((d) => d.id == "price")?.value ?? "0"
                      }
                      unitPrice={
                        data?.items?.find((d) => d.id == "unitPrice")?.value ??
                        "0"
                      }
                    />
                  </div>
                )}
                <div className="relative w-full overflow-hidden bg-gray-900 rounded-lg gallery">
                  {(data?.images?.length ?? 0) > 0 ? (
                    <div className="object-contain">
                      <ImageGallery
                        // thumbnailPosition="bottom"
                        lazyLoad={true}
                        showPlayButton={false}
                        // showBullets={true}
                        // showThumbnails={false}
                        // showIndex={true}
                        items={
                          data?.images?.map((i) => ({
                            original: `${imageApi}${i}`,
                            thumbnail: `${imageApi}${i}`,
                            loading: "lazy",
                            thumbnailLoading: "lazy",
                          })) ?? []
                        }
                      />
                    </div>
                  ) : (
                    <div className="grid w-full font-bold h-[50vh] bg-gray-700 text-white aspect-square place-items-center text-md">
                      Энэ заранд зураг байхгүй байна
                    </div>
                  )}
                </div>
                <div
                  className={mergeNames(
                    // '-translate-y-[50px] relative z-10',
                    " py-5 px-6  w-full   font-semibold",
                    "lg:flex-row gap-5 flex-col flex justify-between whitespace-nowrap",
                    " bg-white/90 rounded-md"
                  )}
                >
                  <div className="grid items-center justify-between w-full grid-cols-2 gap-3 md:grid-cols-4">
                    {data?.items?.map((p, i) => {
                      console.log(p);
                      return (
                        <Fragment key={i}>
                          {(p.position == "top" || p.position == "any") && (
                            <ItemContainer
                              lbl={p.name}
                              name={p.name}
                              href={true}
                              value={p.value}
                              id={p.id}
                              cateId={(data.subCategory as CategoryModel)?._id}
                              Icon={({
                                data,
                                onClick,
                                id,
                                ...props
                              }: ItemType) => {
                                switch (p.id) {
                                  case "room":
                                    return (
                                      <BiDoorOpen
                                        {...props}
                                        className="text-xl"
                                      />
                                    );
                                  case "area":
                                    return <BiArea {...props} />;
                                  case "masterBedroom":
                                    return (
                                      <IoBedOutline
                                        {...props}
                                        className="text-xl"
                                      />
                                    );
                                  case "bathroom":
                                    return (
                                      <TbBath {...props} className="text-xl" />
                                    );
                                  default:
                                    return <></>;
                                }
                              }}
                              text={calcValue(
                                p.value,
                                "байхгүй",
                                p.id == "area" ? "м.кв" : ""
                              )}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <WhiteBox
                    heading="Зарын дэлгэрэнгүй"
                    className="flex flex-col gap-3"
                  >
                    <Text className="text-[#5c727d] whitespace-pre-line">
                      {data?.description}
                    </Text>
                  </WhiteBox>
                  <WhiteBox heading="Газрын зураг">
                    {isLoaded && (
                      <GoogleMap
                        options={mapOptions}
                        zoom={14}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: "100%", height: "30vh" }}
                      >
                        {isLoaded && (
                          <MarkerF
                            position={{
                              lat: parseFloat(
                                data?.location?.lat?.toString() ??
                                  "47.91887307876936"
                              ),
                              lng: parseFloat(
                                data?.location?.lng?.toString() ??
                                  "106.91757202148438"
                              ),
                            }}
                            // onMouseOver={() => setMarkerActive(i)}

                            animation={google.maps.Animation.DROP}
                          />
                        )}
                      </GoogleMap>
                    )}
                  </WhiteBox>
                </div>
                <WhiteBox
                  heading="Хаяг"
                  className="grid xs:grid-cols-2 xl:grid-cols-4 gap-5"
                >
                  {data?.items?.map((p, i) => {
                    if (p.position == "location") {
                      return (
                        <ProductInfo
                          href={true}
                          key={i}
                          title={p.name}
                          id={p.id}
                          cateId={(data.subCategory as CategoryModel)?._id}
                          value={p.value}
                          // onClick={() => getFilterByItem(p.id, p.value)}
                        />
                        // <></>
                      );
                    } else {
                      return <Fragment key={i}></Fragment>;
                    }
                  })}
                </WhiteBox>
                <WhiteBox
                  heading="Мэдээлэл"
                  className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3"
                >
                  <ProductInfo
                    href={data?.sellType != undefined}
                    title={"Борлуулах төрөл"}
                    id={data?.sellType}
                    cateId={(data?.subCategory as CategoryModel)?._id}
                    value={getSellType(data?.sellType ?? "") ?? ""}
                    // onClick={() =>
                    //   getFilterByItem(data.sellType, data.sellType)
                    // }
                  />

                  {data?.items?.map((p, i) => {
                    if (p.position == "default") {
                      return (
                        <ProductInfo
                          key={i}
                          href={(p.isSearch || p.id == "sellType") ?? false}
                          title={p.name}
                          id={p.id}
                          cateId={(data.subCategory as CategoryModel)?._id}
                          value={p.value}
                          // onClick={() => getFilterByItem(p.id, p.value)}
                        />
                        // <></>
                      );
                    }
                  })}
                </WhiteBox>
              </div>
              <div className="flex-col justify-between hidden h-full gap-3 xl:flex xl:sticky top-20">
                {data && (
                  <>
                    <div>
                      <ProductHeader
                        price={
                          data?.items?.find((d) => d.id == "price")?.value ??
                          "0"
                        }
                        unitPrice={
                          data?.items?.find((d) => d.id == "unitPrice")
                            ?.value ?? "0"
                        }
                      />
                      <AdButton
                        icon={<FaHeart />}
                        color={
                          mark?.find((b) => b == data.num) != undefined
                            ? "red"
                            : "gray"
                        }
                        onClick={() => {
                          updateMark(data!.num);
                        }}
                      />
                      <AdButton
                        icon={<FaCopy />}
                        onClick={() => {
                          copyToClipboard();
                        }}
                      />
                    </div>
                    <div>
                      <div className="p-2 bg-white rounded-md w-auto xl:w-[320px]">
                        <UserInfo
                          id={(data.user as UserModel)?._id ?? ""}
                          email={(data.user as UserModel)?.email ?? ""}
                          username={(data.user as UserModel)?.username}
                          phone={
                            data.items?.filter((f) => f.id == "phone")?.[0]
                              ?.value
                          }
                          agent={
                            (data.user as UserModel)?.userType == "default"
                              ? "Энгийн"
                              : (data.user as UserModel)?.userType ==
                                "organization"
                              ? "Байгууллага"
                              : (data.user as UserModel)?.userType == "agent"
                              ? "Агент"
                              : (data.user as UserModel)?.userType
                          }
                          avatar={profileImgUrl(
                            (data.user as UserModel).profileImg
                          )}
                        />
                        {/* {user && user._id == data?.user?._id && (
                            <EditAd
                              images={images}
                              data={data}
                              setData={setData}
                              generalData={generalData}
                              setGeneralData={setGeneralData}
                              setImages={setImages}
                              onNext={async () => {
                                const f = new FormData();
                                f.append("title", data.title);
                                f.append("description", data.description);
                                f.append("filters", data.filters);
                                f.append("subCategory", data.subCategory._id);
                                f.append("category", data.category);
                                f.append("types", data.types);
                                f.append("adTypes", data.adType);
                                f.append("location", data.location);
                                let fImages = new FormData();
                                images?.map((prev) => {
                                  fImages.append("images", prev);
                                });
  
                                try {
                                  await axios
                                    .post(
                                      `${urls["test"]}/ad/uploadFields`,
                                      fImages,
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                          "Access-Control-Allow-Headers": "*",
                                        },
                                      }
                                    )
                                    .then((d) => f.append("images", d.data));
                                  await axios.put(
                                    `${urls["test"]}/ad/${data._id}`,
                                    f,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                        "Access-Control-Allow-Headers": "*",
                                        "Content-Type": "application/json",
                                        charset: "UTF-8",
                                      },
                                    }
                                  );
                                } catch (error) {}
                              }}
                            />
                          )} */}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Box>
              {/* <Estimator /> */}
              {/* {data && (
                  <ECalculator
                    data={parseInt(
                      data?.items?.filter((f) => f.id === "price")[0]?.value ??
                        "0"
                    )}
                  />
                )} */}
            </Box>
          </Box>
        </Stack>
      </MainContainer>

      <MainContainer py={"50px"}>
        <div className={mergeNames(STYLES.flexBetween, "flex-row")}>
          <Title
            variant={"mediumHeading"}
            className="text-sm font-bold uppercase md:text-lg"
          >
            Санал болгох зарууд
          </Title>

          <Box>
            <Select
              className="h-[30px] text-sm border-2 pr-3 border-blue-700 rounded-full"
              onChange={(e) => {
                if (e != null) {
                  setSuggestion(e);
                  getSuggestion(e);
                }
              }}
            >
              <Fragment>
                {(data?.subCategory as CategoryModel)?.suggestionItem?.map(
                  (sug, i) => {
                    let value = getSuggestionValue(sug);
                    return (
                      <option value={value?.id ?? ""} key={i}>
                        {value?.value ?? ""}
                      </option>
                    );
                  }
                )}
                <option value={"map"}>Газрын зургаар</option>
              </Fragment>
            </Select>
          </Box>
        </div>

        {suggestedAds != undefined ? (
          suggestion == "map" && suggestedAds!.limit > 0 ? (
            <GoogleMap
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
                suggestedAds?.ads?.map((m, i) => {
                  return (
                    <Flex dir="row" key={i}>
                      <MarkerF
                        position={{
                          lat: parseFloat(m.location?.lat ?? 47.74604),
                          lng: parseFloat(m.location?.lng ?? 107.341515),
                        }}
                        // onMouseOver={() => setMarkerActive(i)}
                        onMouseOver={() => setMarkerActive(i)}
                        onClick={() => setMarkerActive(i)}
                        animation={google.maps.Animation.DROP}
                      >
                        {markerActive == i && (
                          <InfoWindow
                            options={{
                              // maxWidth: "100%",
                              // width: "100%",
                              // minWidth: "100%",
                              // position: "relative",
                              zIndex: 120,
                            }}
                            position={{
                              lat: parseFloat(m.location?.lat ?? 47.74604),
                              lng: parseFloat(m.location?.lng ?? 107.341515),
                            }}
                          >
                            <MapCard data={m} />
                          </InfoWindow>
                        )}
                      </MarkerF>
                    </Flex>
                  );
                })}
            </GoogleMap>
          ) : suggestedAds.limit > 0 ? (
            <AdContent data={suggestedAds!} n={4} inCat={false} showLink="" />
          ) : (
            <NoAds data={0} />
          )
        ) : (
          <NoAds data={0} />
        )}
      </MainContainer>
    </Box>
  );
}
// 890
function AdButton({
  onClick,
  color,
  icon,
}: {
  onClick: () => void;
  icon: ReactElement;
  color?: string;
}) {
  return (
    <ActionIcon
      className="float-right bg-white border-2 border-gray-200 hover:text-blue-600"
      aria-label="Get link"
      onClick={onClick}
      // size={{ base: "xs", sm: "md" }}
      color={color}
    >
      {icon}
    </ActionIcon>
  );
}
