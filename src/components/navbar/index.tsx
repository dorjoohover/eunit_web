"use client";
import { getConstants } from "@/app/(api)/constants.api";
import CategoryBottom from "./bottom";
import UpperNav from "./upper";

import { Api } from "@/config/enum";
import { ConstantApi } from "@/utils/values";
import { useAppContext } from "@/app/_context";
import { useEffect } from "react";

const Navbar = () => {
  const { categories, setCategories, current } = useAppContext();
  const getCategories = async () => {
    await getConstants(ConstantApi.category, Api.GET, {}).then((d) =>
      setCategories(d)
    );
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div
        className="sticky top-0 z-20"
        id="navbar"

        // pos={sticky ? 'sticky' : 'relative'}
      >
        <CategoryBottom categories={categories} current={current?.user} />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
