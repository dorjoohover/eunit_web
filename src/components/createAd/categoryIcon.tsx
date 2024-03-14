import React from "react";

import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { FiSmartphone } from "react-icons/fi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdComputer, MdOutlineIron } from "react-icons/md";

const CategoryIcon = ({ href, ...props }: {href: string}) => {
  //   return <div>CategoryIcon</div>;
  switch (href) {
    case "realState":
      return <BsBuilding {...props} />;
    case "vehicle":
      return <AiOutlineCar {...props} />;
    case "computer":
      return <MdComputer {...props} />;
    case "phone":
      return <IoPhonePortraitOutline {...props} />;
    case "electronics":
    case "electronic":
      return <CgSmartHomeWashMachine {...props} />;
    case "householdItems":
    case "household-items":
      return <MdOutlineIron {...props} />;
    default:
      return <></>;
  }
};

export default CategoryIcon;
