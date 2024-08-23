import Link from "next/link";
import mergeNames from "@/utils/functions";
import React, { useEffect, useState } from "react";
import {
  CgChevronRight,
  CgClose,
  CgSmartHomeWashMachine,
} from "react-icons/cg";
import { useAppContext } from "@/app/_context";
import { CategoryModel } from "@/models/category.model";
import { BsBuilding } from "react-icons/bs";
import { AiOutlineCar } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiHomeSmile2Line } from "react-icons/ri";
import { IconBaseProps } from "react-icons/lib";
import { getConstants } from "@/app/(api)/constants.api";
import { ConstantApi } from "@/utils/values";
import { Api } from "@/config/enum";

const Icon = ({
  id,
  size,
  className,
}: {
  id: string;
  size: number;
  className: string;
}) => {
  switch (id) {
    case "realState":
      return <BsBuilding size={size} className={className} />;
    case "vehicle":
      return <AiOutlineCar size={size} className={className} />;
    case "computer":
      return <MdComputer size={size} className={className} />;
    case "phone":
      return <IoPhonePortraitOutline size={size} className={className} />;
    case "electronic":
      return <CgSmartHomeWashMachine size={size} className={className} />;
    case "household-items":
      return <RiHomeSmile2Line size={size} className={className} />;
    default:
      return <></>;
  }
};

const SideMenu = ({
  show = false,
  closeNav = () => {},
  openNav = () => {},
}) => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      let value = localStorage.getItem("category");
      if (value) {
        setCategories(JSON.parse(value));
      } else {
        const data = await getConstants(
          `${ConstantApi.category}false`,
          Api.GET
        );
        localStorage.setItem("category", JSON.stringify(data));
        setCategories(data);
      }
    };
    if (typeof window !== "undefined") {
      fetchCategories();
    }
  }, []);
  const [collapsedId, setCollapsed] = React.useState("");
  useEffect(() => {
    if (categories && categories?.length > 0)
      setCollapsed(categories?.[0]?._id as string);
  }, [categories]);

  return (
    <React.Fragment>
      <div
        className={mergeNames(
          "transition-all ease-in-out duration-100",
          show
            ? "w-screen h-screen absolute top-0 bottom-0 left-0 right-0 bg-gray-900/50"
            : ""
        )}
      />
      <div
        style={{ width: show ? "100%" : "0rem" }}
        className={mergeNames(
          // show ? "absolute": "hidden",
          "absolute z-50",
          show ? "translate-x-0" : "translate-x-0",
          "transition-all ease-in-out duration-300",
          "left right-0 top-0 bottom-0 h-screen "
        )}
      >
        <div className="static z-50 flex flex-col items-end h-screen overflow-y-scroll">
          <div className="w-3/4 h-screen bg-slate-100">
            <div
              className={mergeNames(
                "flex justify-between items-center bg-mainBlossom/100 py-4 w-full px-6"
              )}
            >
              <p className="text-base font-semibold text-slate-50">Ангилал</p>
              <button onClick={closeNav}>
                <CgClose size={30} className="text-slate-50" />
              </button>
            </div>
            <div>
              {/* {categories?.map((item, key) => { */}
              {(categories as CategoryModel[])?.map((item, key) => {
                return (
                  <div className="w-full" key={key}>
                    <button
                      onClick={() => {
                        setCollapsed((prev) => {
                          if (prev === item._id) return "";
                          return item._id;
                        });
                      }}
                      className={mergeNames(
                        "hover:bg-slate-300",
                        "sm:px-4 sm:py-4 px-3 py-3",
                        "border-b border-gray-200",
                        "w-full flex flex-row items-center justify-between"
                      )}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <Icon
                          size={16}
                          id={item?._id}
                          className="text-blue-900"
                        />
                        <p className="text-sm font-semibold sm:text-base">
                          {item?.name}
                        </p>
                      </div>
                      <CgChevronRight
                        size={20}
                        className={mergeNames(
                          collapsedId === item._id ? "rotate-90" : "",
                          "transition-all ease-in-out"
                        )}
                      />
                    </button>
                    <div
                    //  className={mergeNames("sm:px-4 sm:py-4 px-3 py-3")}
                    // className="bg-gray-200"
                    >
                      {collapsedId != "" &&
                        collapsedId === item._id &&
                        (categories?.[0]?.subCategory as CategoryModel[])?.map(
                          (cate, key) => {
                            return (
                              <Link
                                href={`/category/${cate.href}`}
                                key={key}
                                className="w-full py-3 pl-3 pr-3 border-b border-gray-300 hover:bg-gray-300"
                              >
                                <p className="text-xs font-medium text-left text-gray-900 sm:text-sm">
                                  {cate.name}
                                </p>
                              </Link>
                            );
                          }
                        )}
                    </div>
                  </div>
                );
              })}
              <div className="grid items-center grid-cols-2 text-sm font-semibold text-center text-white">
                <div className="p-3 bg-teal-500 border border-teal-600 hover:bg-teal-600">
                  <Link href="/create/ad" passHref>
                    Зар нэмэх
                  </Link>
                </div>
                <div className="p-3 bg-teal-500 border border-teal-600 hover:bg-teal-600">
                  <Link href="/create/sharing" passHref>
                    Зар хуваалцах
                  </Link>
                </div>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideMenu;
