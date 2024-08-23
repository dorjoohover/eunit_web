"use client";
import { CategoryModel } from "@/models/category.model";
import mergeNames from "@/utils/functions";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getConstants } from "@/app/(api)/constants.api";
import { ConstantApi } from "@/utils/values";
import { Api } from "@/config/enum";

const NavCategory = () => {
  const [isHoveringId, setIsHoveringId] = useState<string>();
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);

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

  const handleMouseOver = (id: string) => {
    setIsHoveringId(id);
  };

  const handleMouseOut = () => {
    setIsHoveringId(undefined);
  };

  return (
    <Fragment>
      {categories?.map((category, key) => (
        <Fragment key={key}>
          <div
            onMouseOver={() => handleMouseOver(category._id)}
            onMouseOut={handleMouseOut}
            className={mergeNames(
              "hover:bg-blue-900 transition-colors ease-in-out"
            )}
          >
            <div className="h-full">
              <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-3 lg:px-4">
                <Link
                  href={`/category/${category.href}`}
                  className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]"
                >
                  {category.name}
                </Link>
              </div>
            </div>
            {isHoveringId === category._id && (
              <div className="absolute left-[50%] bg-blue-900 -translate-x-[50%] w-full  flex flex-row overflow-hidden justify-center ">
                {(category.subCategory as CategoryModel[])?.map((sub, subkey) => (
                  <motion.a
                    key={subkey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    href={`/category/${sub.href}`}
                    className={mergeNames(
                      "px-2 lg:px-4 py-3 text-[10px] xl:text-sm font-medium text-white transition-colors ease-in cursor-pointer bg-blue-900/[96] hover:bg-blue-700 first-letter:uppercase whitespace-nowrap z-30",
                      subkey === category.subCategory.length - 1
                        ? ""
                        : "border-r border-blue-900/[96]"
                    )}
                  >
                    <p>{sub.name}</p>
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default NavCategory;
