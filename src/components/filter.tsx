import { filterCategoryById } from "@/app/(api)/category.api";
import { AdSellType, AdTypes } from "@/config/enum";
import { CategoryModel, CategoryStepsModel } from "@/models/category.model";
import { ItemDetailModel, ItemModel } from "@/models/items.model";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { AdFilterType, ItemType, StepTypes } from "@/utils/type";
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdFilterList } from "react-icons/md";
import FilterStack from "./global/filterStack";
import Select from "./global/select";
import { getFilteredAd } from "@/app/(api)/ad.api";
import { SellTypesString } from "@/utils/values";
import { useAppContext } from "@/app/_context";

const FilterLayout = ({
  data,
  isOpenMap,
}: {
  data: string;
  isOpenMap: () => void;
}) => {
  const [category, setCategory] = useState<CategoryModel>();
  const [step, setSteps] = useState<CategoryStepsModel[]>([]);
  const router = useRouter();
  const [value, setValue] = useState(data);
  const [adType, setAdType] = useState([0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<StepTypes>();
  const { setAds } = useAppContext();
  const getItems = async (id: string, step: boolean) => {
    try {
      await filterCategoryById(id).then((d) => {
        step ? setSteps(d.steps) : setCategory(d);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getItems(data, false);
  }, []);
  const filterAd = async () => {
    try {
      let items: AdFilterType[] = [];
      let types: string[] = [];
      adType.map((a) => {
        SellTypesString[a];
      });
      if (values != undefined) {
        for (const [k, v] of Object.entries(values!)) {
          let arr = k.split("-");
          if (arr.length > 1) {
            let item = items.filter((i) => i.id == arr[0]);
            let val = Number(v);
            item.length > 0
              ? arr[1] == "min"
                ? (item[0].min = val)
                : (item[0].max = val)
              : arr[1] == "min"
              ? item.push({
                  id: arr[0],
                  min: val,
                })
              : item.push({
                  id: arr[0],
                  max: val,
                });
          } else {
            items.push({
              id: arr[0],
              value: v.toString(),
            });
          }
        }
      }
      let cateId: string | undefined = (
        category?.subCategory as CategoryModel[]
      )?.filter((f) => f.href == value)?.[0]._id;

      if (cateId == undefined) cateId = category?._id;

      await getFilteredAd(cateId!, 0, AdTypes.all, types, items).then((d) => {
        console.log(d);
        setAds(d);
        close();
        setValues(undefined);
        setAdType([0]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <button
        // ref={btnRef}
        color="teal"
        onClick={onOpen}
        className={mergeNames(
          " bg-blue-600 rounded-md text-white font-bold h-[50px]",
          STYLES.flexCenter,
          "relative ",
          "px-5 ",
          "flex gap-2 items-center"
        )}
      >
        Шүүлтүүр
        <MdFilterList />
      </button>

      <Drawer
        isOpen={isOpen}
        // placement={{ base: 'bottom', md: 'left' }}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <FilterStack>
              <Heading variant={"smallHeading"} mb={2}>
                Үл хөдлөх хөрөнгө
              </Heading>
              {category && (
                <RadioGroup
                  onChange={setValue}
                  value={value}
                  className="flex flex-col gap-2"
                >
                  {(data == category?._id ||
                    (category?.subCategory as CategoryModel[])?.findIndex(
                      (s) => s.href == data
                    ) > -1) &&
                    (category?.subCategory as CategoryModel[])?.map(
                      ({ href, _id, name }, i) => {
                        return (
                          href != "shared" && (
                            <Radio
                              value={href}
                              key={i}
                              onChange={(e) => {
                                getItems(e.target.value, true);
                              }}
                              _selected={{ font: "bold" }}
                            >
                              <Text>{name}</Text>
                            </Radio>
                          )
                        );
                      }
                    )}
                </RadioGroup>
              )}
            </FilterStack>

            <FilterStack>
              <Heading variant={"smallHeading"} mb={2}>
                Борлуулах төрөл
              </Heading>
              {SellTypesString.map((s, i) => {
                return (
                  <Checkbox
                    key={i}
                    borderColor={"mainBlue"}
                    defaultChecked={adType.find((a) => a == i) != undefined}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAdType((prev) => [...prev, i]);
                      } else {
                        setAdType(adType.filter((a) => a != i));
                      }
                    }}
                  >
                    {s}.
                  </Checkbox>
                );
              })}
            </FilterStack>
            <FilterStack>
              <Heading variant={"smallHeading"} mb={2}>
                Байршлаар
              </Heading>

              <button className="relative z-10 w-full h-32 overflow-hidden border-g ray-200 border-1 rounded-2xl">
                {/* end map gargana */}
                <div onClick={isOpenMap} className="relative z-0 h-full" />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
                  className="absolute top-0 left-0 h-full -z-10"
                />
              </button>
            </FilterStack>

            {step.length > 0 && (
              <FilterStack>
                <Heading variant={"smallHeading"}>Нэмэлт хайлт</Heading>

                {step?.map((f) => {
                  return (f.values as ItemModel[])?.map((v, i) => {
                    let key: keyof StepTypes;
                    key = v.type as keyof StepTypes;

                    let parentKey: keyof StepTypes;
                    parentKey = v.parentId as keyof StepTypes;
                    let value = v.value?.filter(
                      (a) => a.id == (values?.[key] as string)
                    )?.[0];
                    return v.isSearch &&
                      (v.value as ItemDetailModel[])?.length > 0 ? (
                      <Select
                        requirement={false}
                        label={value?.value ?? v.name}
                        width="large"
                        data={
                          v.parentId != null
                            ? v.value?.filter(
                                (val) => val.parentId == values?.[parentKey]
                              )
                            : v.value
                        }
                        key={i}
                        Item={(props: ItemType) => {
                          return (
                            <button
                              {...props}
                              onClick={() => {
                                setValues((prev) => ({
                                  ...prev,
                                  [key]: props.id,
                                }));

                                props.onClick();
                              }}
                            >
                              {props.text}

                              {props.children}
                            </button>
                          );
                        }}
                      >
                        {/* {(v.value as ItemDetailModel[])?.map((item, i) => {
                        return (
                          <option key={i} value={item.value}>
                            {item.value}
                          </option>
                        );
                      })} */}
                      </Select>
                    ) : (
                      v.isSearch && (
                        <VStack flex={1} key={i}>
                          <Heading variant={"smallHeading"}>{v.name}</Heading>
                          <Flex alignItems={"center"} gap={2}>
                            <Input
                              type="number"
                              placeholder="Доод"
                              className="border-blue-400 rounded-full lue-400 border-1"
                              onChange={(e) => {
                                setValues((prev) => ({
                                  ...prev,
                                  [`${key}-min` as keyof StepTypes]:
                                    e.target.value,
                                }));
                              }}
                            />
                            <Text>-</Text>
                            <Input
                              type="number"
                              placeholder="Дээд"
                              className="border-blue-400 rounded-full lue-400 border-1 focus:outline-none"
                              onChange={(e) => {
                                setValues((prev) => ({
                                  ...prev,
                                  [`${key}-max` as keyof StepTypes]:
                                    e.target.value,
                                }));
                              }}
                            />
                          </Flex>
                        </VStack>
                      )
                    );
                  });
                })}

                <Button
                  variant={"blueButton"}
                  mx={4}
                  onClick={() => filterAd()}
                >
                  Хайх
                </Button>
              </FilterStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

// 310

export default FilterLayout;
