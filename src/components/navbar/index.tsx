"use client";
import { getConstants } from "@/app/(api)/constants.api";
import CategoryBottom from "./bottom";
import UpperNav from "./upper";

import { Api, UserStatus } from "@/config/enum";
import { ConstantApi } from "@/utils/values";
import { useAppContext } from "@/app/_context";
import { useEffect } from "react";
import { getUser } from "@/app/(api)/user.api";

const Navbar = () => {
  const { categories, setCategories, setUser, user, setMark, setCurrent } =
    useAppContext();
  const getConst = async () => {
    await getConstants(`${ConstantApi.category}false`, Api.GET).then((d) =>
      setCategories(d)
    );
  };
  useEffect(() => {
    getConst();
    getUserData();
  }, []);

  const getUserData = async () => {
    await getUser()
      .then((d) => {
        if (d != null) {
          console.log(d);
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
        <CategoryBottom categories={categories} />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
