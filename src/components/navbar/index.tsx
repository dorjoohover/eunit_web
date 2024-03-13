import { getConstants } from "@/app/(api)/constants.api";
import CategoryBottom from "./bottom";
import UpperNav from "./upper";

import { Api } from "@/config/enum";
import { CategoryModel } from "@/models/category.model";
import { cookies } from "next/headers";
import { UserModel } from "@/models/models";
import { getUser } from "@/app/(api)/user.api";
import { ConstantApi } from "@/utils/values";
import { useAppContext } from "@/app/_context";

const Navbar = async () => {
  const categories = (await getConstants(ConstantApi.category, Api.GET, {})) as
    | CategoryModel[]
    | undefined;

  const current = cookies().get("current");
  return (
    <>
      <div
        className="sticky top-0 z-20"
        id="navbar"

        // pos={sticky ? 'sticky' : 'relative'}
      >
        <CategoryBottom categories={categories} current={current?.value} />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
