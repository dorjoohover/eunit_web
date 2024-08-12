import { AdModel } from "@/models/ad.model";
import mergeNames, {
  getSellType,
  profileImgUrl,
  stopPropagation,
} from "@/utils/functions";
import currency from "currency.js";

import { useRouter } from "next/navigation";
import React from "react";
import { BiArea } from "react-icons/bi";
import Tip from "../global/tip";
import { UserModel } from "@/models/user.model";
import { Image } from "@chakra-ui/react";
import { CategoryModel } from "@/models/category.model";
import { ApartmentIconInfo, calcValue } from "./card";
import ItemContainer from "../createAd/product/itemContainer";
import { ItemType } from "@/utils/type";
import { imageApi } from "@/utils/values";
import { Assets } from "@/utils/assets";

const MapCard = ({ data }: { data: AdModel }) => {
  const router = useRouter();
  return (
    <div
      className={mergeNames(
        "relative overflow-hidden rounded-md ] h-[200px] aspect-4/3  shadow-md bg-zinc-200 group"
      )}
      onClick={() => router.push(`/ad/${data.num}`)}
    >
      {/* zarin zurag absolute  */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full cursor-pointer">
        {data?.images && (
          <Image
            src={
              data?.images[0] == ""
                ? "/images/noImage.png"
                : imageApi + data?.images[0] ?? "/images/noImage.png"
            }
            alt=" зар"
            objectFit="cover"
            className={mergeNames(
              "group-hover:scale-125  transition-all w-full object-cover h-full ease-in-out duration-400 aspect-[4/5] relative z-0 ",
              "text-center grid place-items-center font-bold"
            )}
          />
        )}

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100"></div>
      </div>
      {/* Zariin body  */}
      <div
        className="relative flex items-start justify-between flex-1 w-full h-0 px-3 py-2 cursor-pointer"
        // onClick={(e) => {
        //   stopPropagation(e);
        //   pushRouter();
        // }}
      >
        <Tip lbl="Зарын эзэн">
          <button
            className={mergeNames(
              "relative overflow-hidden rounded-full w-9 h-9 bg-mainBlossom"
            )}
            onClick={(e) => {
              stopPropagation(e);
              router.push(`/account/${(data.user as UserModel)._id}`);
            }}
          >
            <Image
              src={profileImgUrl(
                (data?.user as UserModel).profileImg,
                Assets.logoMiniWhite
              )}
              alt="BOM logo"
              objectFit="cover"
              className={mergeNames(
                "object-cover w-full",
                (data?.user as UserModel)?.profileImg ? "" : " p-2"
              )}
            />
          </button>
        </Tip>
      </div>

      {/* Zariin info  */}
      <div className="absolute bottom-0 left-0 flex flex-col justify-end w-full p-2 mb-2 space-y-2 cursor-pointer">
        <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
          <p className={mergeNames("font-bold text-xl")}>
            {currency(
              `${data?.items.find((f) => f.id == "price")?.value}`,

              {
                separator: ",",
                symbol: "₮ ",
                pattern: `# !`,
              }
            )
              .format()
              .toString() ?? 0}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
          <p className={mergeNames("font-semibold text-white mt-0")}>
            {(data?.subCategory as CategoryModel)?.name ?? ""}
          </p>
          <p className={mergeNames("font-semibold text-white mt-0")}>
            {getSellType(data?.sellType ?? "")}
          </p>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-1">
          {data?.items?.map((p, i) => {
            return (
              <React.Fragment key={i}>
                <ApartmentIconInfo p={p} />

                {p.id === "area" && (
                  <ItemContainer
                    txtWhite={true}
                    lbl={p.name}
                    Icon={({ data, onClick, id, ...props }: ItemType) => (
                      <BiArea {...props} />
                    )}
                    text={calcValue(p.value ?? 0, "байхгүй", "м.кв")}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapCard;
