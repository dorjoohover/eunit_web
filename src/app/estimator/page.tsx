"use client ";
import FilterDate, {
  FilterSelect,
  FilterText,
} from "@/components/createAd/filters";
import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import FormLabel from "@/components/createAd/formLabel";

import FieldCategory from "@/components/createAd/step1/fieldCategory";

import { ItemContainer } from "@/components/createAd/step4";
import CustomModal from "@/components/global/customModal";
import mergeNames from "@/utils/functions";
import { CreateAdType, ItemType } from "@/utils/type";



import {
  Button,
  NumberInput,
  NumberInputField,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { BiX } from "react-icons/bi";

import { BsChevronDoubleDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useAppContext } from "../_context";
import { CategoryModel } from "@/models/category.model";
export default function EstimatorPage() {
  const [estimate, setEstimate] = useState<CreateAdType>({
    category_ID: "",
    subCategoryId: "",
    file: "",

  });
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [estimates, setEstimates] = useState([]);
  const [est, setEst] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  const getEstimate = async (url = "6468e73ee15122dbb07a4364") => {
    // try {
    //   await axios.get(`${urls["test"]}/category/filters/${url}`).then((d) => {
    //     setEst(d.data?.steps?.[0]?.values ?? []);
    //   });
    // } catch (error) {
    //   console.error(error?.message);
    // }
  };
  const checker = (filters) => {
    return (
      filters == est.length &&
      estimate.file.length != 0 &&
      estimate.categoryId.length != 0 &&
      estimate.subCategoryId.length != 0
    );
  };
  const addEstimate = () => {
    // let filters = [];
    // est.map((v) => {
    //   if (values[v.type] != "" || values[v.type] != undefined)
    //     filters.push({
    //       name: v.name,
    //       id: v.type,
    //       value: values[v.type],
    //       type: v.types,
    //     });
    // });
    // if (checker(filters.length)) {
    //   setEstimates((prev) => [
    //     ...prev,
    //     {
    //       file: estimate.file,
    //       items: filters,
    //       subCategory: estimate.subCategoryId,
    //       category: categories[estimate.categoryId]._id,
    //       sellType: "sell",
    //       status: "pending",
    //     },
    //   ]);
    //   setEstimate({ categoryId: "", subCategoryId: "", file: [] });
    //   clear();
    // } else {
    //   toast({
    //     title: "Та бүх талбарыг бөглөнө үү.",
    //     status: "warning",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    // }
  };

  const sendEstimate = async () => {
    // if (estimates.length == 0) {
    //   await addEstimate();
    // }
    // let count = 0;
    // setIsLoading(true);
    // estimates.map(async (e) => {
    //   try {
    //     let file = "";
    //     let fileUrl = new FormData();
    //     e.items.push({
    //       name: "Утасны дугаар",
    //       id: "phone",
    //       value: values["phone"],
    //     });
    //     e.items.push({
    //       name: "email",
    //       id: "email",
    //       value: user.email,
    //     });

    //     fileUrl.append("images", e.file);
    //     await axios
    //       .post(`${urls["test"]}/ad/uploadFields`, fileUrl, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Access-Control-Allow-Headers": "*",
    //         },
    //       })
    //       .then((d) => {
    //         file = d.data[0];
    //       });
    //     await axios
    //       .post(
    //         `${urls["test"]}/estimate`,
    //         {
    //           file: file,
    //           subCategory: e.subCategory,
    //           category: e.category,
    //           sellType: "sell",
    //           items: e.items,
    //           status: "pending",
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Access-Control-Allow-Headers": "*",
    //             charset: "UTF-8",
    //           },
    //         }
    //       )
    //       .then((d) => {
    //         count++;
    //         console.log(d.data);
    //         toast({
    //           title: "Амжилттай нэмэгдлээ.",
    //           status: "success",
    //           duration: 1000,
    //           isClosable: true,
    //         });
    //       });
    //   } catch (error) {
    //     console.error(error?.message);
    //   }
    // });
    // setIsLoading(false);
    // if (estimates.length == count) setEstimates([]);
  };

  useEffect(() => {
    getEstimate();
  }, []);

  return (
    <section className="px-0 xl:px-28 lg:px-20">
      <div className="flex flex-col items-center">
        {/* <Step1 categories={passcategory} /> */}
        <div className="relative w-full overflow-hidden rounded-b-[50px] ">
          <img
            src="utils/banner/calc-banner-blue.svg"
            className="w-full h-[50vh] object-cover"
            alt=""
          />
          <div className="absolute top-0 left-0 grid items-center justify-around w-full h-full grid-cols-1 gap-20 p-10 pb-4 text-white lg:grid-cols-2 md:pb-16 ">
            <img
              src="utils/banner/calc-image.svg"
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
          <Box text="Хөрөнгийн төрөл" className="justify-center">
            <FieldCategory
              categories={categories}
              setTypes={setEstimate}
              types={estimate}
            />
          </Box>

          {estimate?.category_ID?.length != 0 && (
            <Box text="Хөрөнгийн дэд төрөл" className="justify-center">
              {categories?.map((item, key) => {
                const isSelected = estimate.subCategoryId === item._id;

                return (
                  item.parent == categories?.[estimate!.category_ID!]?._id &&
                  item.parent != null && (
                    <ButtonSelectItem
                      key={key}
                      isSelected={isSelected}
                      text={item?.name}
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
          )}
          {/* <Box label="Үнэлэх төрөл" className="justify-center">
                {categories && (
                  // ZARAH TURUL BOLON ZARIIN TURUL
                  // ZARAH TURUL: SELL OR RENT
                  // ZARIIN TURUL: DEFAULT, SPECIAL, POSTER
                  <>
                    <FieldSellType
                      //   title={selltypeTitle}
                      {...{ estimate, setEstimate }}
                    />
                  </>
                )}
              </Box> */}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {estimate.categoryId?.length != 0 &&
              est?.map((f, i) => {
                if (
                  f.other == true &&
                  f.value.find((v) => v.id == "other") == undefined
                )
                  f.value.push({ id: "other", value: "Бусад" });

                if (f.types == "date")
                  return (
                    <FilterDate
                      key={i}
                      requirement={
                        values[f.type] != "" && values[f.type] != undefined
                          ? false
                          : true
                      }
                      title={f.name}
                      name={f.name}
                      onSelect={(num) => {
                        change(f.type, num, "");
                      }}
                    />
                  );
                if (f.types == "text")
                  return (
                    <FilterText
                      key={i}
                      title={f.name}
                      ph={f.name}
                      value={values[f.type]}
                      onChange={(e) => {
                        e.persist();
                        change(f.type, e.target.value, "");
                      }}
                    />
                  );
                if (f.types == "number")
                  return (
                    <ItemContainer>
                      <FormLabel title={f.name} />
                      <NumberInput
                        className={mergeNames(
                          "relative flex justify-center",
                          // ' w-full',
                          "mx-auto",

                          "md:w-2/3 w-5/6"
                        )}
                        onChange={(e) => {
                          change(f.type, e, "");
                        }}
                        value={values[f.type] ?? ""}
                      >
                        <NumberInputField
                          placeholder={f.name}
                          className={mergeNames(
                            values[f.type] == "" || values[f.type] == undefined
                              ? "border-red-400 ring-red-400"
                              : "border-blue-400/70 ring-blue-400",
                            "w-full px-4 py-2 border-2 rounded-full  "
                          )}
                        />
                      </NumberInput>
                    </ItemContainer>
                  );

                if (f.type == "committee") {
                  return (
                    typeId && (
                      <FilterSelect
                        key={i}
                        requirement={
                          values[f.type] != "" && values[f.type] != undefined
                            ? false
                            : true
                        }
                        label={values[f.type] ?? f.name}
                        title={f.name}
                        data={
                          typeId[f.parentId] != "country"
                            ? Committee
                            : f.value.filter(
                                (v) => v.parentId == typeId[v.parent]
                              )
                        }
                        Item={({ data, onClick, id, ...props }) => {
                          return (
                            <button
                              {...props}
                              onClick={(e) => {
                                e.persist();
                                change(f.type, data, "");
                                onClick();
                              }}
                            >
                              {data}
                              {props.children}
                            </button>
                          );
                        }}
                      />
                    )
                  );
                }
                if (f.types == "dropdown")
                  if (f.parentId == null) {
                    return (
                      <FilterSelect
                        key={i}
                        requirement={
                          values[f.type] != "" && values[f.type] != undefined
                            ? false
                            : true
                        }
                        title={f.name}
                        data={f.value}
                        label={values[f.type] ?? f.name}
                        Item={({ data, onClick, id, ...props }) => {
                          return (
                            <button
                              {...props}
                              onClick={(e) => {
                                e.persist();
                                change(f.type, data, id);
                                onClick();
                              }}
                            >
                              {data}
                              {props.children}
                            </button>
                          );
                        }}
                      />
                    );
                  } else {
                    return (
                      typeId && (
                        <ItemContainer
                          key={i}
                          className={
                            "flex flex-col items-center justify-center"
                          }
                        >
                          <FormLabel title={f.name} />
                          <Select
                            requirement={
                              values[f.type] != "" &&
                              values[f.type] != undefined
                                ? false
                                : true
                            }
                            width="long"
                            data={
                              f.value.filter(
                                (v) =>
                                  (f.parentId == v.parent &&
                                    typeId[f.parentId] == v.parentId) ||
                                  v.id == "other"
                              ).length > 0
                                ? f.value.filter(
                                    (v) =>
                                      (f.parentId == v.parent &&
                                        typeId[f.parentId] == v.parentId) ||
                                      v.id == "other"
                                  )
                                : est
                                    .filter((fil) => fil.type == f.parentId)[0]
                                    .value.filter(
                                      (v) =>
                                        v.id == "B2" ||
                                        v.id == "B1" ||
                                        parseInt(typeId[f.parentId]) >=
                                          parseInt(v.id)
                                    )
                            }
                            label={values[f.type] ?? f.name}
                            Item={({ data, onClick, id, ...props }) => {
                              return (
                                <button
                                  {...props}
                                  onClick={(e) => {
                                    e.persist();
                                    change(f.type, data, id);
                                    onClick();
                                  }}
                                >
                                  {data}
                                  {props.children}
                                </button>
                              );
                            }}
                          />
                          {typeId[f.type] == "other" ? (
                            <Fragment>
                              <Box h={4} />
                              <Input
                                ph={values[f.type]}
                                onChange={(e) => {
                                  change(f.type, e.target.value, "");
                                }}
                                value={
                                  values[f.type] != "Бусад"
                                    ? values[f.type]
                                    : ""
                                }
                              />
                            </Fragment>
                          ) : (
                            <Box />
                          )}
                        </ItemContainer>
                      )
                    );
                  }
              })}

            {estimate.categoryId.length != 0 && (
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
                      console.log(e);
                      change("phone", e, "");
                    }}
                    value={values["phone"] ?? ""}
                  >
                    <NumberInputField
                      placeholder="Холбоо барих утасны дугаар"
                      className={mergeNames(
                        values["phone"] == "" || values["phone"] == undefined
                          ? "border-red-400 ring-red-400"
                          : "border-blue-400/70 ring-blue-400",
                        "w-full px-4 py-2 border-2 rounded-full  "
                      )}
                    />
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
                        setEstimate((prev) => ({
                          ...prev,
                          file: e.target.files[0],
                        }));
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
            <a href="#items">
              <Button
                className="flex flex-col gap-1 px-10 mx-auto"
                onClick={() => addEstimate()}
              >
                <span>Нэмэх</span>
                <BsChevronDoubleDown className="w-3 h-3 animate-bounce" />
              </Button>
            </a>
            {estimates.length == 0 && (
              <Button
                isLoading={loading}
                className={mergeNames(STYLES.blueButton, "  px-10")}
                onClick={() => sendEstimate()}
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
                />
              );
            })}
            <Button
              className={mergeNames(
                STYLES.blueButton,
                "mx-auto col-span-full px-10"
              )}
              isLoading={loading}
              onClick={() => sendEstimate()}
            >
              Илгээх
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

const EstimatorModal = ({ est, index, estimates, setEstimates }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useSelector((state) => state.categories);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      btnClose2={"Буцах"}
      className=""
      btnOpen={
        <div className="w-full relative bg-blue-200 animate-pulse rounded-md h-[100px]  grid place-items-center ">
          <h2 className="flex flex-col">
            <span>Үнэлгээ мэдээлэл: {index}</span>
            <span className="font-bold">ХАРАХ</span>
          </h2>
          <button
            onClick={() => {
              let e = estimates.filter((e, i) => i != index - 1);
              setEstimates(e);
            }}
            className="absolute text-white transition-all bg-gray-500 rounded-full -bottom-2 -right-2 hover:bg-red-500"
          >
            <BiX size={30} />
          </button>
        </div>
      }
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
          <h2>
            Дэд төрөл:&nbsp;
            <span className="font-semibold">
              {categories.filter((c) => c._id == est.subCategory)?.[0]?.name}{" "}
            </span>
          </h2>

          {/* medeelel */}
          {est?.items?.map((item, i) => {
            return (
              <h2>
                {item.name}:
                <span className="font-semibold">&nbsp;{item.value} </span>
              </h2>
            );
          })}
          <h2>
            Хавсаргасан файл: &nbsp;
            <span className="font-semibold">
              {JSON.stringify(est.file.name)}
            </span>
          </h2>
        </div>
      </div>
    </CustomModal>
  );
};

const Box = ({ children, className, text }: ItemType) => {
  return (
    <div className="flex flex-col w-full gap-5">
      <h1 className="font-bold text-center text-1xl text-mainBlossom/85">
        {text}
      </h1>
      <div
        className={mergeNames("flex gap-3 flex-wrap w-full mx-auto", className ?? '')}
      >
        {children}
      </div>
    </div>
  );
};