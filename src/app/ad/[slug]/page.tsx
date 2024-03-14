"use client";
import {
  Box,
  Button,
  GridItem,
  HStack,
  IconButton,
  Image,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, {
  Fragment,
  ReactElement,
  ReactNode,
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

import mergeNames, { getSellType } from "@/utils/functions";
// import ProductInfoValue from "@/components/createAd/product/productInfoValue";
import { FiltersContainer } from "@/components/createAd/step4/filter";
import { AppProps } from "next/app";
import ScrollTop from "@/components/global/scrollTop";
import MainContainer from "@/components/containers/mainContainer";
import Engage from "@/components/product/engage";
import { GeneralDataType } from "@/utils/type";
import { GoogleMapsOptions, api } from "@/utils/values";
import ProductInfoValue from "@/components/createAd/product/productInfoValue";
import { ItemModel } from "@/models/items.model";
import { ItemTypes } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import { getAdById } from "@/app/(api)/ad.api";
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

export const ProductInfo = ({
  title,
  value,
  id,
  children,
  href = false,
  type = "",
  tt = "capitalize",
  func = () => {},
  setEditData,
  edit = false,
  editData,
  classnames,
  admin,
  cateId,
  editFunc = () => {},
}: {
  title: string;
  value: string;
  id?: string;
  children?: ReactNode;
  href?: boolean;
  type?: string;
  tt?: string;
  func?: () => void;
  setEditData?: any;
  edit?: boolean;
  editData?: any;
  classnames?: string;
  admin?: any;
  cateId?: any;
  editFunc?: () => void;
}) => {
  const [localData, setData] = useState<ItemModel>();
  const [other, setOther] = useState(false);

  let dummy = { ...editData };
  return (
    <Fragment>
      {href && (
        <p
          className={mergeNames(
            id === "price"
              ? "mt-3 text-xl font-bold col-span-full block"
              : "hidden"
          )}
        >
          Бусад мэдээлэл
        </p>
      )}
      <GridItem
        className={mergeNames(
          title.length > 30
            ? "product__info col-span-full md:col-span-2 lg:col-span-1 row-start-1"
            : "product__info",
          "bg-white shadow rounded-md",
          classnames ?? ""
        )}
      >
        <Stack
          direction={"row"}
          className={mergeNames("p-2 rounded-md")}
          onClick={href ? () => {} : func}
        >
          <div className="flex flex-col w-full pl-2 text-left sm:pl-5">
            <Text fontSize={{ base: "13px", xl: "15px" }}>{title}: </Text>
            {!localData && (
              <ProductInfoValue
                href={href}
                id={id ?? ""}
                value={value}
                cateId={cateId}
              />
            )}

            {localData && (
              <FiltersContainer
                selectedOther={other}
                other={localData.other ?? false}
                value={localData.value}
                name={localData.name}
                defValue={value}
                types={localData.types}
                ph={value}
                label={value}
                onChange={(e) => {
                  if (typeof e == "string" || typeof e == "number") {
                    dummy?.filters.map((df: any) => {
                      if (df.type == localData.type) {
                        df.input = e;
                      }
                    });
                    if (!admin) {
                      setEditData(dummy);
                    }
                  } else {
                    dummy?.filters.map((df: any) => {
                      if (df.type == localData.type) {
                        df.input = e;
                      }
                    });
                    if (!admin) {
                      setEditData(dummy);
                    }
                  }
                }}
                Item={({
                  data,
                  onClick,
                  id,
                  ...props
                }: {
                  data: any;
                  onClick: any;
                  id: any;
                  props: any;
                }) => {
                  return (
                    <button
                      {...props}
                      onClick={() => {
                        if (data == "Бусад") {
                          setOther(true);
                        } else {
                          setOther(false);
                          dummy?.filters.map((df: any) => {
                            if (df.type == localData.type) {
                              df.input = data;
                            }
                          });
                          if (!admin) {
                            setEditData(dummy);
                          }
                        }
                        onClick();
                      }}
                    >
                      {data}
                      {/* {props.children} */}
                    </button>
                  );
                }}
              />
            )}
          </div>
          {edit && (
            <Button
              onClick={async () => {
                if (type != "sellType") {
                  // await axios.get(`${urls["test"]}/items/${type}`).then((d) => {
                  //   setData(d.data);
                  // });
                } else {
                  setData({
                    value: [
                      {
                        id: "sell",
                        value: "Зарах",
                      },
                      {
                        id: "rent",
                        value: "Түрээслүүлэх",
                      },
                      {
                        id: "sellRent",
                        value: "Зарах, түрээслүүлэх",
                      },
                    ],
                    name: "Борлуулах төрөл",
                    types: ItemTypes.dropdown,
                    type: type,
                  });
                }
              }}
            >
              edit
            </Button>
          )}
        </Stack>
      </GridItem>
    </Fragment>
  );
};

export default function AdDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [data, setData] = useState<AdModel>();

  const toast = useToast();
  const router = useRouter();
  const {
    mark,
    setMark,
    user,
    setUser
  }: {
    user: UserModel,
    mark: number[];
    setMark: React.Dispatch<React.SetStateAction<number[]>>;
    setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [suggestion, setSuggestion] = useState("map");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
    libraries: GoogleMapsOptions.libraries,
  });
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
    console.log(user);
    if (!user)
      {
        toast({
          title: "Та нэвтэрнэ үү",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return
      }
    if (!loading) {
      try {
        setLoading(true);
        const body = mark.filter((m) => m != id);
        const was = body.length != mark.length;
        setMark((prev) => (!was ? [...prev, id] : body));
        was
          ? toast({
              title: "Зар хүслээс хасагдлаа.",
              status: "warning",
              duration: 5000,
              isClosable: true,
            })
          : toast({
              title: "Зар хүсэлд нэмэгдлээ.",
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
      lat: parseFloat(data?.location?.lat?.toString() ?? "47.91887307876936"),
      lng: parseFloat(data?.location?.lng?.toString() ?? "106.91757202148438"),
    }),
    []
  );
  // const getSuggestion = async (suggest, sd) => {
  //   if (suggest != "map") {
  //     try {
  //       if (sd?.subCategory?._id) {
  //         await axios
  //           .post(`${urls["test"]}/ad/suggestion/${sd?.subCategory?._id}/1`, {
  //             items: [
  //               {
  //                 id: suggest,
  //                 value: sd.items.filter((s) => s.id == suggest)[0].value,
  //               },
  //             ],
  //             types: [],
  //           })
  //           .then((d) => {
  //             setsData([]);
  //             console.log(d.data);
  //             let ads = d.data?.ads?.filter((da) => da._id != sd._id);
  //             setsData({ limit: ads.length, ads: ads });
  //           });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     try {
  //       await axios
  //         .get(`${urls["test"]}/ad/category/${sd?.subCategory?.href}/0`)
  //         .then((d) => {
  //           setCategoryAds(d.data.defaultAds.ads.concat(d.data.specialAds.ads));
  //         });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const getData = async () => {
    await getAdById(params.slug).then((d) => setData(d));
  };

  useEffect(() => {
    if (params.slug) getData();
  }, []);
  // const [open, setOpen] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.toString());
    toast({
      title: `Холбоосыг хуулж авлаа`,
      status: "info",
      isClosable: true,
      duration: 1500,
    });
  };

  return (
    <Box m={2} as="section" id="main__product">
      <ScrollTop />

      <MainContainer>
        <Stack direction={"row"} py={2} gap={3} pos="relative">
          <Box maxWidth={"100%"} flex="0 0 100%" borderRadius="5px">
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
                      id={(data.user as UserModel)._id ?? ""}
                      email={(data.user as UserModel).email}
                      username={(data.user as UserModel)?.username}
                      phone={
                        data.items?.filter((f) => f.id == "phone")[0].value
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
                      avatar={
                        (data.user as UserModel)?.profileImg ??
                        "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                      }
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
                            original: `${api}${i}`,
                            thumbnail: `${api}${i}`,
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
                              Icon={(props: any) => {
                                switch (p.id) {
                                  case "room":
                                    return (
                                      <BiDoorOpen
                                        {...props}
                                        text=""
                                        className="text-xl"
                                      />
                                    );
                                  case "area":
                                    return <BiArea {...props} text="" />;
                                  case "masterBedroom":
                                    return (
                                      <IoBedOutline
                                        {...props}
                                        text=""
                                        className="text-xl"
                                      />
                                    );
                                  case "bathroom":
                                    return (
                                      <TbBath
                                        {...props}
                                        text=""
                                        className="text-xl"
                                      />
                                    );
                                  default:
                                    return;
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
                          id={(data.user as UserModel)._id!}
                          email={(data.user as UserModel).email}
                          username={(data.user as UserModel)?.username}
                          phone={
                            data.items?.filter((f) => f.id == "phone")[0].value
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
                          avatar={
                            (data.user as UserModel)?.profileImg ??
                            "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
                          }
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
      {/*      
          <MainContainer py={"50px"}>
            <div className={mergeNames(STYLES.flexBetween, "flex-row")}>
              <h1
                variant={"mediumHeading"}
                className="text-sm font-bold uppercase md:text-lg"
              >
                Санал болгох зарууд
              </h1>
        
              <Box>
                <Select
                  className="h-[30px] text-sm border-2 pr-3 border-blue-700 rounded-full"
                  onChange={(e) => {
                    setSuggestion(e.target.value);
                    getSuggestion(e.target.value, data);
                  }}
                >
                  <Fragment>
                    {data?.subCategory?.suggestionItem?.map((sug, i) => {
                      return getSuggestionValue(sug, i);
                    })}
                    <option value={"map"}>Газрын зургаар</option>
                  </Fragment>
                </Select>
              </Box>
         
            </div>
            {suggestion == "map" && categoryAds?.length > 0 ? (
              <GoogleMap
                options={mapOptions}
                onClick={(e) => {
                  // setMap(e.latLng.toJSON());
                  console.log(e.latLng.toJSON());
                }}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: "100%", height: "50vh" }}
              >
                {isLoaded &&
                  categoryAds?.map((m, i) => {
                    return (
                      <HStack key={i}>
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
                              position={{
                                lat: parseFloat(m.location?.lat ?? 47.74604),
                                lng: parseFloat(m.location?.lng ?? 107.341515),
                              }}
                              options={{
                                maxWidth: "100%",
                                width: "100%",
                                minWidth: "100%",
                                position: "relative",
                                zIndex: 120,
                              }}
                            >
                              <MapCard data={m} />
                            
                            </InfoWindow>
                          )}
                        </MarkerF>
                      </HStack>
                    );
                  })}
              </GoogleMap>
            ) : (
              sData?.ads?.length > 0 && <AdContent data={sData} n={10} />
            )}
          </MainContainer> */}
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
    <IconButton
      className="float-right bg-white border-2 border-gray-200 hover:text-blue-600"
      aria-label="Get link"
      icon={icon}
      onClick={onClick}
      size={{ base: "xs", sm: "md" }}
      color={color}
    />
  );
}
