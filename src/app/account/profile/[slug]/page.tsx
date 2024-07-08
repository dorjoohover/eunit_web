"use client";

import { getManyAds } from "@/app/(api)/ad.api";
import { getUserById } from "@/app/(api)/user.api";
import { SharingAds, UserAds } from "@/components/account/card";
import Socials from "@/components/account/details/socials";
import AdContent from "@/components/ad/adContent";
import MainContainer from "@/components/containers/mainContainer";
import { AdStatus, AdTypes, SocialsEnum } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import { STYLES } from "@/styles";
import mergeNames, { imageExists } from "@/utils/functions";
import { FetchAdUnitType, SocialType } from "@/utils/type";
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function ProfileDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [user, setUser] = useState<UserModel>();
  const [socials, setSocials] = useState<SocialType[]>([]);
  const [ads, setAds] = useState<FetchAdUnitType>();
  const [sharedAds, setSharedAds] = useState<FetchAdUnitType>();
  const [profile, setProfile] = useState<string>();
  const [content, setContent] = useState("UserAds");
  const getAds = async (data: string[]) => {
    const res = await getManyAds(
      0,
      false,
      10,
      AdStatus.created,
      AdTypes.all,
      data,
      0
    );
    setAds(res);

    const shared = await getManyAds(
      0,
      false,
      10,
      AdStatus.created,
      AdTypes.sharing,
      data,
      0
    );

    setSharedAds(shared);
  };

  const getUser = async () => {
    if (params?.slug != "") {
      await getUserById(params.slug).then(async (d) => {
        if (typeof d != "boolean") {
          setUser(d);
          setSocials([
            {
              name: SocialsEnum.facebook,
              url: d?.socials?.[0]?.url ?? "",
            },
            {
              name: SocialsEnum.instagram,
              url: d?.socials?.[1]?.url ?? "",
            },
            {
              name: SocialsEnum.telegram,
              url: d?.socials?.[2]?.url ?? "",
            },
          ]);
          getAds(d.ads);
          let p = await imageExists(d?.profileImg ?? "");
          setProfile(p);
        }
      });
    }
  };
  useEffect(() => {
    getUser();
  }, [params.slug]);
  const tabs = [
    {
      tabHeader: "Зарууд",
      title: "UserAds",

      comp: <UserAds ads={ads} />,
    },
    {
      tabHeader: "Хуваалцсан зарууд",
      title: "SharingAds",
      comp: <SharingAds ads={sharedAds} />,
    },
  ];

  return (
    <MainContainer py={5}>
      <div className={mergeNames("flex flex-col gap-3 px-2")}>
        <div
          className={mergeNames(
            "w-full p-3 sm:p-6 md:p-10 bg-white shadow-xl rounded-xl",
            "flex flex-row"
          )}
        >
          <div
            className={mergeNames(
              STYLES.flexCenter,
              "flex-col w-full items-center gap-4 md:gap-16 sm:flex-row"
            )}
          >
            <Image
              src={
                profile ??
                "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
              }
              alt="User"
              className={mergeNames(
                "h-[75px] w-[75px] md:h-[150px] md:w-[150px] border border-gray-300",
                "rounded-full aspect-square object-cover"
              )}
            />

            <div className="flex flex-col w-full gap-5">
              {/* //TODO: Profile name, agent type */}
              <div
                className={mergeNames(
                  STYLES.flexBetween,
                  "xs:flex-row flex-col w-full sm:justify-between justify-around items-center gap-2 xs:text-left text-center"
                )}
              >
                <div>
                  <h1 className="text-lg font-bold md:text-3xl">
                    {user?.username}
                  </h1>
                  <h3 className="font-bold text-blue-600 capitalize text-md">
                    {user?.userType == "default"
                      ? "Энгийн"
                      : user?.userType == "agent"
                      ? "Агент"
                      : user?.userType == "organization"
                      ? "Байгууллага"
                      : user?.userType}
                  </h3>
                </div>
                {user?.phone && (
                  <Link
                    className={mergeNames(
                      STYLES.flexCenter,
                      "items-center",
                      "px-4 py-2 text-md md:text-lg font-bold text-white bg-blue-600 rounded-md cursor-pointer gap-1 md:gap-2"
                    )}
                    href={`tel:${user?.phone}`}
                  >
                    <FaPhoneAlt /> +976 {user?.phone}
                  </Link>
                )}
              </div>
              {/* //TODO: Social Hayg */}

              {user?.socials && (
                <Socials
                  socials={socials}
                  edit={false}
                  setSocials={setSocials}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-5 border-b cursor-pointer border-b-bgGrey lg:text-base text-[12px]">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={mergeNames("pb-3 relative")}
                onClick={() => {
                  setContent(tab.title);
                }}
              >
                {tab.tabHeader}
                <div
                  className={mergeNames(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 bg-mainBlue h-[2px]  duration-300",
                    content === tab.title ? "w-full " : "w-0"
                  )}
                ></div>
              </button>
            );
          })}
        </div>

        <div className="min-h-[40vh]">
          {tabs.map((tab, index) => {
            return (
              tab.title && (
                <div
                  className={
                    mergeNames()

                    // tab.title && tab.comp ? "block" : "hidden"
                  }
                  key={index}
                >
                  {content === tab.title && tab.comp}
                </div>
              )
            );
          })}
        </div>
      </div>
    </MainContainer>
  );
}
