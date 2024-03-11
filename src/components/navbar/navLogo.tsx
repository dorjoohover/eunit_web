import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Assets } from "@/utils/assets";

const NavLogo = ({ size }) => {
  return (
    <React.Fragment>
      <div className="cursor-pointer md:block hidden">
        <Link href="/">
          <Image
            src={Assets.logoBlue}
            alt="BOM logo"
            width={size.width}
            height={size.height}
            objectFit="contain"
          />
        </Link>
      </div>
      <div className="cursor-pointer md:hidden block">
        <Link href="/">
          <Image
            src={Assets.logoMiniBlue}
            alt="BOM logo"
            width={size.width}
            height={size.height}
            objectFit="contain"
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
