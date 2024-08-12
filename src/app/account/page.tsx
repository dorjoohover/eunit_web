"use client";

import { STYLES } from "@/styles/index";

import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useAppContext } from "../_context";
import Profile from "@/components/account/profile";
import MainContainer from "@/components/containers/mainContainer";
import mergeNames from "@/utils/functions";

const Account = () => {
  const params = useSearchParams();
  const [content, setContent] = useState(params.get("tab"));
  const { user } = useAppContext();

  const tabs = [
    {
      tabHeader: "Хувийн мэдээлэл",
      title: "Profile",

      comp: <Profile user={user} />,
    },
    {
      tabHeader: "Миний зарууд",
      title: "MyAds",

      // comp: <MyAds />,
    },
    // {
    //   tabHeader: "Хуваалцсан зарууд",
    //   title: "SharedAds",

    //   comp: <SharedAds user={user?.ads} />,
    // },
    // {
    //   tabHeader: "Миний хүслүүд",
    //   title: "Bookmark",

    //   comp: <Bookmark user={user} />,
    // },
    // {
    //   tabHeader: "Хэтэвч",
    //   title: "WalletPage",

    //   comp: <WalletPage user={user} />,
    // },
    // {
    //   tabHeader: "Үнэлгээ",
    //   title: "Estimated",
    //   comp: <Estimated />,
    // },
  ];
  useEffect(() => {
    if (params.get("tab") != null) {
      setContent(params.get("tab")!);
    }
  }, [params]);

  // const { tabs, loading, error } = useRemoteData();

  return (
    <MainContainer py={5}>
      <div
        className={mergeNames(STYLES.flexCenter, "flex-col gap-3 md:flex-row ")}
      >
        <div className="mx-auto md:mx-0">{/* <Dashboard user={user} /> */}</div>

        <div
          className={mergeNames(
            content === "Profile" ? "md:w-[800px] w-full" : "w-[100%]",
            "relative bg-white shadow-lg rounded-2xl w-full p-5 md:p-10",
            "transition-all duration-500"
          )}
        >
          <div className="flex flex-row gap-5 border-b account-tabs whitespace-nowrap overflow-x-scroll sm:overflow-x-visible cursor-pointer border-b-bgGrey lg:text-base text-[12px]">
            {tabs.map((tab, index) => {
              return (
                <button
                  key={index}
                  className={mergeNames(
                    "pb-3 relative "
                    // content === tab.title
                    //   ? "border-b-2 border-mainBlue"
                    //   : "border-none"
                  )}
                  onClick={() => {
                    setContent(tab.title);
                    //  router.push("/account");
                  }}
                >
                  <div
                    className={mergeNames(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 bg-mainBlue h-[2px]  duration-300",
                      content === tab.title ? "w-full " : "w-0"
                    )}
                  ></div>
                  {tab.tabHeader}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Account;
