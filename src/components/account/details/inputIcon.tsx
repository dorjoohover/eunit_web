import { ProfileEnumType } from "@/config/enum";
import { BiExpandAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdDateRange, MdEmail } from "react-icons/md";
import { RiVipCrown2Line } from "react-icons/ri";
import { RxLayers } from "react-icons/rx";

// Dashboard deerh iconuud

const InputIcon = ({
  href,
  size,
  className,
}: {
  href: ProfileEnumType;
  size: number;
  className: string;
}) => {
  switch (href) {
    case ProfileEnumType.phone:
      return <FiPhone size={size} className={className} />;
    case ProfileEnumType.agent:
      return <RiVipCrown2Line size={size} className={className} />;
    case ProfileEnumType.date:
      return <MdDateRange size={size} className={className} />;
    case ProfileEnumType.username:
      return <FaRegUser size={size} className={className} />;
    case ProfileEnumType.email:
      return <MdEmail size={size} className={className} />;

    // compare icon
    case ProfileEnumType.floor:
      return <RxLayers size={size} className={className} />;
    case ProfileEnumType.square:
      return <BiExpandAlt size={size} className={className} />;
    // return <IoExpand size={size} className={className} />;
    default:
      return <></>;
  }
};

export default InputIcon;
