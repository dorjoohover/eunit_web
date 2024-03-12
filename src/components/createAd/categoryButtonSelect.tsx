import React from "react";
// import CategoryIcon from "./categoryIcon";
import mergeNames from "@/utils/functions";

const CategoryButtonSelect = ({
  item = {},
  isSelected = false,
  onClick = () => {},
}: {
  item: any;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={() => onClick()}
      className={mergeNames("group flex flex-col justify-start items-center")}
    >
      <div
        className={mergeNames(
          "md:w-[80px] md:h-[80px] w-[50px] h-[50px] flex flex-row gap-2 items-center justify-center px-3 ",
          "border border-gray-200 rounded-full ring-[6px] ring-offset-0 shadow-md",
          isSelected
            ? "bg-blue-500 ring-blue-200"
            : "bg-blue-200 ring-transparent"
        )}
      >
        {/* <Icon  /> */}
        {/* <CategoryIcon
          href={item?.href ?? item?.id}
          size={40}
          className={mergeNames(
            isSelected ? "text-blue-200" : "text-blue-500/60",
            "transition-all ease-in-out",
            "text-[30px] group-hover:scale-125"
          )}
        /> */}
      </div>
      <p
        className={mergeNames(
          "md:text-base font-semibold text-[12px] mt-2",
          isSelected ? "text-gray-800" : "text-gray-500"
          // "group-hover:text-white "
        )}
      >
        {item?.name || item?.categoryName}
      </p>
    </button>
  );
};

export default CategoryButtonSelect;
