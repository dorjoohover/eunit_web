import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiVipDiamondFill } from "react-icons/ri";
import Tip from "./tip";
import { FC, ReactNode } from "react";
import { LoadingButtonType } from "@/utils/type";
import { Loader } from "@mantine/core";

export const LoadingButton: FC<LoadingButtonType> = ({
  text,
  onClick,
  blue,
  isLoading,
}) => {
  return isLoading ? (
    <Loader />
  ) : (
    <div
      className={mergeNames(
        blue ? (STYLES.blueButton, "p-2 ") : "",
        "flex justify-center items-center gap-2"
      )}
      onClick={() => {
        isLoading ? null : onClick;
      }}
    >
      <AiOutlineLoading3Quarters
        className={mergeNames(isLoading ? "animate-spin block" : "hidden")}
      />
      {isLoading ? "Уншиж байна" : text}
    </div>
  );
};

const cardIcon = {
  div: "flex items-center justify-center transition-all duration-300 ease-in-out rounded-full  shadow ",
  icon: "md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8",
};

export const DButton = ({
  onClick,
  isDelete,
}: {
  onClick: () => void;
  isDelete: boolean;
}) => {
  return !isDelete ? (
    <Tip lbl="Устгах">
      <button
        className={mergeNames(cardIcon.div, "bg-red-400 hover:bg-red-500")}
        onClick={onClick}
      >
        <BsFillTrashFill size={16} className={mergeNames(" ", cardIcon.icon)} />
      </button>
    </Tip>
  ) : (
    <Tip lbl="Сэргээх">
      <button
        // className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full md:w-8 md:h-8"
        className={mergeNames(cardIcon.div, "bg-teal-400 hover:bg-teal-500")}
        onClick={onClick}
      >
        <MdOutlineRestartAlt size={16} className={mergeNames(cardIcon.icon)} />
        {/* Устгах */}
      </button>
    </Tip>
  );
};

export const PButton = ({
  onClick,
  isDelete,
}: {
  onClick: () => void;
  isDelete: boolean;
}) => {
  return (
    <Tip lbl="VIP зар болгох">
      <button
        className={mergeNames(cardIcon.div, "bg-mainBlossom text-white ")}
        onClick={onClick}
      >
        <RiVipDiamondFill
          size={16}
          className={mergeNames(" ", cardIcon.icon)}
        />
      </button>
    </Tip>
  );
};

export const ImageCount = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) => (
  <Tip lbl="Зурагны тоо">
    <button
      className="flex items-center justify-center w-10 h-6 gap-1 my-auto text-white rounded-full bg-gray-600/80 backdrop-blur-sm md:w-12"
      onClick={onClick}
    >
      <HiOutlinePhotograph size={16} />
      <p className="text-xs"> {children} </p>
    </button>
  </Tip>
);
