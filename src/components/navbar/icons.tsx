import mergeNames from "@/utils/functions";
import { FC } from "react";


const layout = "cursor-pointer flex flex-col items-center";
const rowLayout = "flex flex-row items-center p-2 gap-1";

type IconsType = {
  word? : boolean,
  onClick? :() => void,
  className?: string,
  text?: string
}

export const WalletIcon:FC<IconsType> = ({ onClick = () => {} }) => {
  return (
    <button onClick={onClick} className="cursor-pointer animated__wallet">
      <div className="flex flex-row items-center gap-1">
        <div  className="w-6 h-6 animated__icon" />
        <div className="flex flex-col">
          <p>Хэтэвч</p>
          <p>0,000₮</p>
        </div>
      </div>
    </button>
  );
};

export const EstimateIcon:FC<IconsType> = ({ onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer animated__estimator"
    >
      <div  className="w-6 h-6 animated__icon" />
      <p>Үнэлгээ</p>
    </button>
  );
};

export const HeartIcon:FC<IconsType> = ({ word = true, onClick = () => {} }) => {
  return (
    <button onClick={onClick} className={mergeNames("animated__heart", layout)}>
      <div  className="w-6 h-6 animated__icon" />
      {word && <p>Хүсэл</p>}
    </button>
  );
};

export const WhiteHeartIcon:FC<IconsType> = ({
  word = Boolean,
  onClick = () => {},
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={mergeNames(
        "white__animated__heart",
        "px-2",
        className ?? '',
        layout
      )}
    >
      <div  className=" w-6 h-6 animated__icon" />
      {/* {word && <p>Хүсэл</p>} */}
    </button>
  );
};

export const EstimatorIcon:FC<IconsType> = ({
  word = Boolean,
  onClick = () => {},
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={mergeNames(
        "white__animated__estimator",
        "px-2 py-2 bg-teal-600 hover:bg-teal-500",
        className ?? '',
        layout
      )}
    >
      <div  className=" w-6 h-6 animated__icon" />
      {/* {word && <p>Хүсэл</p>} */}
    </button>
  );
};

export const UserIcon:FC<IconsType> = ({
  text = "",
  className = "",
  onClick = () => {},
  word = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={mergeNames(
        "animated__account-white",
        rowLayout,
        word ? "" : "",
        className && className
      )}
    >
      <>
        <span  className=" w-6 h-6 animated__icon" />

        {/* <UserIcon className="p-0" /> */}
        <p className="p-[12px]">{text}</p>
      </>
    </button>
  );
};
