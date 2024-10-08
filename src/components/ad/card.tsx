import React, { useEffect } from "react";
import { BiArea, BiDoorOpen } from "react-icons/bi";

import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";

import currency from "currency.js";

import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import { useAppContext } from "@/app/_context";
import mergeNames, {
  getSellType,
  profileImgUrl,
  stopPropagation,
} from "@/utils/functions";
import Tip from "../global/tip";
import Alerting from "../global/alert";
import { DButton, ImageCount, PButton } from "../global/button";
import AdCardButton from "./adCardButton";
import { AdItemsModel, AdModel } from "@/models/ad.model";
import { AdStatus } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { CategoryModel } from "@/models/category.model";
import { Assets } from "@/utils/assets";
import { imageApi } from "@/utils/values";
import Link from "next/link";
import { ItemType } from "@/utils/type";
import { Image, Select, Skeleton } from "@mantine/core";

// import { detectContentType } from "next/dist/server/image-optimizer";

function AdCard({
  item,
  deleteFunc = () => {},
  isDelete = false,

  admin = false,
  changeAd = () => {},
  mine,
  isUser,
  setType,
}: {
  item: AdModel;
  deleteFunc?: () => void;
  isDelete?: boolean;
  isUser?: boolean;
  admin?: boolean;
  changeAd?: () => void;
  mine?: boolean;
  setType?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [drop, setDrop] = useState(false);

  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        setUser(JSON.parse(value));
      }
    };
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);
  const pushRouter = async () => {
    //     try {
    //       item?._id && router.push(`/ad/${item.num}`);
    //       await axios.get(`${urls["test"]}/ad/view/${item._id}`, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //     } catch (error) {
    //       console.error(error);
    //     }
  };

  const amountTime = Math.round(
    (new Date(item.updatedAt ?? "").getTime() +
      (item?.adStatus == "created"
        ? item?.adType == "special"
          ? 24 * 3600 * 5 * 1000
          : item?.adType == "specialM"
          ? 24 * 3600 * 10 * 1000
          : 30 * 3600 * 24000
        : 24 * 3600 * 3 * 1000) -
      Date.now()) /
      (24 * 3600 * 1000)
  );

  return (
    // <Skeleton>
    <Skeleton visible>
      <div
        className={mergeNames(
          "relative overflow-hidden rounded-md md:min-h-[350px] min-h-[300px]  shadow-md bg-zinc-200 group",
          isDelete && item?.adStatus == AdStatus.pending
            ? " border-yellow-400/60 border-4 "
            : "",
          isDelete && item?.adStatus == AdStatus.created
            ? "border-teal-400/60 border-4 "
            : "",
          isDelete && item?.adStatus == AdStatus.deleted
            ? "border-red-400 border-4"
            : ""
        )}
      >
        {/* zarin zurag absolute  */}
        <Link href={`${item.adStatus == "created" ? "/ad/" + item.num : "#"}`}>
          <div className="absolute top-0 bottom-0 left-0 right-0 z-0 w-full h-full cursor-pointer">
            {item?.images && (
              <Image
                src={
                  item?.images?.[0] != undefined
                    ? imageApi + item?.images?.[0]
                    : "/assets/images/noImage.png"
                }
                alt=" зар"
                fit="cover"
                className={mergeNames(
                  "group-hover:scale-125 transition-all w-full object-cover h-full ease-in-out duration-400 aspect-[4/5] relative z-0 ",
                  "text-center grid place-items-center font-bold"
                )}
              />
            )}

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/30 to-slate-900/100"></div>
          </div>
        </Link>
        {/* Zariin body  */}
        <div
          className="relative flex items-start justify-between flex-1 w-full h-0 px-3 py-2 cursor-pointer"
          // onClick={(e) => {
          //   stopPropagation(e);
          //   pushRouter();
          // }}
        >
          {/* {JSON.stringify(item.user)} */}
          <Tip lbl="Зарын эзэн">
            <button
              className={mergeNames(
                "relative overflow-hidden rounded-full w-9 h-9 bg-mainBlossom",
                mine ? "pointer-events-none " : ""
              )}
              onClick={(e) => {
                stopPropagation(e);
                // router.push(`/account/${(item.user as UserModel)._id}`);
              }}
            >
              <Image
                src={profileImgUrl(
                  (item.user as UserModel).profileImg,
                  Assets.logoMiniWhite
                )}
                referrerPolicy="no-referrer"
                alt="BOM logo"
                fit="cover"
                className={mergeNames(
                  (item?.user as UserModel)?.profileImg ? "" : "",
                  "h-full"
                )}
              />
            </button>
          </Tip>

          {isDelete ? (
            // <DButton onClick={deleteFunc} />
            <div
              className="relative z-10 flex flex-col items-center float-right gap-2 rounded-full"
              onMouseEnter={() => setDrop(true)}
              onMouseLeave={() => setDrop(false)}
            >
              <button onClick={() => {}} disabled>
                <BsThreeDots className="z-10 w-8 h-8 p-1 text-lg bg-white rounded-full " />
              </button>
              <div
                className={mergeNames(
                  drop
                    ? "h-auto flex flex-col items-center justify-center top-10 cursor-not-allow opacity-100"
                    : "invisible opacity-0",
                  "transition-all ease-in-out duration-300 overflow-hidden bg-white/30 p-1 rounded-full "
                )}
              >
                <Tip lbl="Онцгой зар болгох">
                  <></>
                  {/* <EditAd
                    ads={data}
                    setData={setData}
                    admin={admin}
                    data={item}
                    onNext={async (e) => {
                      stopPropagation(e);
                      // await axios
                      //   .put(`${urls['test']}/ad/${item._id}`, item, {
                      //     headers: {
                      //       Authorization: `Bearer ${token}`,
                      //       'Access-Control-Allow-Headers': '*',
                      //       'Content-Type': 'application/json',
                      //       charset: 'UTF-8',
                      //     },
                      //   })
                      //   .then((d) => console.log(d.data));
                    }}
                  >
                    <AiFillEdit />
                  </EditAd> */}
                </Tip>
                <div className="h-1" />

                {item.adStatus == "deleted" ? (
                  <Alerting
                    isDelete={"Сэргээх"}
                    btn={<DButton onClick={deleteFunc} isDelete={true} />}
                    onClick={deleteFunc}
                  />
                ) : (
                  <Alerting
                    isDelete={"Устгах"}
                    btn={<DButton onClick={deleteFunc} isDelete={false} />}
                    onClick={deleteFunc}
                  />
                )}

                <div className="h-1" />

                {item.adType == "default" &&
                  item.adStatus == AdStatus.created && (
                    <Tip lbl="Онцгой зар болгох">
                      <Alerting
                        body={
                          <div className="flex flex-col gap-2">
                            &quot;Танаас eunit wallet-с хасагдах болохыг
                            анхаарна уу&quot;
                            <Select
                              placeholder="Онцгой зарын төрөл сонгох"
                              onChange={(e) => {
                                if (e != null && setType != undefined) {
                                  setType(e);
                                }
                              }}
                            >
                              <option value="special">
                                10000 eunit = 5 хоног
                              </option>
                              <option value="specialM">
                                15000 eunit = 10 хоног
                              </option>
                            </Select>
                          </div>
                        }
                        isDelete={"Онцгой зар болгох"}
                        btn={<PButton onClick={deleteFunc} isDelete={false} />}
                        onClick={changeAd}
                      />
                    </Tip>
                  )}
              </div>
            </div>
          ) : (
            <ImageCount onClick={() => {}}>{item?.images?.length}</ImageCount>
          )}
        </div>

        {/* Zariin info  */}
        <div
          className="absolute bottom-0 left-0 flex flex-col justify-end w-full p-2 mb-2 space-y-2 cursor-pointer"
          onClick={(e) => {
            pushRouter();
          }}
        >
          <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
            <p className={mergeNames("font-bold text-xl")}>
              {currency(
                `${item?.items.find((f) => f.id == "price")?.value}`,

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
          <div className="relative flex flex-row justify-between w-full">
            <TextContainer
              title={item.title}
              description={
                item.items?.filter((f) => f.id == "location")?.[0]?.value
              }
            />
            {item.adStatus == "created" && (
              <AdCardButton
                id={item?.num}
                adId={item?._id}
                cateId={(item?.subCategory as CategoryModel)?._id}
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-white font-md">
            <p className={mergeNames("font-semibold text-white mt-0")}>
              {(item?.subCategory as CategoryModel)?.name ?? ""}
            </p>
            <p className={mergeNames("font-semibold text-white mt-0")}>
              {getSellType(item?.sellType)}
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-1">
            {item?.items?.map((p, i) => {
              return (
                <React.Fragment key={i}>
                  <ApartmentIconInfo p={p} />

                  {p.id === "area" && (
                    <ItemContainer
                      lbl={p.name}
                      Icon={({ data, onClick, id, ...props }: ItemType) => (
                        <BiArea {...props} />
                      )}
                      text={calcValue(p.value, "байхгүй", "м.кв")}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {item?.adStatus == "pending" && (
            <p
              className={mergeNames(
                "text-yellow-400 px-3 rounded-md font-bold mx-auto"
              )}
            >
              {/* {item.adStatus} */}
              Хүлээгдэж байна...
            </p>
          )}
          {item?.adStatus == "deleted" && (
            <>
              <p
                className={mergeNames(
                  "text-red-400 px-3 rounded-md font-bold mx-auto"
                )}
              >
                {/* {item.adStatus} */}
                Устгагдсан байна...
              </p>
              {/* <p>{item.updatedAt}</p> */}
            </>
          )}
          {user?._id == item?.user &&
            (item?.adStatus == "created" || item.adStatus == "deleted") && (
              <>
                <p
                  className={mergeNames(
                    "flex items-center gap-1 font-semibold animate-pulse",
                    item?.adStatus == "deleted"
                      ? "text-red-400"
                      : "text-teal-500"
                  )}
                >
                  {/* <CgTimer className="text-lg" /> */}
                  <CircleTimer
                    amountTime={
                      amountTime * (item?.adStatus == "deleted" ? 29.32 : 2.932)
                    }
                  />
                  Устахад
                  {" " + (amountTime < 0 ? 0 : amountTime) + " "}
                  хоног
                </p>
              </>
            )}
        </div>
      </div>
    </Skeleton>
  );
}

const CircleTimer = ({ amountTime }: { amountTime: number }) => {
  return (
    <div className="flex h-[40px] w-[40px] scale-50 -rotate-90">
      <svg width="40" height="40">
        <g>
          <circle
            r="14"
            cx="20"
            cy="20"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="5px"
            strokeDasharray={"87.96"}
            strokeDashoffset="0"
            className="text-gray-300"
          ></circle>
          <circle
            r="14"
            cx="20"
            cy="20"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="5px"
            strokeDasharray={"87.96"}
            strokeDashoffset={amountTime}
            className="text-red-500"
          ></circle>
        </g>
      </svg>
    </div>
  );
};

export const ApartmentIconInfo = ({ p }: { p: AdItemsModel }) => {
  // END YG ROOM MASTERBEDROOM AND BATHROOM IIN MEDEELEL BAIAGA
  return (
    <React.Fragment>
      {p && p.id === "room" && (
        <ItemContainer
          lbl={p.name}
          text={calcValue(p.value, "байхгүй")}
          Icon={({ data, onClick, id, ...props }: ItemType) => (
            <BiDoorOpen {...props} />
          )}
        />
      )}
      {p && p.id === "masterBedroom" && (
        <ItemContainer
          lbl={p.name}
          Icon={({ data, onClick, id, ...props }: ItemType) => (
            <IoBedOutline {...props} />
          )}
          text={calcValue(p.value, "байхгүй")}
        />
      )}
      {p && p.id === "bathroom" && (
        <ItemContainer
          lbl={p.name}
          Icon={({ data, onClick, id, ...props }: ItemType) => (
            <TbBath {...props} />
          )}
          text={calcValue(p.value, "байхгүй")}
        />
      )}
    </React.Fragment>
  );
};

const ItemContainer = ({
  Icon = () => <></>,
  text = "",
  lbl,
}: {
  Icon: ({ data, onClick, id, ...props }: ItemType) => JSX.Element;
  text: string;
  lbl: string;
}) => {
  return (
    <Tip lbl={lbl}>
      <div className="flex flex-row items-center gap-1">
        <Icon className="text-white" />
        <p className="text-white md:text-sm text-[12px]">{text}</p>
      </div>
    </Tip>
  );
};

const TextContainer = ({ title = "", description = "" }) => {
  return (
    <div className="w-2/3">
      <p className="text-sm font-semibold text-white uppercase truncate md:text-[16px]">
        {title}
      </p>
      <p className="text-[12px] md:text-base font-semibold truncate text-slate-200/90 first-letter:uppercase">
        {description}
      </p>
    </div>
  );
};

export const calcValue = (
  props: string,
  checker = "Байхгүй",
  suffix?: string
) => {
  // p?.value?.toLowerCase() === "байхгүй"

  if (props.toString().toLowerCase() === checker) return "0";
  if (props) {
    if (suffix) return `${props} ${suffix}`;
    return props;
  }
  return "-";
};
export default AdCard;
