import mergeNames from "@/utils/functions";
import React from "react";
import { BiCheck } from "react-icons/bi";

const CheckItem = ({ isSelected = false }) => (
  <div
    className={mergeNames(
      "rounded-full w-[40px] h-[40px] flex justify-center items-center",
      isSelected ? "bg-white" : ""
    )}
  >
    <BiCheck
      size={30}
      className={mergeNames(isSelected ? "text-blue-500" : "text-blue-200")}
    />
  </div>
);

export default CheckItem;
