import { useRouter } from "next/navigation";
import { AiOutlineArrowRight } from "react-icons/ai";

import { STYLES } from "@/styles/index";

import { Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import mergeNames from "@/utils/functions";
import { ContainerXP } from "../container";
import { SectionTitle } from "../global/title";
import ProCard from "./proCard";
import SwiperNav from "../global/swiperNav";
import { SwiperSlide } from "swiper/react";
import { FetchAdUnitType } from "@/utils/type";

const ProAdContent = ({
  inCat = true,
  pg = true,
  showLink,
  data,
  title = "Үл хөдлөх хөрөнгө",
  url = "realState",
  n = 20,
  nm = 0,
  func,
}: {
  inCat: boolean;
  pg?: boolean;
  showLink: any;
  data: FetchAdUnitType;
  title: string;
  url?: string;
  n?: number;
  nm?: number;
  func?: (num: number) => {};
}) => {
  const [num, setNum] = useState<number>(nm ?? 0);
  const router = useRouter();

  return (
    <ContainerXP className="pb-10">
      <div className="flex flex-row items-center justify-between mt-4 mb-4 md:mt-6">
        <div className="pl-4 text-left">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <button
          onClick={() => router.push(`category/${url}`)}
          className={mergeNames(showLink, "flex items-center")}
        >
          <p className="text-sm font-semibold">Бүгд</p>
          <AiOutlineArrowRight size={12} />
        </button>
      </div>

      {inCat ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {data?.ads?.map((item, i) => {
            return <ProCard key={i} item={item || {}} />;
          })}
        </div>
      ) : (
        <SwiperNav pro={true}>
          {data?.ads?.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <ProCard item={item || {}} />
              </SwiperSlide>
            );
          })}
        </SwiperNav>
      )}
      {!data && <Skeleton height={"300px"} />}

      {pg && data?.limit > n && (
        <ul className="flex float-right list-style-none">
          <li className="mx-2 disabled">
            <button
              className={mergeNames(STYLES.notActive)}
              onClick={() => {
                if (num > 0) {
                  if (func != null) func(num - 1);
                  setNum(num - 1);
                }
              }}
            >
              Өмнөх
            </button>
          </li>

          {data?.limit &&
            [...Array(Math.ceil(data.limit / n)).keys()].map((l, i) => {
              // [...Array(Math.ceil(data.limit / n)).keys()].map((l) => {
              return (
                <li className={l == num ? "active" : ""} key={i}>
                  <button
                    className={mergeNames(
                      l == num ? STYLES.active : STYLES.notActive
                    )}
                    onClick={() => {
                      setNum(l);
                      if (func != null) func(l);
                    }}
                  >
                    {l + 1}
                  </button>
                </li>
              );
            })}

          <li className="mx-2 disabled">
            <button
              className={mergeNames(STYLES.notActive)}
              onClick={() => {
                if (data.limit > 20) {
                  if (func != null) func(num);
                  setNum(num + 1);
                }
              }}
            >
              Дараах
            </button>
          </li>
        </ul>
      )}
    </ContainerXP>
  );
};

export default ProAdContent;
