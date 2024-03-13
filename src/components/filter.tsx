import { filterCategoryById } from "@/app/(api)/category.api";
import { AdSellType } from "@/config/enum";
import { CategoryModel, CategoryStepsModel } from "@/models/category.model";
import { ItemDetailModel, ItemModel } from "@/models/items.model";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { AdFilterType, StepTypes } from "@/utils/type";
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

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MdFilterList } from "react-icons/md";
import FilterStack from "./global/filterStack";
import Select from "./global/select";

const FilterLayout = ({
  data,
  isOpenMap,
}: {
  data: string;
  isOpenMap: () => void;
}) => {
  const [category, setCategory] = useState<CategoryModel>();
  const router = useRouter();
  const [value, setValue] = useState(data);
  const [adType, setAdType] = useState([0]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<AdFilterType[]>([]);
  // const [values, handle, typeId, min, max, clear] = useFilter();

  const getItems = async (id: string) => {
    try {
      await filterCategoryById(id).then((d) => {
        setCategory(d);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getItems(data);
  }, []);
  const filterAd = async () => {
    try {
      let types: AdSellType[] = [];
      adType.map((a) => {
        switch (a) {
          case 0:
            types.push(AdSellType.sell);
            break;
          case 1:
            types.push(AdSellType.rent);
            break;
          case 2:
            types.push(AdSellType.sellRent);
            break;
        }
      });

      // step?.map((s) => {
      //   (s.values as ItemModel[]).map((v) => {
      //     let key: keyof StepTypes;
      //     key = v.type as keyof StepTypes;
      //     if (values?.[key] != undefined)
      //       filters.push({
      //         id: key,
      //         value: values[key],
      //       });
      //     if (values?.[key] != undefined && values?.[key] != undefined)
      //       filters.push({
      //         id: key,
      //         min: min[key],
      //         max: max[key],
      //       });
      //   });
      // });
      // await axios
      //   .post(`${urls["test"]}/ad/filter/1`, {
      //     items: filters,
      //     types: types,
      //     cateId: subCategory._id,
      //   })
      //   .then((d) => {
      //     clear();
      //     onClose();
      //   });
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
                      (s) => s.href == router?.query?.slug
                    ) > -1) &&
                    (category?.subCategory as CategoryModel[])?.map(
                      ({ href, _id, name }, i) => {
                        return (
                          href != "shared" && (
                            <Radio
                              value={href}
                              key={i}
                              onChange={(e) => {
                                getItems(e.target.value);
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
              {["Зарах", "Түрээслүүлэх", "Зарах & түрээслүүлэх"].map((s, i) => {
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

            <FilterStack>
              <Heading variant={"smallHeading"}>Нэмэлт хайлт</Heading>

              {(category?.steps as CategoryStepsModel[])?.map((f) => {
                return (f.values as ItemModel[])?.map((v, i) => {
                  return v.isSearch &&
                    (v.value as ItemDetailModel[])?.length > 0 ? (
                    <Select
                      requirement={false}
                      label={v.name}
                      width="large"
                      data={
                        v.value
                        // typeId[v.parentId] != null
                        //   ? v.value.filter(
                        //       (vv) => typeId[vv.parent] == vv.parentId
                        //     )
                        //   : v.value
                      }
                      key={i}
                      Item={({ ...props }) => {
                        return (
                          <button
                            {...props}
                            onClick={() => {
                              // handle(v.type, data, id);
                              // onClick();
                            }}
                          >
                            {/* {data} */}
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
                            onChange={
                              (e) => {}
                              // handle(v.type, e.target.value, "", "true")
                            }
                          />
                          <Text>-</Text>
                          <Input
                            type="number"
                            placeholder="Дээд"
                            className="border-blue-400 rounded-full lue-400 border-1 focus:outline-none"
                            onChange={
                              (e) => {}
                              // handle(v.type, e.target.value, "", "false")
                            }
                          />
                        </Flex>
                      </VStack>
                    )
                  );
                });
              })}

              <Button variant={"blueButton"} mx={4} onClick={() => filterAd()}>
                Хайх
              </Button>
            </FilterStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

// 310

export default FilterLayout;
