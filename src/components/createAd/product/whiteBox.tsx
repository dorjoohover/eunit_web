import { RiArrowUpSLine } from "react-icons/ri";

import { ReactNode } from "react";
import mergeNames from "@/utils/functions";

const WhiteBox = ({
  children,
  heading,
  className = "",
}: {
  children: ReactNode;
  heading: string;
  className?: string;
}) => {
  return (
    <div className={mergeNames("p-5  bg-white rounded-md w-full ")}>
      <div className="grid text-xl font-bold col-span-full">
        <div className="flex items-center justify-between ">
          <p>{heading}</p>
          {/* <p>
            <RiArrowUpSLine />
          </p> */}
        </div>
      </div>

      <div
        className={mergeNames(
          "bg-gray-200 h-[1px] my-3 col-span-full rounded-full"
        )}
      />
      <div className={mergeNames(className)}>{children}</div>
    </div>
  );
};

export default WhiteBox;
