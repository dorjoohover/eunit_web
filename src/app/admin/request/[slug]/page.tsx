"use client";

import { getAdminAds, updateAdStatus } from "@/app/(api)/ad.api";
import FilterAd from "@/components/account/details/filterAd";
import CustomToast from "@/components/customToast";
import { LoadingButton } from "@/components/global/button";
import CustomModal from "@/components/global/customModal";
import { AdStatus, AdTypes, AdView, Api, ItemPosition } from "@/config/enum";
import { AdItemsModel, AdModel } from "@/models/ad.model";
import { CategoryModel } from "@/models/category.model";
import { STYLES, brk } from "@/styles";
import mergeNames from "@/utils/functions";
import { FetchAdUnitType, GoogleMapsType } from "@/utils/type";
import {
  Box,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { SiVerizon } from "react-icons/si";

import { utils, writeFileXLSX } from "xlsx";
import WhiteBox from "@/components/createAd/product/whiteBox";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { ConstantApi, GoogleMapsOptions, imageApi } from "@/utils/values";
import ProductInfo from "@/components/createAd/product/info";
import { ErrorMessages } from "@/utils/string";
import { useAppContext } from "@/app/_context";
import { FaCcAmazonPay } from "react-icons/fa";
import { getConstants } from "@/app/(api)/constants.api";

export default function RequestDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [ads, setAds] = useState<FetchAdUnitType>({ ads: [], limit: 0 });
  const [data, setData] = useState<AdModel>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useAppContext();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
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
  const mapCenter = useMemo<GoogleMapsType>(
    () =>
      ({
        lat: data?.location?.lat ?? 47.91887307876936,
        lng: data?.location?.lng ?? 106.91757202148438,
      } as GoogleMapsType),
    []
  );
  const [check, setCheck] = useState<AdStatus>(AdStatus.all);
  const [category, setCategory] = useState<{
    category: CategoryModel[];
    subCategory: CategoryModel[];
  }>();

  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();

  const getAds = async (status: AdStatus, n?: number, cate?: string) => {
    await getAdminAds(AdTypes.all, n ?? num, status, 20, 0, cate ?? "").then(
      (d) => {
        console.log(d)
        if (d != null) {
          setAds(d);
        }
      }
    );
  };
  const getCategories = async () => {
    await getConstants(`${ConstantApi.category}false`, Api.GET).then((d) =>
      setCategory({
        category: d as CategoryModel[],
        subCategory: d?.[0].subCategory,
      })
    );
  };
  useEffect(() => {
    getAds(AdStatus.all);
    getCategories();
  }, []);
  const verify = async (id: string) => {
    const res = await updateAdStatus(id, AdStatus.created, AdView.show, "%20");
    res > -1
      ? toast({
          title: `${res ?? ""}-р зарыг нэмлээ.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      : toast({
          title: ErrorMessages.tryAgain,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
  };
  const deleteAd = async (id: string) => {
    const res = await updateAdStatus(id, AdStatus.deleted, AdView.hide, "%20");
    res > -1
      ? toast({
          title: `${res ?? ""} Зарыг устгалаа.`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        })
      : toast({
          title: ErrorMessages.tryAgain,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
  };
  const getSheetData = (data: string) => {
    // let fields = Object.keys(data[0]);
    // let sheetData = data.map((row) => {
    //   return fields.map((field) => {
    //     return row[field] ? row[field] : "";
    //   });
    // });
    // return sheetData;
  };
  // const exportExcel = async () => {
  //   const res = await axios.get(`${urls["test"]}/ad/json/all`);

  //   const wb = utils.book_new();
  //   res.data.map((item) => {
  //     item.ads.map((ad) => {
  //       let num = ad["num"];
  //       ad["num"] = `=HYPERLINK("http://eunit.vercel.app/ad/${num}","link")`;
  //     });
  //     let ws = utils.json_to_sheet(item.ads);
  //     utils.book_append_sheet(wb, ws, item.id);
  //   });
  //   writeFileXLSX(wb, "all.xlsx");
  // };

  const adStatusChecker = async () => {
    // getAds;
  };
  const [expand, setExpand] = useState(0);
  const view = (item: AdModel) => {
    onOpen();
    setData(item);
  };
  return (
    <Fragment>
      <div className="flex flex-row justify-center p-5 min-h-[60vh]">
        <div className="p-5 ">
          {/* <Text>Zariin dugaar: {a.num}</Text>
            <Button onClick={() => verify(a._id)}>verify</Button>
              <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}

          <div className={mergeNames("flex flex-col gap-4 mt-5", brk)}>
            <div className="flex w-full gap-4">
              {/* <FilterAd
                plc="Бүх төрөл"
                onChange={(e) => {
                  if (e != "") {
                    getAds(check, 0, e);
                  } else {
                    getAds(check);
                  }
                }}
              >
                {category?.category?.map((p, i) => {
                  return (
                    <option value={p._id} key={i}>
                      {p.name}
                    </option>
                  );
                })}
              </FilterAd> */}
              <FilterAd
                plc="Бүх дэд төрөл"
                onChange={(e) => {
                  if (e != "") {
                    getAds(check, 0, e);
                  } else {
                    getAds(check);
                  }
                }}
              >
                {category?.subCategory?.map((p, i) => {
                  return (
                    <option value={p._id} key={i}>
                      {p.name}
                    </option>
                  );
                })}
              </FilterAd>
            </div>
            <RadioGroup className="flex flex-col justify-end" defaultValue="0">
              <Radio
                colorScheme="blue"
                className="font-bold text-green-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds(AdStatus.all, 0);
                    setCheck(AdStatus.all);
                    setNum(0);
                  }
                }}
                value="0"
              >
                Бүх зарууд
              </Radio>
              <Radio
                colorScheme="green"
                className="font-bold text-green-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds(AdStatus.created, 0);
                    setCheck(AdStatus.created);
                    setNum(0);
                  }
                }}
                value="1"
              >
                Нэмсэн зарууд
              </Radio>
              <Radio
                colorScheme="yellow"
                className="font-bold text-yellow-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds(AdStatus.pending, 0);
                    setNum(0);
                    setCheck(AdStatus.pending);
                  }
                }}
                value="2"
              >
                Хүлээгдэж байгаа
              </Radio>
              <Radio
                colorScheme="cyan"
                className="font-bold text-primary whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds(AdStatus.returned);
                    setCheck(AdStatus.returned);
                  }
                }}
                value="3"
              >
                Буцаагдсан зар
              </Radio>
            </RadioGroup>
          </div>
          <div className="w-full overflow-scroll">
            {ads?.ads && (
              <Link
                href={"https://excel-export-nextjs.vercel.app/"}
                target="_blank"
              >
                <button className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md">
                  Excel татах
                </button>
              </Link>
            )}
            <table className="w-full p-2 text-sm text-left border border-gray-400 table-auto">
              <thead>
                <tr>
                  <th className="w-[10%]">Дугаар</th>
                  <th>Гарчиг</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th className="w-1/2">Зарын дэлгэрэнгүй</th>
                  <th>Зарын статус</th>
                  <th>Зөвшөөрөх</th>
                  <th>Үйлдэл</th>
                  {/* <th>Засах</th> */}
                </tr>
              </thead>
              <tbody>
                {ads?.ads?.map((a, i) => {
                  let adData = { ...a };
                  return (
                    <tr key={i}>
                      <td width="10%" className="flex justify-between">
                        {a.num}{" "}
                        <Button
                          className={mergeNames(
                            STYLES.blueButton,
                            "text-sm h-[30px] px-2 py-1"
                          )}
                          onClick={() => view(a)}
                        >
                          Үзэх
                        </Button>
                      </td>
                      <td className="truncate ...">{a.title}</td>
                      <td className="w-1/2 truncate ... ">
                        {a.description.slice(0, 75)}
                      </td>
                      <td
                        className={mergeNames(
                          "truncate ... font-bold",
                          a.adType == AdTypes.special ? "text-purple-900" : "",
                          a.adType == AdTypes.default ? "text-primary" : ""
                        )}
                      >
                        {a.adType}
                      </td>
                      <td
                        className={mergeNames(
                          "truncate ... font-bold",
                          a.adStatus == AdStatus.returned
                            ? "text-yellow-400"
                            : "",
                          a.adStatus == AdStatus.created
                            ? "text-green-500"
                            : "",
                          a.adStatus == AdStatus.pending
                            ? "text-yellow-500"
                            : "",
                          a.adStatus == AdStatus.checking ? "text-primary" : ""
                        )}
                      >
                        {a.adStatus}
                      </td>
                      <td>
                        <div
                          className={mergeNames(
                            "flex flex-row justify-between"
                            // 'p-2 rounded-md bg-white',
                          )}
                        >
                          <button
                            onClick={() => {
                              if (expand == 0) {
                                setExpand(i + 1);
                              } else {
                                setExpand(0);
                              }
                            }}
                            className="float-left mx-0 text-lg text-black -rotate-90"
                          >
                            <MdOutlineArrowDropDownCircle
                              className={mergeNames(
                                expand == i + 1 ? "text-blue-600 " : ""
                              )}
                            />
                          </button>
                          <div
                            className={mergeNames(
                              expand == i + 1 ? "flex" : "hidden",
                              "justify-center  flex-end  gap-2"
                            )}
                            onClick={() => {
                              setExpand(0);
                            }}
                          >
                            {a.adStatus != "created" && (
                              <CustomToast
                                className={mergeNames(
                                  STYLES.button,
                                  "bg-teal-500 justify-center w-7 h-7 "
                                )}
                                toastH="Хүсэлт явлаа"
                                onClick={() => verify(a._id)}
                                status="warning"
                                toastBtn={<SiVerizon />}
                              />
                            )}

                            <CustomToast
                              className={mergeNames(
                                STYLES.button,
                                "bg-red-500 w-7 h-7 justify-center"
                              )}
                              toastH="Хүсэлт явлаа"
                              onClick={() => deleteAd(a._id)}
                              status="warning"
                              toastBtn={<MdDelete />}
                            />

                            {/* <EditAd
                              setData={setAds}
                              ads={ads}
                              data={a}
                              admin={true}
                              onNext={async () => {
                                await axios
                                  .put(`${urls['test']}/ad/${a._id}`, a, {
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                      'Access-Control-Allow-Headers': '*',
                                      'Content-Type': 'application/json',
                                      charset: 'UTF-8',
                                    },
                                  })
                                  .then((d) => console.log(d.data));
                              }}
                            >
                              <BiEdit />
                            </EditAd>  */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <ul className="flex float-right list-style-none">
              {num > 0 && (
                <li className="mx-2">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      let n = num - 1;
                      getAds(check, n);
                    }}
                  >
                    Өмнөх
                  </button>
                </li>
              )}
              {ads.limit == 20 && (
                <li className="mx-2">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      let n = num + 1;
                      setNum(n);
                      getAds(check, n);
                    }}
                  >
                    Дараах
                  </button>
                </li>
              )}
            </ul>
          </div>
          <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            btnOpen={<></>}
            className=""
            onclick={() => {}}
            btnClose={<LoadingButton text="any" isLoading={false} />}
            btnClose2="Буцах"
            header="Нэгтгэсэн мэдээлэл"
          >
            <Box maxWidth={"100%"} flex="0 0 100%" borderRadius="5px">
              <div className="flex flex-col w-full p-3 shadow-md gap-7 bg-bgGrey md:p-10 rounded-xl">
                {/*Product */}
                {data?.title && (
                  <Heading variant={"mediumHeading"} mb={5} onClick={() => {}}>
                    {data.title}
                  </Heading>
                )}
                <Box
                  className={mergeNames(
                    "product__image",
                    "border-2 border-blue-900/20 shadow-md gallery"
                  )}
                  onClick={() => {}}
                >
                  {data?.images ? (
                    <ImageGallery
                      thumbnailPosition="left"
                      showNav={false}
                      showFullscreenButton={false}
                      items={data?.images?.map((i) => ({
                        original: `${imageApi}${i}`,
                        thumbnail: `${imageApi}${i}`,
                        loading: "lazy",
                        thumbnailLoading: "lazy",
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
                  {(data?.items as AdItemsModel[])?.map((p, i) => {
                    if (p.position == ItemPosition.location) {
                      // return <></>
                      return (
                        <ProductInfo
                          key={i}
                          title={p.name}
                          id={p.id ?? ""}
                          value={p.value}
                          func={() => {
                            onClose();
                          }}
                          href={false}
                        />
                      );
                    }
                  })}
                </WhiteBox>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <WhiteBox
                    // heading={sharing ? "Pdf file нэр" : "Зарын дэлгэрэнгүй"}
                    heading={"Зарын дэлгэрэнгүй"}
                    className="flex flex-col gap-3 "
                  >
                    <Text
                      className="text-[#5c727d] whitespace-pre-line"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      {data?.description ?? ""}
                      {/* {sharing ? data?.file?.[0]?.name : data?.desc} */}
                    </Text>
                  </WhiteBox>
                  <WhiteBox heading="Газрын зураг">
                    {isLoaded && (
                      <GoogleMap
                        onClick={() => {
                          onClose();
                        }}
                        options={mapOptions}
                        zoom={14}
                        center={mapCenter}
                        mapTypeId={google.maps.MapTypeId.ROADMAP}
                        mapContainerStyle={{ width: "100%", height: "30vh" }}
                      >
                        {{
                          lat: data?.location?.lat ?? mapCenter?.lat,
                          lng: data?.location?.lng ?? mapCenter?.lng,
                        } && (
                          <div>
                            <MarkerF
                              position={{
                                lat: parseFloat(
                                  data?.location?.lat ??
                                    mapCenter?.lat.toString()
                                ),
                                lng: parseFloat(
                                  data?.location?.lng ??
                                    mapCenter?.lng.toString()
                                ),
                              }}
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
                    {(data?.items as AdItemsModel[])?.map((p, i) => {
                      if (p.position == ItemPosition.side || p.id == "area") {
                        // return <></>
                        return (
                          <ProductInfo
                            key={i}
                            title={p.name}
                            id={p.id ?? ""}
                            value={p.value}
                            func={() => {
                              onClose();
                            }}
                            href={false}
                          />
                        );
                      }
                    })}
                    {(data?.items as AdItemsModel[])?.map((p, i) => {
                      if (p.position == ItemPosition.default) {
                        // return <></>
                        return (
                          <ProductInfo
                            key={i}
                            title={p.name}
                            id={p.id ?? ""}
                            value={p.value}
                            func={() => {
                              onClose();
                            }}
                            href={false}
                          />
                        );
                      }
                    })}
                  </WhiteBox>
                )}
              </div>
            </Box>
          </CustomModal>
        </div>
      </div>
    </Fragment>
  );
}
