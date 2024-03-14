import { brk, radioGroup } from "@/styles/index";
import mergeNames from "@/utils/functions";

import { Radio, RadioGroup, Spinner, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import FilterAd from "./details/filterAd";
import { FetchAdUnitType } from "@/utils/type";
import { CategoryModel } from "@/models/category.model";
import Alerting from "../global/alert";
import AdCard from "../ad/card";
import { AdStatus, AdTypes } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import CustomPagination from "../global/customPagination";

const MyAds = ({
  userAds,
  loading,
  ads,
  getAds,

  setAds,
  category,
  subCategory,
}: {
  setAds: React.Dispatch<React.SetStateAction<FetchAdUnitType>>;
  userAds: number;
  loading: boolean;
  ads: FetchAdUnitType;
  getAds: (status: AdStatus, id?: string, n?: number) => void;
  category?: CategoryModel[];
  subCategory?: CategoryModel[];
}) => {
  const [num, setNum] = useState(0);
  const [check, setCheck] = useState(AdStatus.created);
  const [type, setType] = useState("");

  const toast = useToast();




  const restoreAd = async (id: string) => {
    //   try {
    //     if (token) {
    //       await axios
    //         .get(
    //           `${
    //             urls["test"]
    //           }/ad/update/${id}/pending/show/{message}?message=${" "}`,
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               "Access-Control-Allow-Headers": "*",
    //             },
    //           }
    //         )
    //         .then((d) => {
    //           toast({
    //             title: "Зар сэргээгдлээ.",
    //             status: "success",
    //             duration: 5000,
    //             isClosable: true,
    //           });
    //           router.reload();
    //         });
    //     }
    //   } catch (error) {}
  };
  const deleteAd = async (id: string) => {
    //   try {
    //     if (token) {
    //       await axios
    //         .get(
    //           `${
    //             urls["test"]
    //           }/ad/update/${id}/deleted/hide/{message}?message=${" "}`,
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               "Access-Control-Allow-Headers": "*",
    //             },
    //           }
    //         )
    //         .then((d) => {
    //           toast({
    //             title: "Зар устгагдлаа.",
    //             status: "warning",
    //             duration: 5000,
    //             isClosable: true,
    //           });
    //           router.reload();
    //         });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
  };
  const changeAdType = (id: string, status: AdStatus) => {
    //   console.log(status);
    //   if (status != "created") {
    //     toast({
    //       title:
    //         "Уучлаарай таны зарыг VIP зар болгох боломжтой байна. Та түр хүлээнэ үү.",
    //       status: "warning",
    //       duration: 5000,
    //       isClosable: true,
    //     });
    //     return;
    //   }
    //   if (type != undefined) {
    //     setAdType(id, type, "").then((d) => {
    //       if (d.data) {
    //         toast({
    //           title: "Амжилттай.",
    //           status: "success",
    //           duration: 2000,
    //           isClosable: true,
    //         });
    //         router.reload(), setType();
    //       } else {
    //         toast({
    //           title: "Таны eunit оноо хүрэлцэхгүй байна та дансаа цэнэглэнэ үү.",
    //           status: "warning",
    //           duration: 5000,
    //           isClosable: true,
    //         });
    //       }
    //     });
    //   } else {
    //     toast({
    //       title: "Та төрлөө сонгоно уу.",
    //       status: "warning",
    //       duration: 2000,
    //       isClosable: true,
    //     });
    //   }
  };
  const filterAd = (e: string) => {
    if (e != "") {
      getAds(check, e, 0);
    } else {
      getAds(check);
    }
  };
  return (
    <>
      <div className={mergeNames("flex flex-col gap-4 mt-5", brk)}>
        <div className="flex flex-col w-full">
          <div className="flex gap-4">
            <FilterAd plc="Бүх төрөл" onChange={(e) => filterAd(e)}>
              {category?.map((p, i) => {
                return (
                  <option value={p._id} key={i}>
                    {p.name}
                  </option>
                );
              })}
            </FilterAd>
            <FilterAd plc="Бүх дэд төрөл" onChange={(e) => filterAd(e)}>
              {subCategory?.map((p, i) => {
                return (
                  <option value={p._id} key={i}>
                    {p.name}
                  </option>
                );
              })}
            </FilterAd>
          </div>

          <RadioGroup
            className={mergeNames(radioGroup)}
            size={"sm"}
            value={check}
          >
            <Radio
              colorScheme="green"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds(AdStatus.created, undefined, 0);
                  setCheck(AdStatus.created);
                }
              }}
              value={AdStatus.created}
            >
              Нэмсэн зарууд
            </Radio>
            <Radio
              colorScheme="yellow"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds(AdStatus.pending, undefined, 0);
                  setCheck(AdStatus.pending);
                }
              }}
              value={AdStatus.pending}
            >
              Хүлээгдэж байгаа
            </Radio>
            <Radio
              onChange={(e) => {
                if (e.target.checked) {
                  getAds(AdStatus.returned);
                  setCheck(AdStatus.returned);
                }
              }}
              value={AdStatus.returned}
            >
              Буцаагдсан зар
            </Radio>
            <Radio
              colorScheme="red"
              onChange={(e) => {
                if (e.target.checked) {
                  getAds(AdStatus.deleted, undefined, 0);
                  setCheck(AdStatus.deleted);
                }
              }}
              value={AdStatus.deleted}
            >
              Устгасан зар
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <Alerting />
      <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1 ">
        {!loading &&
          ads?.ads?.map((item, key) => {
            return (
              <AdCard
                setType={setType}
                admin={true}
                key={key}
                changeAd={() => {
                  // stopPropagation(e);
                  changeAdType(item._id, item.adStatus);
                }}
                item={item || {}}
                isDelete={true}
                deleteFunc={() => {
                  if (item.adStatus == AdStatus.deleted) {
                    restoreAd(item._id);
                  } else {
                    deleteAd(item._id);
                  }
                }}
              />
            );
          })}
      </div>

      {!loading && <NoAds data={ads?.ads} />}
      {loading && (
        <div className="min-h-[20vh] md:min-h-[40vh] h-full flex justify-center items-center w-full text-xl">
          {<Spinner />}
        </div>
      )}
      {!loading && ads?.limit > 12 && (
        <CustomPagination
          num={num}
          prev={() => {
            if (num > 0) {
              let n = num - 1;
              getAds(check, undefined, n);
            }
          }}
          next={() => {
            if (userAds > 12) {
              let n = num + 1;
              setNum(n);
              getAds(check, undefined, n);
            }
          }}
        />
      )}
      {/* <ul className="flex float-right list-style-none">
        <li className="mx-2">
          <button
            className={mergeNames(num > 0 ? STYLES.active : STYLES.notActive)}
            onClick={() => {
              if (num > 0) {
                let n = num - 1;
                getAds(check, n);
              }
            }}
          >
            Өмнөх
          </button>
        </li>

        <li className="mx-2">
          <button
            className={mergeNames(STYLES.notActive)}
            onClick={() => {
              if (user?.length > 12) {
                let n = num + 1;
                setNum(n);
                getAds(check, n);
              }
            }}
          >
            Дараах
          </button>
        </li>
      </ul> */}
    </>
  );
};

export default MyAds;

export const NoAds = ({
  data = [],
  info = "Зар байхгүй байна",
}: {
  data: AdModel[];
  info?: string;
}) => {
  return (
    <>
      {data.length == 0 && (
        <div className="min-h-[20vh] md:min-h-[40vh] h-full flex justify-center items-center w-full text-xl">
          {info}
        </div>
      )}
    </>
  );
};
