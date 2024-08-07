"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "../_context";
import MainContainer from "@/components/containers/mainContainer";
import { AdCateIdType } from "@/utils/type";
import { STYLES } from "@/styles";
import { useEffect, useState } from "react";
import { AdModel } from "@/models/ad.model";
import { getManyAds } from "../(api)/ad.api";
import { AdStatus, AdTypes } from "@/config/enum";
import { UserModel } from "@/models/user.model";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { imageApi } from "@/utils/values";
import { BiRightArrowAlt } from "react-icons/bi";
import currency from "currency.js";

export default function ComparePage() {
  const { compare, user }: { compare: AdCateIdType[]; user?: UserModel } =
    useAppContext();
  const router = useRouter();
  const [ads, setAds] = useState<AdModel[]>([]);
  const getAds = async () => {
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
  useEffect(() => {
    if (compare.length > 0) getAds();
  }, []);
  return (
    <div className="">
      <MainContainer>
        <div className="flex bg-white my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col">
            {/* Zariin zurag garchig */}
            <div
              className={`${STYLES.height} h-[250px] sm:h-[350px] w-full border-r border-r-blue`}
            >
              <img
                src="/assets/images/logo/bom-blue-text.png"
                alt="asd"
                className="object-contain h-[full] w-[150px] mx-auto p-5 "
              />
            </div>
            <h2 className="relative font-bold bg-[#eef0f2] p-2 z-0 flex justify-around">
              <span className="bg-[#eef0f2] absolute top-0 left-0 w-full h-full z-[-1]" />
              <span>Мэдээлэл</span> <span>\</span>
              <span className="text-green-700">Үнэ</span>
            </h2>
            {/* Fixed information */}
            <div className="border-r border-r-blue">
              {ads?.[0]?.items?.map((f, index) => (
                <p
                  key={index}
                  className={`${
                    index % 2 == 0 ? " " : "bg-gray-100 "
                  } whitespace-nowrap py-2 px-5`}
                >
                  {f.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-full overflow-x-scroll ">
            {/* Product 1 */}
            {ads?.map((c, i) => {
              return (
                <div key={i}>
                  <div className="min-w-[150px] max-w-[350px] flex-1 border-r border-r-blue">
                    <div
                      className={`${STYLES.height} ${STYLES.flexAround} px-5 py-5 flex-col`}
                    >
                      <Image
                        src={
                          c.images
                            ? imageApi + c.images[0]
                            : "/images/Category/computer.jpg"
                        }
                        alt=""
                        className="min-h-[100px] max-h-[200px]   object-cover mx-auto rounded-xl"
                      />
                      <h1 className="font-bold">{c.title}</h1>
                      <Link
                        href={`/ad/${c.num}`}
                        target="_blank"
                        className="flex flex-row items-center gap-6 px-4 py-1 font-bold text-white bg-blue-500 rounded-2xl"
                        
                      >
                        Орох
                        <BiRightArrowAlt className="text-blue-800 bg-white rounded-full" />
                      </Link>
                    </div>
                    <div className="text-center">
                      {c.items?.map((f, index) => {
                        if (f.id == "price") {
                          return (
                            <h2
                              key={index}
                              className="relative p-2 font-bold text-green-700"
                            >
                              {currency(f.value, {
                                separator: ",",
                                symbol: "₮ ",
                              })
                                .format()
                                .toString()}
                            </h2>
                          );
                        }
                      })}

                      {c.items?.map((f, index) => {
                        return (
                          <p
                            key={index}
                            className={`${
                              index % 2 == 0 ? "" : "bg-gray-100  line-camp-1"
                            } whitespace-nowrap py-2 px-5`}
                          >
                            {f.value.length == 0 ? (
                              <span>-</span>
                            ) : f.id == "price" || f.id == "unitPrice" ? (
                              currency(f.value, {
                                separator: ",",
                                symbol: "₮ ",
                              })
                                .format()
                                .toString()
                            ) : (
                              f.value
                            )}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </div>
  );
}
