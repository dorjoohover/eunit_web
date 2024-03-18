import React from "react";

import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FiSmartphone } from "react-icons/fi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdComputer, MdOutlineIron } from "react-icons/md";

const CategoryIcon = ({
  href,
  size,
  className,
}: {
  href: string;
  size?: number;
  className?: string;
}) => {
  //   return <div>CategoryIcon</div>;
  switch (href) {
    case "realState":
      return <BsBuilding size={size} className={className} />;
    case "vehicle":
      return <AiOutlineCar size={size} className={className} />;
    case "computer":
      return <MdComputer size={size} className={className} />;
    case "phone":
      return <IoPhonePortraitOutline size={size} className={className} />;
    case "electronics":
    case "electronic":
      return <CgSmartHomeWashMachine size={size} className={className} />;
    case "householdItems":
    case "household-items":
      return <MdOutlineIron size={size} className={className} />;
    default:
      return <></>;
  }
};

export default CategoryIcon;
