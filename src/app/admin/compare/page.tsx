"use client";
import { getLocationForEstimator } from "@/app/(api)/ad.api";
import { STYLES } from "@/styles";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AdDataModel } from "../estimator/page";
import MainContainer from "@/components/containers/mainContainer";
import currency from "currency.js";
import { ItemModel } from "@/models/items.model";
import * as XLSX from "xlsx";

const Page = () => {
  const [data, setData] = useState<AdDataModel[]>([]);
  const [items, setItems] = useState<ItemModel[]>([]);
  const searchParams = useSearchParams();
  const params = {
    id: searchParams.get("id"),
    ids: searchParams.get("ids"),
  };
  const getData = async () => {
    await getLocationForEstimator(
      "data",
      params.ids ?? "",
      parseInt(params.id ?? "0")
    ).then((d) => {
      setData(d[0].data);

      setItems(d[0].items);
    });
  };
  useEffect(() => {
    getData();
  }, [params]);
  const downloadExcel = async () => {
    const wsData: (string | number | undefined)[][] = [
      [
        "Дугаар",
        "Огноо",
        ...items.map((item) => item?.name),
        "Гарчиг",
        "Дэлгэрэнгүй",
      ],
    ];

    data.map((d) => {
      let ws = [
        d.id,
        d.date,
        ...items.map((item) => {
          let key: keyof AdDataModel;
          key = item?.type as keyof AdDataModel;
          return d[key] ? d[key] : "";
        }),
        d.title,
        d.description,
      ];
      wsData.push(ws);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Үр дүн");

    XLSX.writeFile(wb, `test.xlsx`);
  };
  return (
    <div className="">
      <MainContainer>
        <button
          className="px-8 rounded-md py-2 my-10 mb-5 bg-green-500 text-white"
          onClick={() => downloadExcel()}
        >
          Excel татах
        </button>
      </MainContainer>
      <MainContainer>
        <div className="flex bg-white mb-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col">
            {/* Zariin zurag garchig */}
            <div
              className={`h-[150px] sm:h-[250px] w-full border-r border-r-blue`}
            >
              <img
                src="/assets/images/logo/bom-blue-text.png"
                alt="asd"
                className="object-contain h-full w-[150px] mx-auto p-5 "
              />
            </div>
            <h2 className="relative font-bold bg-[#eef0f2] p-2 z-0 flex justify-around">
              <span className="bg-[#eef0f2] absolute top-0 left-0 w-full h-full z-[-1]" />
              <span>Мэдээлэл</span> <span>\</span>
              <span className="text-green-700">Үнэ</span>
            </h2>
            {/* Fixed information */}
            <div className="border-r border-r-blue">
              {[
                { name: "Дугаар" },
                ...items.filter((item) => item.type != "price"),
              ]?.map((f, index) => (
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
            {data.map((d, i) => {
              return (
                <div key={i}>
                  <div className="min-w-[150px] max-w-[350px] flex-1 border-r border-r-blue">
                    <div
                      className={`h-[150px] sm:h-[250px] ${STYLES.flexAround} px-5 py-5 flex-col`}
                    >
                      <h1 className="font-bold">{d.title}</h1>
                    </div>
                    <div className="text-center">
                      <h2 className="relative p-2 bg-gray-100  line-camp-1 font-bold text-green-700">
                        {currency(d.price, {
                          separator: ",",
                          symbol: "₮ ",
                        })
                          .format()
                          .toString()}
                      </h2>
                    </div>
                    <p className={` whitespace-nowrap py-2 px-5`}>{d.id}</p>
                    {items
                      .filter((item) => item.type != "price")
                      .map((item, index) => {
                        let key: keyof AdDataModel;
                        key = item?.type as keyof AdDataModel;
                        let value = d[key];

                        return (
                          <p
                            key={index}
                            className={`${
                              index % 2 == 1 ? "" : "bg-gray-100  line-camp-1"
                            } whitespace-nowrap py-2 px-5`}
                          >
                            {`${value}`.length == 0 ? <span>-</span> : value}
                          </p>
                        );
                      })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Page;
