import { useEffect, useState } from "react";
import AdCard from "../ad/card";
import { getManyAds } from "@/app/(api)/ad.api";
import { AdStatus, AdTypes } from "@/config/enum";
import { FetchAdUnitType } from "@/utils/type";
import { useAppContext } from "@/app/_context";
import CompareSelect from "./details/compareSelect";
import { CategoryModel } from "@/models/category.model";

const Mark = ({
  ads,
  category,
  loading,
}: {
  loading: boolean;
  ads: FetchAdUnitType;
  category?: CategoryModel[];
}) => {
  const [num, setNum] = useState(0);
  //   const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [data, setData] = useState([]);

  const toLowerCase = (text?: string) => {
    if (text) {
      return text.toLowerCase();
    }
  };

  return (
    <>
      <CompareSelect
      // setProducts={setAds}
      // category={category}
      // subCategory={subCategory}
      />
      {/* <AdContent data={ads} tlc={toLowerCase} title=" " showLink="hidden" /> */}
      <div className="grid grid-cols-2 gap-5 mt-5 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-3">
        {ads?.ads?.map((item, key) => (
          <AdCard key={key} item={item || {}} />
        ))}
      </div>
      {ads?.ads?.length == 0 && (
        <div className="h-[60vh] flex justify-center items-center w-full text-xl">
          Зар байхгүй байна
        </div>
      )}
    </>
  );
};

export default Mark;
