"use client";

import { getAdminAds } from "@/app/(api)/ad.api";
import { getUser } from "@/app/(api)/user.api";
import { useAppContext } from "@/app/_context";
import CustomToast from "@/components/customToast";
import { AdStatus, AdTypes, AdView } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import { UserModel } from "@/models/user.model";
import { brk, STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { imageApi } from "@/utils/values";
import { Button, Group, Radio } from "@mantine/core";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { SiVerizon } from "react-icons/si";

const SharedPage = () => {
  const [ads, setAds] = useState<{ ads: AdModel[]; limit: number }>({
    ads: [],
    limit: 0,
  });
  const [check, setCheck] = useState(AdStatus.checking);

  const [num, setNum] = useState(0);

  const router = useRouter();
  const page = 20;
  const [user, setUser] = useState<UserModel | null>(null);
  const getAds = async (status: AdStatus, n?: number, cate?: string) => {
    await getAdminAds(
      AdTypes.sharing,
      n ?? num,
      status,
      page,
      ads.limit,
      cate ?? ""
    ).then((d) => {
      if (d != null) {
        setAds(d);
      }
    });
    // await axios
    //   .get(`${urls["test"]}/ad/admin/sharing/${n ?? num}/${status}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((d) => {
    //     setAds(d.data);
    //     setData(d.data);
    //     let c = [],
    //       s = [];
    //     d.data?.ads?.map((ad) => {
    //       if (c.length > 0) {
    //         if (c.find((a) => a == ad.category.name) === undefined) {
    //           c.push(ad.category.name);
    //         }
    //       } else {
    //         c.push(ad.category.name);
    //       }
    //       if (s.length > 0) {
    //         if (s.find((a) => a == ad.subCategory.name) === undefined) {
    //           s.push(ad.subCategory.name);
    //         }
    //       } else {
    //         s.push(ad.subCategory.name);
    //       }
    //     });
    //     setCategory(c);
    //     setSubCategory(s);
    //   });
  };
  useEffect(() => {
    getAds(check);
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        setUser(JSON.parse(value));
      } else {
        const data = await getUser();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    };
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);
  useEffect(() => {
    if (user) {
      getAds(check);
    }
  }, [num]);

  const [content, setContent] = useState("");
  const [collapsedId, setCollapsed] = useState(false);

  const [expand, setExpand] = useState(0);
  const verify = async (id: string, view: AdView) => {
    // try {
    //   await axios
    //     .get(
    //       `${urls["test"]}/ad/update/${id}/created/${view}/{message}?message=%20`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Access-Control-Allow-Headers": "*",
    //         },
    //       }
    //     )
    //     .then((d) => {
    //       toast({
    //         title: `${d?.data?.num ?? ""}-р зарыг нэмлээ.`,
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //       });
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const deleteAd = async (id: string) => {
    // await fetch(
    //   `${urls["test"]}/ad/update/${id}/deleted/hide/{message}?message=%20`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Access-Control-Allow-Headers": "*",
    //     },
    //   }
    // ).then((d) => {
    //   toast({
    //     title: `${d?.data?.num ?? ""} Зарыг устгалаа.`,
    //     status: "warning",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // });
  };
  return (
    <Fragment>
      <div className="flex flex-row p-5 min-h-[60vh]">
        <div className="p-5 ">
          <div
            className={mergeNames(
              "flex flex-col justify-between gap-4 mt-5 mb-5",
              brk
            )}
          >
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
            <Group className="flex flex-col justify-end" defaultValue="2">
              <Radio
                label="Нэмсэн зарууд"
                color="green"
                className="font-bold text-green-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds(AdStatus.created, 0);
                    setCheck(AdStatus.created);
                    setNum(0);
                  }
                }}
                value="1"
              />

              <Radio
                color="yellow"
                label="Шалгагдаж байгаа зарууд"
                className="font-bold text-yellow-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds(AdStatus.checking, 0);
                    setNum(0);
                    setCheck(AdStatus.checking);
                  }
                }}
                value="2"
              />
            </Group>
          </div>
          <div className="w-full overflow-scroll">
            <table color="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-fixed">
              <thead>
                <tr>
                  <th className="w-[30px]">Дугаар</th>
                  <th>Гарчиг</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th>Зарын төрөл</th>
                  <th>Зарын статус</th>
                  <th>Зөвшөөрөх</th>
                  <th>Файл</th>
                  {/* <th>Зөвшөөрөх</th> */}
                  <th>Үйлдэл</th>
                  {/* <th>Засах</th> */}
                </tr>
              </thead>
              <tbody>
                {ads?.ads?.map((a, i) => {
                  //   let adData = { ...a };
                  return (
                    <tr key={i}>
                      <td className="w-[30px]">{a.num}</td>
                      <td className="truncate ...">
                        {/* {a.title} */}
                        {/* <button
                          className={mergeNames(STYLES.blueButton)}
                          onClick={() => router.push(`/product/${a.num}`)}
                        >
                          Орох
                        </button> */}
                        <Link
                          as="a"
                          className={mergeNames(
                            STYLES.blueButton,
                            "text-sm h-[30px]"
                          )}
                          target="_blank"
                          href={`/ad/${a.num}`}
                          // onClick={() => router.push(`/product/${a.num}`)}
                        >
                          <a target="_blank">Орох</a>
                        </Link>
                      </td>
                      <td className="truncate ...">{a.description}</td>
                      <td>{a.adType}</td>
                      <td
                        className={mergeNames(
                          "truncate ...",
                          //   a.adStatus == AdStatus.special ? "text-yellow-400" : ''
                          a.adStatus == AdStatus.checking
                            ? "text-yellow-400"
                            : ""
                        )}
                      >
                        {a.adStatus}
                      </td>
                      <td>
                        <Link target="_blank" href={`${imageApi}${a.file}`}>
                          Файл
                        </Link>
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
                                // status="error"
                                className={mergeNames(
                                  STYLES.button,
                                  "bg-teal-500 justify-center w-7 h-7 "
                                )}
                                toastH="Амжилттай нэмэгдлээ"
                                onClick={() => verify(a._id, a.view)}
                                status="error"
                                toastBtn={<SiVerizon />}
                              />
                            )}

                            <button
                              onClick={() => deleteAd(a._id)}
                              className={mergeNames(
                                STYLES.button,
                                "bg-yellow-500 w-7 h-7 justify-center"
                              )}
                            >
                              <BiEdit />
                            </button>
                            <CustomToast
                              // status="error"
                              className={mergeNames(
                                STYLES.button,
                                "bg-red-500 w-7 h-7 justify-center"
                              )}
                              toastH="Амжилттай устгагдлаа"
                              onClick={() => deleteAd(a._id)}
                              status="error"
                              toastBtn={<MdDelete />}
                            />
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
              {ads.limit >= page && (
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
        </div>
      </div>
    </Fragment>
  );
};
export default SharedPage;
