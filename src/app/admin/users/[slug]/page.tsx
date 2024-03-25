"use client";

import { getUsers, updateUserStatus } from "@/app/(api)/user.api";
import CustomToast from "@/components/customToast";
import { UserStatus, UserType } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { ErrorMessages } from "@/utils/string";
import { imageApi } from "@/utils/values";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete, MdOutlineArrowDropDownCircle } from "react-icons/md";
import { SiVerizon } from "react-icons/si";

export default function UsersDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [users, setUser] = useState<UserModel[]>([]);

  const [num, setNum] = useState(0);
  const toast = useToast();
  const router = useRouter();
  let dummy = [];
  const getData = async () => {
    getUsers().then((d) => {
      if (typeof d != "boolean") {
        if (params?.slug == "organization") {
          setUser(d.filter((u) => u.userType == "organization"));
        }
        if (params?.slug == "agent") {
          setUser(d.filter((u) => u.userType == "agent"));
        }
        if (params?.slug == "default") {
          setUser(d.filter((u) => u.userType == "default"));
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, [users, params.slug, num]);
  const verifyUser = async (id: string) => {
    updateUserStatus(id, UserStatus.active).then((d) => {
      d
        ? toast({
            title: `Хэрэглэгчийг зөвшөөрлөө`,
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
    });
  };
  const returnRequest = async (id: string) => {
    updateUserStatus(id, UserStatus.returned, "Буцаалаа.").then((d) => {
      d
        ? toast({
            title: `Хэрэглэгчийг буцаалаа`,
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
    });
  };
  const banUser = async (id: string) => {
    updateUserStatus(id, UserStatus.banned).then((d) => {
      d
        ? toast({
            title: `Хэрэглэгчийг хориглолоо.`,
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
    });
  };

  const [expand, setExpand] = useState(0);

  return (
    <Fragment>
      <div className="flex flex-row p-5 min-h-[60vh]">
        <div className="p-5 ">
          {/* <Text>Zariin dugaar: {a.num}</Text>
                <Button onClick={() => verify(a._id)}>verify</Button>
                <Button onClick={() => deleteAd(a._id)}>delete</Button> */}
          {/* {content && <> {content} </>} */}

          <div className="w-full overflow-scroll">
            {/* {users && (
                <button
                  className="p-2 mb-2 font-bold text-white bg-teal-500 rounded-md"
                  onClick={() => {}}
                >
                  Excel татах
                </button>
              )} */}
            <table className="w-full p-2 text-sm text-left border border-collapse border-gray-400 table-auto">
              <thead>
                <tr>
                  <th>Дугаар</th>
                  <th>Нэр</th>
                  {/* <th>Дэлгэрэнгүй</th> */}
                  <th>Имайл</th>
                  <th>Утас</th>
                  <th>Төрөл</th>
                  <th>Статус</th>
                  <th>Файл</th>
                  <th>Иргэний үнэмлэхний зураг</th>
                  <th>Үйлдэл</th>
                  {/* <th>Засах</th> */}
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) => u.userType != UserType.system)
                  ?.map((a, i) => {
                    let adData = { ...a };
                    return (
                      <tr key={i}>
                        <td width="5%">{i + 1}</td>
                        <td className="truncate ...">
                          {/* {a.title} */}
                          <Link
                            className={mergeNames(
                              STYLES.blueButton,
                              "text-sm h-[30px]"
                            )}
                            target="_blank"
                            href={`/account/${a._id}`}
                            // onClick={() => router.push(`/product/${a.num}`)}
                          >
                            {(a.agentAddition?.organizationName ||
                              a.organizationAddition?.organizationName) ??
                              a.username}
                          </Link>
                        </td>
                        <td className="truncate ...">{a.email}</td>
                        <td className="truncate ...">{a.phone}</td>
                        <td
                          className={mergeNames(
                            "truncate ... font-bold",
                            a.userType == "default"
                              ? "text-purple-900"
                              : a.userType == "agent"
                              ? "text-primary"
                              : a.userType == "organization"
                              ? "text-green"
                              : a.userType == "admin"
                              ? "text-yellow"
                              : ""
                          )}
                        >
                          {a.userType}
                        </td>
                        <td
                          className={mergeNames(
                            "truncate ... font-bold",
                            // a.status == '' && 'text-yellow-400',
                            a.status == "active"
                              ? "text-green-500"
                              : a.status == "pending"
                              ? "text-yellow-500"
                              : a.status == "banned"
                              ? "text-red-400"
                              : ""
                            // a.status == 'default' && 'text-primary'
                          )}
                        >
                          {a.status}
                        </td>
                        <td>
                          {(a.agentAddition?.organizationContract ||
                            a.organizationAddition
                              ?.organizationCertificationCopy) && (
                            <Link
                              href={`${imageApi}${
                                a.agentAddition?.organizationContract ||
                                a.organizationAddition
                                  ?.organizationCertificationCopy
                              }`}
                              passHref
                              target="_blank"
                            >
                              pdf
                            </Link>
                          )}
                        </td>
                        <td>
                          {a.agentAddition?.identityCardFront &&
                            a.agentAddition?.identityCardBack && (
                              <Fragment>
                                <Link
                                  href={a.agentAddition?.identityCardFront}
                                  passHref
                                  target="_blank"
                                >
                                  Зураг 1
                                </Link>
                                <Link
                                  href={a.agentAddition?.identityCardBack}
                                  passHref
                                  target="_blank"
                                >
                                  Зураг 2
                                </Link>
                              </Fragment>
                            )}
                        </td>
                        <td>
                          <div
                            className={mergeNames(
                              "flex flex-row justify-center"
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
                              {a.status != "active" && (
                                <CustomToast
                                  // status="error"
                                  className={mergeNames(
                                    STYLES.button,
                                    "bg-teal-500 justify-center w-7 h-7 "
                                  )}
                                  toastH="Хүсэлт илгээлээ"
                                  onClick={() => verifyUser(a._id ?? "")}
                                  status="warning"
                                  toastBtn={<SiVerizon />}
                                />
                              )}
                              {a.status == "pending" && (
                                <button
                                  onClick={() => returnRequest(a._id ?? "")}
                                  className={mergeNames(
                                    STYLES.button,
                                    "bg-yellow-500 w-7 h-7 justify-center"
                                  )}
                                >
                                  <BiEdit />
                                </button>
                              )}

                              <CustomToast
                                // status="error"
                                className={mergeNames(
                                  STYLES.button,
                                  "bg-red-500 w-7 h-7 justify-center"
                                )}
                                toastH="Хүсэлт илгээлээ"
                                onClick={() => banUser(a._id ?? "")}
                                status="warning"
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
            {users && (
              <ul className="flex float-right mt-5 list-style-none">
                <li className="mx-2 disabled">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      if (num > 0) {
                        let n = num - 1;
                        setNum(n);
                      }
                    }}
                  >
                    Өмнөх
                  </button>
                </li>
                {[...Array(Math.ceil(users?.length / 20)).keys()].map(
                  (l, i) => {
                    // [...Array(Math.ceil(data.limit / n)).keys()].map((l) => {
                    return (
                      <li className={l == num ? "active" : ""} key={i}>
                        <button
                          className={mergeNames(
                            l == num ? STYLES.active : STYLES.notActive
                          )}
                          onClick={() => {
                            setNum(l);
                          }}
                        >
                          {l + 1}
                        </button>
                      </li>
                    );
                  }
                )}
                <li className="mx-2 disabled">
                  <button
                    className={mergeNames(STYLES.notActive)}
                    onClick={() => {
                      if (users?.length > 20) {
                        let n = num + 1;
                        setNum(n);
                      }
                    }}
                  >
                    Дараах
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
