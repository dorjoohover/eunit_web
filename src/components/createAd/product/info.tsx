"use client";
import { AdModel } from "@/models/ad.model";
import { ItemModel } from "@/models/items.model";
import mergeNames from "@/utils/functions";
import { Button, GridItem, Stack, Text } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import ProductInfoValue from "./productInfoValue";
import { FiltersContainer } from "../step4/filter";
import { ItemType } from "@/utils/type";
import { ItemTypes } from "@/config/enum";

export default function ProductInfo({
  title,
  value,
  id,

  href,
  type,

  func,
  // setEditData,
  edit,
  editData,
  classnames,
  // admin,
  cateId,
}: // editFunc = () => {},
{
  title: string;
  value: string;
  id?: string;
  href?: boolean;
  type?: string;

  func?: () => void;
  setEditData?: React.Dispatch<React.SetStateAction<AdModel>>;
  edit?: boolean;
  editData?: AdModel;
  classnames?: string;
  // admin?: boolean;
  cateId?: string;
  // editFunc?: () => void;
}) {
  const [localData, setData] = useState<ItemModel>();
  const [other, setOther] = useState(false);

  // let dummy = { ...editData };
  return (
    <Fragment>
      {href && (
        <p
          className={mergeNames(
            id === "price"
              ? "mt-3 text-xl font-bold col-span-full block"
              : "hidden"
          )}
        >
          Бусад мэдээлэл
        </p>
      )}
      <GridItem
        className={mergeNames(
          title?.length > 30
            ? "product__info col-span-full md:col-span-2 lg:col-span-1 row-start-1"
            : "product__info",
          "bg-white shadow rounded-md",
          classnames ?? ""
        )}
      >
        <Stack
          direction={"row"}
          className={mergeNames("p-2 rounded-md")}
          onClick={href ? () => {} : func}
        >
          <div className="flex flex-col w-full pl-2 text-left sm:pl-5">
            <Text fontSize={{ base: "13px", xl: "15px" }}>{title}: </Text>
            {!localData && (
              <ProductInfoValue
                href={href ?? false}
                id={id ?? ""}
                value={value}
                cateId={cateId ?? ""}
              />
            )}

            {localData && (
              <FiltersContainer
                selectedOther={other}
                other={localData.other ?? false}
                value={localData.value}
                name={localData.name}
                defValue={value}
                types={localData.types}
                ph={value}
                label={value}
                onChange={(e) => {
                  // if (typeof e == "string" || typeof e == "number") {
                  //   dummy?.filters.map((df: any) => {
                  //     if (df.type == localData.type) {
                  //       df.input = e;
                  //     }
                  //   });
                  //   if (!admin) {
                  //     setEditData(dummy);
                  //   }
                  // } else {
                  //   dummy?.filters.map((df: any) => {
                  //     if (df.type == localData.type) {
                  //       df.input = e;
                  //     }
                  //   });
                  //   if (!admin) {
                  //     setEditData(dummy);
                  //   }
                  // }
                }}
                Item={({ data, onClick, id, ...props }: ItemType) => {
                  return (
                    <button
                      {...props}
                      onClick={() => {
                        // if (data == "Бусад") {
                        //   setOther(true);
                        // } else {
                        //   setOther(false);
                        //   dummy?.filters.map((df: any) => {
                        //     if (df.type == localData.type) {
                        //       df.input = data;
                        //     }
                        //   });
                        //   if (!admin) {
                        //     setEditData(dummy);
                        //   }
                        // }
                        if (onClick != null) onClick();
                      }}
                    >
                      {data}
                      {/* {props.children} */}
                    </button>
                  );
                }}
              />
            )}
          </div>
          {edit && (
            <Button
              onClick={async () => {
                if (type != "sellType") {
                  // await axios.get(`${urls["test"]}/items/${type}`).then((d) => {
                  //   setData(d.data);
                  // });
                } else {
                  setData({
                    value: [
                      {
                        id: "sell",
                        value: "Зарах",
                      },
                      {
                        id: "rent",
                        value: "Түрээслүүлэх",
                      },
                      {
                        id: "sellRent",
                        value: "Зарах, түрээслүүлэх",
                      },
                    ],
                    name: "Борлуулах төрөл",
                    types: ItemTypes.dropdown,
                    type: type,
                  });
                }
              }}
            >
              edit
            </Button>
          )}
        </Stack>
      </GridItem>
    </Fragment>
  );
}
