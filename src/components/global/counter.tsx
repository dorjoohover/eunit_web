import mergeNames from "@/utils/functions";
import { DateType } from "@/utils/type";
import React, { FC, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

const generalButtonStyle =
  "transition-all ease-in-out hover:bg-blue-600 outline-none py-1";

const Counter: FC<DateType> = ({
  limit,
  maxValue,
  setValue = () => {},
  requirement = true,
}) => {
  // const Counter = ({ limit = 5, maxValue = "5+" }) => {
  const [number, setNumber] = useState<number>(0);
  return (
    <div className="flex flex-row justify-center md:w-1/3 h-14">
      <button
        onClick={() => {
          setNumber((prev) => {
            if (prev === 0) {
              setValue(0);
              return 0;
            }
            if (prev === maxValue) {
              setValue(limit!);
              return limit!;
            }
            setValue(prev - 1);
            return prev - 1;
          });
        }}
        className={mergeNames(
          !requirement ? "bg-blue-500" : "bg-red-400",
          generalButtonStyle,
          "rounded-l-full pl-5 pr-3 "
        )}
      >
        <BiMinus size={30} className="text-white" />
      </button>
      <div
        className={mergeNames(
          !requirement ? "border-blue-500" : "border-red-400",
          "w-[100px] border  flex justify-center items-center"
        )}
      >
        <p className="text-lg font-semibold">{number}</p>
      </div>
      <button
        onClick={() => {
          setNumber((prev) => {
            if (limit && maxValue) {
              if (prev > limit - 1 || prev === maxValue) {
                setValue(maxValue);
                return maxValue;
              }
            }
            if (limit && !maxValue) {
              if (prev > limit - 1) {
                setValue(limit);
                return limit;
              }
            }
            setValue(prev + 1);
            return prev + 1;
          });
        }}
        className={mergeNames(
          !requirement ? "bg-blue-500" : "bg-red-400",
          generalButtonStyle,
          "rounded-r-full pr-5 pl-3 "
        )}
      >
        <BiPlus size={30} className="text-white" />
      </button>
    </div>
  );
};

export default Counter;
