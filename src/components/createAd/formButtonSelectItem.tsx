import mergeNames from "@/utils/functions";
import { ReactNode } from "react";

const ButtonSelectItem = ({
  data = "",
  onClick,
  isSelected = false,
  LeftItem = () => <></>,
  RightItem = () => <></>,
  children
}: {
  data: string;
  onClick: () => void;
  isSelected?: boolean;
  LeftItem?: () => JSX.Element;
  RightItem?: () => JSX.Element;
  children?: ReactNode;
}) => {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className={mergeNames(
        "transition-all ease-out",
        "ring-[6px] ring-offset-0 rounded-full px-1 py-1 md:mb-3 mb-2",
        "flex flex-row items-center",
        isSelected
          ? "bg-blue-500 ring-blue-200"
          : "bg-blue-100 ring-transparent"
      )}
    >
      <LeftItem />
      <p
        className={mergeNames(
          "font-semibold md:px-4 md:py-2 px-2 py-1 md:text-base text-sm",
          isSelected ? "text-white" : "text-blue-500/80"
        )}
      >
        {data}
      </p>
      <RightItem />
    </button>
  );
};

export default ButtonSelectItem;
