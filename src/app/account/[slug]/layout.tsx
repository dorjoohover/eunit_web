import MainContainer from "@/components/containers/mainContainer";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import Link from "next/link";

export default function AccountDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const tabs = [
    {
      tabHeader: "Хувийн мэдээлэл",
      title: "Profile",
    },
    {
      tabHeader: "Миний зарууд",
      title: "MyAds",
    },
    {
      tabHeader: "Хуваалцсан зарууд",
      title: "SharedAds",
    },
    {
      tabHeader: "Миний хүслүүд",
      title: "Bookmark",
    },
    {
      tabHeader: "Хэтэвч",
      title: "WalletPage",
    },
    {
      tabHeader: "Үнэлгээ",
      title: "Estimated",
    },
  ];
  return (
    <MainContainer py={5}>
      <div
        className={mergeNames(STYLES.flexCenter, "flex-col gap-3 md:flex-row ")}
      >
        <div className="mx-auto md:mx-0">{/* <Dashboard user={user} /> */}</div>

        <div
          className={mergeNames(
            params.slug.toLowerCase() === "profile"
              ? "md:w-[800px] w-full"
              : "w-[100%]",
            "relative bg-white shadow-lg rounded-2xl w-full p-5 md:p-10",
            "transition-all duration-500"
          )}
        >
          {" "}
          <div className="flex flex-row gap-5 border-b account-tabs whitespace-nowrap overflow-x-scroll sm:overflow-x-visible cursor-pointer border-b-bgGrey lg:text-base text-[12px]">
            {tabs.map((tab, index) => {
              return (
                <Link
                  href={"/account/" + tab.title.toLowerCase()}
                  key={index}
                  className={mergeNames(
                    "pb-3 relative "
                    // content === tab.title
                    //   ? "border-b-2 border-mainBlue"
                    //   : "border-none"
                  )}
                >
                  <div
                    className={mergeNames(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 bg-mainBlue h-[2px]  duration-300",
                      params.slug.toLowerCase() === tab.title.toLowerCase()
                        ? "w-full "
                        : "w-0"
                    )}
                  ></div>
                  {tab.tabHeader}
                </Link>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </MainContainer>
  );
}
