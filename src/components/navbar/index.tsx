"use client";
import { getConstants } from "@/app/(api)/constants.api";
import CategoryBottom from "./bottom";
import UpperNav from "./upper";

import { Api, UserStatus } from "@/config/enum";
import { ConstantApi } from "@/utils/values";
import { useAppContext } from "@/app/_context";
import { useEffect, useState } from "react";
import { getUser } from "@/app/(api)/user.api";
import { CategoryModel } from "@/models/category.model";

const Navbar = () => {

  const getConst = async () => {
    await getConstants(`${ConstantApi.category}false`, Api.GET).then((d) => {
      localStorage.setItem("category", JSON.stringify(d));
      console.log(d);
    });
  };
  const { setUser, user, setMark, setCurrent } = useAppContext();

  const getUserData = async () => {
    await getUser()
      .then((d) => {
        if (d != null) {
          setUser(d);
          setMark(d?.bookmarks);
          setCurrent({
            user: true,
            status: d.status != UserStatus.banned,
            type: d.userType,
          });
        }
      })
      .catch(() => {
        setUser(undefined);
      });
  };

  return (
    <>
      <div
        className="sticky top-0 z-20"
        id="navbar"

        // pos={sticky ? 'sticky' : 'relative'}
      >
        <CategoryBottom />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
