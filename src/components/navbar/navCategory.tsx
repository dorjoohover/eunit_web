"use client";
import { CategoryModel } from "@/models/category.model";
import mergeNames from "@/utils/functions";
import Link from "next/link";
import { Fragment, useState } from "react";
import { motion } from "framer-motion";
const NavCategory = ({
  categories,
}: {
  categories: CategoryModel[] | undefined;
}) => {
  const [isHoveringId, setIsHoveringId] = useState<string | boolean>(true);
  const handleMouseOver = (id: string) => {
    setIsHoveringId(id);

  };

  const handleMouseOut = () => {
    setIsHoveringId(false);
  };

  return (
    <>
      {" "}
      {categories?.map((category, key) => {
        
         return category.parent == null ? (
          <div
            key={key}
            // onClick={() => handleMouseOver(id)}
            onMouseOver={() => handleMouseOver(category._id)}
            onMouseOut={handleMouseOut}
            className={mergeNames(
              "hover:bg-blue-900 transition-colors ease-in-out"
            )}
          >
            <div className="h-full">
              <div className="flex flex-col justify-center h-full px-2 py-4 lg:py-3 lg:px-4">
                <Link
                  href={`/category/${category._id}`}
                  className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]"
                >
                  {category.name}
                </Link>
                {/* <p className="text-[11px] font-medium text-center h-full text-white lg:text-[13px]">
                  {categoryName}
                </p> */}
              </div>
            </div>
            <div className="absolute left-[50%] bg-blue-900 -translate-x-[50%] w-full  flex flex-row overflow-hidden justify-center ">
              {
                isHoveringId &&
                
                categories?.filter((c) => c.parent == isHoveringId)?.map((body, subkey) => {
                  const sub = body  as CategoryModel;
                  return (
                    <Fragment key={subkey}>
                      {/* <div className="absolute left-0 w-1/2 h-full from-blue-900/0 via-blue-900/40 to-blue-900/100 bg-[url('/images/flurry.svg')] bg-no-repeat" /> */}
                      {/* <Image
                      src="/images/flurry.svg"
                      alt="asd"
                      className="absolute left-0 object-cover w-1/2"
                      bgRepeat="repeat"
                    /> */}

                      <motion.a
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        href={`/category/${sub._id}`}
                        className={mergeNames(
                          "px-2 lg:px-4 py-3 text-[10px] xl:text-sm font-medium text-white transition-colors ease-in cursor-pointer bg-blue-900/[96] hover:bg-blue-700 first-letter:uppercase whitespace-nowrap z-30",
                          subkey === category.subCategory.length - 1
                            ? ""
                            : "border-r border-blue-900/[96]"
                        )}
                      >
                        {/* <motion.a */}

                        <p>{sub.name}</p>

                        {/* </motion.a> */}
                      </motion.a>
                      {/* <Image
                      src="/images/flurry.svg"
                      alt="asd"
                      className="absolute top-0 right-0 w-1/2 rotate-90"
                      bgRepeat="repeat"
                    /> */}
                      {/* <div className="absolute right-0 w-1/2 h-full bg-gradient-to-r from-blue-900/100 via-blue-900/40 to-white/0" /> */}
                    </Fragment>
                  );
                })}
            </div>
          </div>
        ) : null
      })}
    </>
  );
};

export default NavCategory;
