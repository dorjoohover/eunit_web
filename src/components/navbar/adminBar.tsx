"use client";
import mergeNames from "@/utils/functions";
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { NavContainer } from "../container";
import { adminNav } from "@/utils/values";

const AdminBar = () => {
  const [isHoveringId, setIsHoveringId] = useState<boolean | string>(true);
  const handleMouseOver = (id: string) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };
  return (
    <div>
      <div className={mergeNames("md:block hidden", "bg-mainBlossom ")}>
        <NavContainer>
          <div className="flex flex-row items-center justify-center gap-10">
            <div className="flex flex-row items-center ">
              {/* logo */}
              <Link href="/" className="p-2">
                <Image
                  src="/assets/images/logo/bom-white.png"
                  alt="Logo"
                  className="h-6"
                />
              </Link>

              {/* Categoriud */}
              {adminNav?.map(({ tabName, id, submenu }, key) => {
                return (
                  <div
                    key={key}
                    // onClick={() => handleMouseOver(id)}
                    onMouseOver={() => handleMouseOver(id)}
                    onMouseOut={handleMouseOut}
                    className={mergeNames(
                      "hover:bg-blue-900 transition-colors ease-in-out"
                    )}
                  >
                    <div className="h-full">
                      <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-3 lg:px-4">
                        <Link
                          href={`/admin/${id}`}
                          className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]"
                        >
                          {tabName}
                        </Link>
                        {/* <p className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]">
                    {tabName}
                  </p> */}
                      </div>
                    </div>
                    <div className="absolute left-[50%] -translate-x-[50%] w-full  flex flex-row overflow-hidden justify-center bg-blue-900/[96]">
                      {submenu &&
                        isHoveringId &&
                        isHoveringId === id &&
                        submenu.map(({ tab, href }, subkey) => {
                          return (
                            <Fragment key={subkey}>
                              <Link
                                href={`/admin/${href}`}
                                className={mergeNames(
                                  "px-2 lg:px-4 py-3 text-[10px] lg:text-sm font-medium text-white transition-colors ease-in cursor-pointer bg-blue-900/[96] hover:bg-blue-700 first-letter:uppercase whitespace-nowrap z-30",
                                  subkey === submenu.length - 1
                                    ? ""
                                    : "border-r border-blue-900/[96]"
                                )}
                              >
                                <p>{tab}</p>
                              </Link>
                            </Fragment>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </NavContainer>
      </div>
    </div>
  );
};

export default AdminBar;
