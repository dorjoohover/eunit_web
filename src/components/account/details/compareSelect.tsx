import { getManyAds } from "@/app/(api)/ad.api";
import { useAppContext } from "@/app/_context";
import { AdDataModel } from "@/app/admin/estimator/page";
import { AdStatus, AdTypes } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import { UserModel } from "@/models/user.model";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { AdCateIdType } from "@/utils/type";
import { imageApi } from "@/utils/values";
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdCompareArrows } from "react-icons/md";

const CompareItem = ({
  item,
  onClick,
}: {
  item: AdModel;
  onClick: () => void;
}) => {
  let image = item.images?.[0] ?? "/images/noImage.png";
  return (
    <div className=" h-full bg-white max-w-[250px] relative ">
      <Image
        src={imageApi + image}
        alt="compare ads image"
        className="object-cover w-full h-full"
      />

      {/* Delete button*/}
      <div
        className="absolute delete -top-[10px] -right-[10px] rounded-full cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

export const AdminCompareSelect = ({
  btnView,
  data,
  setData,
  id,
}: {
  btnView: boolean;
  id: number;
  data: AdDataModel[];
  setData: React.Dispatch<React.SetStateAction<AdDataModel[]>>;
}) => {
  const [expand, setExpand] = useState(false);
  const pathname = usePathname();
  const updateCompare = (id: AdDataModel) => {
    setData(data.filter((d) => d.id != id.id));
  };
  return (
    <div>
      <div
        className={mergeNames(
          "fixed px-[10%] bottom-0 left-0",
          "bg-secondary/90 w-screen transition-all ease-in-out pb-[68px] md:pb-0",
          " text-[12px] sm:text-base  z-10",
          data.length > 0 && !pathname.includes("compare") ? "h-[250px]" : "h-0"
        )}
      >
        {btnView && (
          <button
            className="h-[50px] gap-2 px-5 bg-secondary/90 absolute -top-[65px] rounded-2xl left-[15px] flex place-items-center text-white  z-30"
            onClick={() => setExpand(!expand)}
          >
            <MdCompareArrows
              className={mergeNames(
                "text-xl ",
                expand ? "rotate-0" : "rotate-180"
              )}
            />
            <p className="text-[12px]">Харьцуулах</p>
          </button>
        )}
        <div
          className={mergeNames(STYLES.flexBetween, "pt-5 text-white w-full")}
        >
          <p>{/* Харьцуулах ( <span> {compare.length}</span>/4 ) */}</p>
          <div className="flex gap-2 transition-all ease-in-out">
            <button
              onClick={() => {
                setData([]);
              }}
            >
              Цэвэрлэх
            </button>
            <Link
              href={`/admin/compare?ids=${data
                .map((d) => d.id)
                .join("|")}&id=${id}`}
              target="_blank"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-2xl"
            >
              Харьцуулах
            </Link>
          </div>
        </div>
        <div className="grid h-full grid-cols-5 gap-1 my-5 md:gap-6">
          {/* Compare item */}
          {data?.map((ad, i) => {
            return (
              <AdminCompareItem
                item={ad}
                key={i}
                onClick={() => {
                  updateCompare(ad);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const AdminCompareItem = ({
  item,
  onClick,
}: {
  item: AdDataModel;
  onClick: () => void;
}) => {
  let image = "/images/noImage.png";
  return (
    <div className=" h-full relative bg-white max-w-[250px] relative ">
      <Image
        src={image}
        alt="compare ads image"
        className="object-cover w-full h-full"
      />
      <div className="absolute top-[50%] left-[50%] translate-2/4">
        {item.id}
      </div>

      {/* Delete button*/}
      <div
        className="absolute delete -top-[10px] -right-[10px] rounded-full cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};
const CompareSelect = ({ btnView = true }) => {
  const router = useRouter();
  const [expand, setExpand] = useState(false);

  const {
    user,
    compare,
    setCompare,
  }: {
    user?: UserModel;
    compare: AdCateIdType[];
    setCompare: React.Dispatch<React.SetStateAction<AdCateIdType[]>>;
  } = useAppContext();
  const [ads, setAds] = useState<AdModel[]>([]);
  const pathname = usePathname();
  const getCompareAds = async () => {
    let ids = compare.map((c) => c.id);
    await getManyAds(
      0,
      user != undefined,
      4,
      AdStatus.all,
      AdTypes.all,
      ids,
      0
    ).then((d) => setAds(d?.ads ?? []));
  };
  const updateCompare = (id: string, action: boolean) => {
    // action true ? delete : any
    if (action) [setCompare(compare.filter((c) => c.id != id))];
  };
  useEffect(() => {
    if (compare.length != 0) getCompareAds();
  }, [compare]);
  return (
    <div>
      {/* <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
        <FilterAd plc="Бүх төрөл" onChange={(e) => {}}>
          <option value=""></option>
        </FilterAd>
        <FilterAd plc="Бүх дэд төрөл" onChange={(e) => {}}>
          <option value=""></option>
        </FilterAd>
      </div> */}
      <div
        className={mergeNames(
          "fixed px-[10%] bottom-0 left-0",
          "bg-secondary/90 w-screen transition-all ease-in-out pb-[68px] md:pb-0",
          " text-[12px] sm:text-base  z-10",
          compare.length > 0 && !pathname.includes("compare")
            ? "h-[250px]"
            : "h-0"
        )}
      >
        {btnView && (
          <button
            className="h-[50px] gap-2 px-5 bg-secondary/90 absolute -top-[65px] rounded-2xl left-[15px] flex place-items-center text-white  z-30"
            onClick={() => setExpand(!expand)}
          >
            <MdCompareArrows
              className={mergeNames(
                "text-xl ",
                expand ? "rotate-0" : "rotate-180"
              )}
            />
            <p className="text-[12px]">Харьцуулах</p>
          </button>
        )}
        <div
          className={mergeNames(STYLES.flexBetween, "pt-5 text-white w-full")}
        >
          <p>{/* Харьцуулах ( <span> {compare.length}</span>/4 ) */}</p>
          <div className="flex gap-2 transition-all ease-in-out">
            <button
              onClick={() => {
                setCompare([]);
              }}
            >
              Цэвэрлэх
            </button>
            <button
              onClick={() => router.push("/compare")}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-2xl"
            >
              Харьцуулах
            </button>
          </div>
        </div>
        <div className="grid h-full grid-cols-4 gap-1 my-5 md:gap-6">
          {/* Compare item */}
          {ads?.map((ad, i) => {
            return (
              <CompareItem
                item={ad}
                key={i}
                onClick={() => {
                  updateCompare(ad._id, true);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompareSelect;
