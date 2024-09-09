"use client";
import FilterDate, {
  FilterSelect,
  FilterText,
  FilterYear,
} from "@/components/createAd/filters";
import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import FormLabel from "@/components/createAd/formLabel";

import FieldCategory from "@/components/createAd/step1/fieldCategory";

import { ItemContainer } from "@/components/createAd/step4";
import CustomModal from "@/components/global/customModal";
import mergeNames from "@/utils/functions";
import {
  CacheVarType,
  CreateAdType,
  EstimateType,
  ItemType,
  StepTypes,
} from "@/utils/type";


import React, { Fragment, useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

import { BsChevronDoubleDown } from "react-icons/bs";

import { useAppContext } from "../_context";
import { CategoryModel } from "@/models/category.model";
import { STYLES } from "@/styles";
import { filterCategoryById } from "../(api)/category.api";
import { getConstants } from "../(api)/constants.api";
import { CommitteeData, ConstantApi } from "@/utils/values";
import { AdSellType, AdStatus, Api, ItemTypes } from "@/config/enum";
import { ItemDetailModel, ItemModel } from "@/models/items.model";
import Input from "@/components/global/input";
import Select from "@/components/global/select";
import { InfoIcon } from "@/components/global/icons";
import Link from "next/link";
import { createEstimate } from "../(api)/estimate.api";
import { UserModel } from "@/models/user.model";
import { getUser } from "../(api)/user.api";
import { notifications } from "@mantine/notifications";
import { Button, Image, NumberInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
export default function EstimatorPage() {
  const [estimate, setEstimate] = useState<CreateAdType>({
    category_ID: "",
    subCategoryId: "",
    file: undefined,
    fileUrl: "",
  });
  const [cache, setCache] = useState<CacheVarType[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [estimates, setEstimates] = useState<EstimateType[]>([]);
  const [est, setEst] = useState<ItemModel[]>([]);
  const [data, setData] = useState<StepTypes>();
  
  // const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const [user, setUser] = useState<UserModel | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      let value = localStorage.getItem("user");
      if (value) {
        setUser(JSON.parse(value));
      } else {
        const data = await getUser();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    };
    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, []);

  const checker = (filters: number) => {
    return (
      filters == est.length &&
      // estimate.file?.length != 0 &&
      estimate.category_ID != ""
      // estimate.subCategoryId.length != 0
    );
  };

  const imageChange = (files: FileList | null) => {
    if (files != null) {
      const file: File = Array.from(files)[0];
      const selectedFilesArray = Array.from(files).map((file, i) => {
        return URL.createObjectURL(file);
      });
      setEstimate((prev) => ({ ...prev, file: file }));
      setEstimate((prev) => ({ ...prev, fileUrl: selectedFilesArray[0] }));
    }
  };
  const getEstimate = async () => {
    setIsLoading(true);
    await filterCategoryById(estimate.category_ID!).then((d) => {
      setEst(d.steps?.[0]?.values);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    if (estimate.category_ID != "") {
      getEstimate();
    }
  }, [estimate]);
  const addEstimate = async (): Promise<boolean> => {
    setIsLoading(true);
    let filters: {
      name: string;
      id: string;
      value: string;
      type: ItemTypes;
    }[] = [];
    est.map((v) => {
      let key: keyof StepTypes;
      key = v.type as keyof StepTypes;

      if (data?.[key] != "" || data?.[key] != undefined)
        filters.push({
          name: v.name,
          id: v.type,
          value: data?.[key] as string,
          type: v.types,
        });
    });
    if (checker(filters.length)) {
      setEstimates((prev) => [
        ...prev,
        {
          file: estimate.file,
          items: filters,
          subCategory: estimate.subCategoryId ?? "",
          category: estimate.category_ID ?? "",
          sellType: AdSellType.sell,
          status: AdStatus.pending,
          fileUrl: estimate.fileUrl,
        },
      ]);
      setEstimate({
        category_ID: "",
        subCategoryId: "",
        file: undefined,
        fileUrl: "",
      });
      setData(undefined);
      setEst([]);
      // clear();
    } else {
      notifications.show({
        message: "Та бүх талбарыг бөглөнө үү.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    return true;
  };

  const sendEstimate = async (direct: boolean) => {
    setIsLoading(true);
    if (direct) {
      let fileUrl = new FormData();
      let items = [];
      items.push({
        name: "Утасны дугаар",
        id: "phone",
        value: data?.["phone"]?.toString() ?? "",
      });
      items.push({
        name: "email",
        id: "email",
        value: user?.email ?? "",
      });

      fileUrl.set(`files`, estimate.file!);
      await createEstimate(items, estimate.category_ID ?? "", fileUrl).then(
        (d) => {
          notifications.show({
            message: "Амжилттай нэмэгдлээ.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        }
      );
    } else {
      estimates.map(async (es) => {
        let fileUrl = new FormData();

        es.items.push({
          name: "Утасны дугаар",
          id: "phone",
          value: data?.["phone"]?.toString() ?? "",
        });
        es.items.push({
          name: "email",
          id: "email",
          value: user?.email ?? "",
        });
        est.map((v) => {
          let key: keyof StepTypes;
          key = v.type as keyof StepTypes;

          if (data?.[key] != "" || data?.[key] != undefined)
            items.push({
              name: v.name,
              id: v.type,
              value: data?.[key] as string,
              type: v.types,
            });
        });
        fileUrl.set(`files`, es.file!);
        const { category, items } = es;
        await createEstimate(items, category, fileUrl).then((d) => {
          notifications.show({
            message: "Амжилттай нэмэгдлээ.",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
        });
      });
    }
    setIsLoading(false);
    // if (estimates.length == count) setEstimates([]);
    // }
    // });
  };
  const getCategory = async () => {
    setIsLoading(true);
    await getConstants(`${ConstantApi.category}true`, Api.GET).then((d) => {
      setCategories(d);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section className="px-0 xl:px-28 lg:px-20">
      <div className="flex flex-col items-center">
        {/* <Step1 categories={passcategory} /> */}
        <div className="relative w-full overflow-hidden rounded-b-[50px] ">
          <Image
            src="/assets/utils/banner/calc-banner-blue.svg"
            className="w-full h-[50vh] object-cover"
            alt=""
          />
          <div className="absolute top-0 left-0 grid items-center justify-around w-full h-full grid-cols-1 gap-20 p-10 pb-4 text-white lg:grid-cols-2 md:pb-16 ">
            <Image
              src="/assets/utils/banner/calc-image.svg"
              alt=""
              className="w-[200px] object-cover absolute top-[20%] left-[60%] lg:left-[20%] opacity-60"
            />
            <div className="hidden lg:block"></div>
            <div className="w-full md:w-4/5 text-[18px] relative z-10 font-semibold ">
              <h1
                className={mergeNames(
                  "md:text-[50px] text-[40px] leading-[50px] mb-5"
                )}
              >
                Хөрөнгийн үнэлгээ
              </h1>
              <p className={mergeNames("md:text-lg text-base")}>
                Өөрийн хөрөнгийн үнэлгээг түргэн шуурхай мэдэж аваарай.
              </p>
            </div>
          </div>
        </div>
        <div className="flex p-5 md:p-10 flex-col gap-5 w-[93%] -translate-y-16 mx-10 bg-white shadow-xl   xl:w-[70%] rounded-3xl">
          <Box data="Хөрөнгийн төрөл" className="justify-center">
            <FieldCategory
              categories={categories}
              setTypes={setEstimate}
              types={estimate}
            />
          </Box>

          {/*  {estimate?.category_ID?.length != 0 && (
            <Box data="Хөрөнгийн дэд төрөл" className="justify-center">
              {JSON.stringify(categories)}
              {categories?.map((item, key) => {
                const isSelected = estimate.subCategoryId === item._id;

                return (
                  item.parent == categories?.[estimate!.category_ID!]?._id &&
                  item.parent != null && (
                    <ButtonSelectItem
                      key={key}
                      isSelected={isSelected}
                      data={item?.name}
                      onClick={() => {
                        setEstimate((prev) => ({
                          ...prev,
                          subCategoryId: item._id,
                        }));
                        if (item.href == "land") {
                          getEstimate("64938023abcdf1d10840508d");
                        } else {
                          getEstimate();
                        }
                      }}
                    />
                  )
                );
              })} 
            </Box>
          )}*/}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {est?.map((f, i) => {
              if (
                f.other == true &&
                f.value?.find((v) => v.id == "other") == undefined
              )
                f.value?.push({ id: "other", value: "Бусад" });
              let cacheSelf = cache.filter((c) => c.parent == f.type)?.[0];
              let cacheParent = cache.filter(
                (c) => c.parent == f.parentId
              )?.[0];
              let cachePosition = cache.filter(
                (c) => c.parent == f.position
              )?.[0];
              let key: keyof StepTypes;
              key = f.type as keyof StepTypes;
              if (f.types == ItemTypes.date)
                return (
                  <FilterDate
                    key={i}
                    requirement={
                      data?.[key] != "" && data?.[key] != undefined
                        ? false
                        : true
                    }
                    title={f.name}
                    name={f.name}
                    onSelect={(num) => {
                      setData((prev) => ({ ...prev, [key]: num }));
                    }}
                  />
                );
              if (f.types == ItemTypes.year)
                return (
                  <FilterYear
                    key={i}
                    title={f.name}
                    name={f.name}
                    onSelect={(num) => {
                      setData((prev) => ({ ...prev, [key]: num }));
                    }}
                  />
                );
              if (f.types == "text")
                return (
                  <FilterText
                    key={i}
                    title={f.name}
                    ph={f.name}
                    value={(data?.[key] as string) ?? ""}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, [key]: e }));
                    }}
                  />
                );
              if (f.types == "number")
                return (
                  <ItemContainer key={i}>
                    <FormLabel title={f.name} />
                    <NumberInput
                      className={mergeNames(
                        "relative flex justify-center",
                        // ' w-full',
                        "mx-auto",

                        "md:w-2/3 w-5/6"
                      )}
                      onChange={(e) => {
                        setData((prev) => ({ ...prev, [key]: e }));
                      }}
                      value={(data?.[key] as string) ?? ""}
                    >
                      {/* <NumberInputField
                        placeholder={f.name}
                        className={mergeNames(
                          data?.[key] == "" ||
                            (data?.[key] as string) == undefined
                            ? "border-red-400 ring-red-400"
                            : "border-blue-400/70 ring-blue-400",
                          "w-full px-4 py-2 border-2 rounded-full  "
                        )}
                      /> */}
                    </NumberInput>
                  </ItemContainer>
                );

              if (f.type == "committee") {
                return (
                  cacheParent?.parent == f.parentId && (
                    <FilterSelect
                      key={i}
                      requirement={
                        data?.[key] != "" && data?.[key] != undefined
                          ? false
                          : true
                      }
                      label={(data?.[key] as string) ?? f.name}
                      title={f.name}
                      data={
                        cacheParent.id != "country"
                          ? CommitteeData
                          : f.value?.filter(
                              (v) => v.parentId == cachePosition?.id
                            )
                      }
                      Item={(items: ItemType) => {
                        let { data, id, onClick } = items;

                        return (
                          <ButtonSelectItem
                            key={id}
                            {...items}
                            data={data ?? ""}
                            onClick={() => {
                              setData((prev) => ({
                                ...prev,
                                [key]: items.data,
                              }));
                              if (onClick != null) {
                                onClick();
                              }
                            }}
                          >
                            <>
                              {data}
                              {items.children}
                            </>
                          </ButtonSelectItem>
                        );
                      }}
                    />
                  )
                );
              }
              if (f.types == ItemTypes.dropdown)
                if (f.parentId == null) {
                  return (
                    <FilterSelect
                      key={i}
                      requirement={
                        data?.[key] != "" && data?.[key] != undefined
                          ? false
                          : true
                      }
                      title={f.name}
                      data={f.value}
                      label={(data?.[key] as string) ?? f.name}
                      Item={({
                        data,
                        onClick,
                        id,
                        children,
                        ...props
                      }: ItemType) => {
                        return (
                          <button
                            key={id}
                            {...props}
                            onClick={(e) => {
                              e.persist();

                              setData((prev) => ({
                                ...prev,
                                [key]: data,
                              }));
                              if (cacheSelf != undefined) {
                                cacheSelf.value = data ?? "";
                                cacheSelf.id = id!;
                              } else {
                                cache.push({
                                  id: id!,
                                  value: data ?? "",
                                  parent: f.type,
                                  position: f.position,
                                });
                              }
                              setCache((prev) => [...prev]);

                              if (onClick != null) onClick();
                            }}
                          >
                            {data}
                            {children}
                          </button>
                        );
                      }}
                    />
                  );
                } else {
                  return (
                    cacheParent?.parent == f.parentId && (
                      <ItemContainer
                        key={i}
                        className={"flex flex-col items-center justify-center"}
                      >
                        <FormLabel title={f.name} />
                        <Select
                          requirement={
                            data?.[key] != undefined && data?.[key] != ""
                              ? false
                              : true
                          }
                          width="long"
                          data={
                            f.value!.filter(
                              (v) =>
                                cacheParent.id == v.parentId || v.id == "other"
                            )?.length > 0
                              ? f.value?.filter(
                                  (v) =>
                                    cacheParent.id == v.parentId ||
                                    v.id == "other"
                                )
                              : (
                                  est!.filter(
                                    (fil) => fil.type == f.parentId
                                  )?.[0].value as ItemDetailModel[]
                                )?.filter(
                                  (v) =>
                                    v.id == "B2" ||
                                    v.id == "B1" ||
                                    parseInt(cacheParent.value ?? "0") >=
                                      parseInt(v.id)
                                )
                          }
                          label={(data?.[key] as string) ?? f.name}
                          Item={(items: ItemType) => {
                            const { data, id, onClick, children } = items;
                            return (
                              <button
                                key={id}
                                {...items}
                                onClick={(e) => {
                                  e.persist();

                                  setData((prev) => ({ ...prev, [key]: data }));
                                  if (cacheSelf != undefined) {
                                    cacheSelf.value = data ?? "";
                                    cacheSelf.id = id!;
                                  } else {
                                    cache.push({
                                      id: id!,
                                      value: data ?? "",
                                      parent: f.type,
                                    });
                                  }
                                  setCache((prev) => [...prev]);

                                  if (onClick != null) {
                                    onClick();
                                  }
                                }}
                              >
                                {data}
                                {children}
                              </button>
                            );
                          }}
                        />
                        {cacheParent.id == "other" ? (
                          <Fragment>
                            <Box className="h-4" data="" />
                            <Input
                              ph={data?.[key] as string}
                              onChange={(num) =>
                                setData((prev) => ({ ...prev, [key]: num }))
                              }
                              value={
                                data?.[key] != "Бусад"
                                  ? (data?.[key] as string)
                                  : ""
                              }
                            />
                          </Fragment>
                        ) : null}
                      </ItemContainer>
                    )
                  );
                }
            })}

            {estimate.category_ID != "" && (
              <>
                <ItemContainer>
                  <FormLabel title={"Холбоо барих утасны дугаар"} />
                  <NumberInput
                    className={mergeNames(
                      "relative flex justify-center",
                      // ' w-full',
                      "mx-auto",

                      "md:w-2/3 w-5/6"
                    )}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, phone: parseInt(`${e}`) }));
                    }}
                    value={data?.phone ?? ""}
                  >
                    {/* <NumberInputField
                      placeholder="Холбоо барих утасны дугаар"
                      className={mergeNames(
                        data?.phone == undefined
                          ? "border-red-400 ring-red-400"
                          : "border-blue-400/70 ring-blue-400",
                        "w-full px-4 py-2 border-2 rounded-full  "
                      )}
                    /> */}
                  </NumberInput>
                </ItemContainer>
                <ItemContainer className="mx-auto">
                  <FormLabel title={"Гэрчилгээний хуулбар"} />
                  <form action="">
                    <input
                      type="file"
                      name="upload"
                      accept="application/pdf"
                      className="bg-blue-100 cursor-pointer "
                      onChange={(e) => {
                        imageChange(e.target.files);
                      }}
                    />
                  </form>
                </ItemContainer>
              </>
            )}
            <p className="flex items-center justify-center gap-1 col-span-full">
              <InfoIcon className="text-lg" />
              Нэмэх товч дээр даран олон үнэлгээний мэдээллийг нэг дор илгээх
              боломжтой.
            </p>
          </div>

          <div className="flex justify-center w-full gap-4 col-span-full">
            <Button
              className="flex flex-col gap-1 px-10 "
              onClick={() => addEstimate()}
            >
              <span>Нэмэх</span>
              <BsChevronDoubleDown className="w-3 h-3 animate-bounce" />
            </Button>

            {estimates.length == 0 && (
              <Button
                loading={loading}
                className={mergeNames(STYLES.blueButton, "  px-10")}
                onClick={() => sendEstimate(true)}
              >
                Илгээх
              </Button>
            )}
          </div>
        </div>
        {estimates.length > 0 && (
          <div
            id="items"
            className="grid grid-cols-4 gap-2 mt-6 p-5 flex-col  w-[93%] -translate-y-16 mx-10 bg-white shadow-xl   xl:w-[70%] rounded-3xl"
          >
            {estimates.map((est, i) => {
              return (
                <EstimatorModal
                  est={est}
                  key={i}
                  index={i + 1}
                  setEstimates={setEstimates}
                  estimates={estimates}
                  categories={categories}
                />
              );
            })}
            <Button
              className={mergeNames(
                STYLES.blueButton,
                "mx-auto col-span-full px-10"
              )}
              loading={loading}
              onClick={() => sendEstimate(false)}
            >
              Илгээх
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

const EstimatorModal = ({
  est,
  index,
  estimates,
  setEstimates,
  categories,
}: {
  categories: CategoryModel[];
  est: EstimateType;
  index: number;
  estimates: EstimateType[];
  setEstimates: React.Dispatch<React.SetStateAction<EstimateType[]>>;
}) => {
  const  [opened, { open, close }] = useDisclosure();

  return (
    <CustomModal
      isOpen={opened}
      onClose={close}
      onOpen={open}
      btnClose2={"Буцах"}
      className=""
      btnOpen={
        <div className="w-full relative bg-blue-200 animate-pulse rounded-md h-[100px]  grid place-items-center ">
          <h2 className="flex flex-col">
            <span>Үнэлгээ мэдээлэл: {index}</span>
            <span className="font-bold">ХАРАХ</span>
          </h2>
          <button
            onClick={(e) => {
              e.persist();
              let es = estimates.filter((e, i) => i != index - 1);
              setEstimates(es);
            }}
            className="absolute text-white transition-all bg-gray-500 rounded-full -bottom-2 -right-2 hover:bg-red-500"
          >
            <BiX size={30} />
          </button>
        </div>
      }
      onclick={() => {}}
      header="Үнэлгээ хийлгэх хөрөнгийн мэдээлэл"
    >
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-3 text-lg ">
          <h2>
            Төрөл:&nbsp;
            <span className="font-semibold">
              {categories.filter((c) => c._id == est.category)?.[0]?.name}
            </span>
          </h2>
          {/* <h2>
            Дэд төрөл:&nbsp;
            <span className="font-semibold">
              {categories.filter((c) => c._id == est.subCategory)?.[0]?.name}{" "}
            </span>
          </h2> */}

          {/* medeelel */}
          {est?.items?.map((item, i) => {
            return (
              <h2 key={i}>
                {item.name}:
                <span className="font-semibold">&nbsp;{item.value} </span>
              </h2>
            );
          })}
          <h2>
            Хавсаргасан файл: &nbsp;
            <Link href={est.fileUrl ?? "/"} target="_blank">
              <span className="font-semibold">Файл</span>
            </Link>
          </h2>
        </div>
      </div>
    </CustomModal>
  );
};

const Box = ({ children, className, data }: ItemType) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="font-bold text-center text-1xl text-mainBlossom/85">
        {data}
      </h1>
      <div
        className={mergeNames(
          "flex gap-3 flex-wrap w-full mx-auto",
          className ?? ""
        )}
      >
        {children}
      </div>
    </div>
  );
};
