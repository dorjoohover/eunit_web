"use client";

import { getDataFilter, getLocationForEstimator } from "@/app/(api)/ad.api";
import { useAppContext } from "@/app/_context";
import ProductInfo from "@/components/createAd/product/info";
import WhiteBox from "@/components/createAd/product/whiteBox";
import { LoadingButton } from "@/components/global/button";
import CustomModal from "@/components/global/customModal";
import { CloseIcon } from "@/components/global/icons";
import Select from "@/components/global/select";
import { ItemPosition } from "@/config/enum";
import { ItemDetailModel, ItemModel } from "@/models/items.model";
import { STYLES } from "@/styles";
import mergeNames from "@/utils/functions";
import { GoogleMapsType, ItemType } from "@/utils/type";
import { categoryNames, districts, locationPositions } from "@/utils/values";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  Center,
  Select as ChackraSelect,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { IoMdGitCompare } from "react-icons/io";
import { AdminCompareSelect } from "@/components/account/details/compareSelect";

export interface AdDataModel {
  id: number;
  title: string;
  price: number;
  lat: number;
  lng: number;
  location: string;
  area: number;
  floor?: string;
  door?: string;
  balconyUnit?: number;
  operation?: number;
  howFloor?: number;
  garage?: string;
  window?: string;
  windowUnit?: number;
  buildingFLoor?: number;
  paymentMethod?: string;
  description?: string;
  district?: string;
  landUsage?: string;
  buildingProcess?: string;
  date?: string;
}
const Page = () => {
  const { isLoaded } = useAppContext();
  const [data, setData] = useState<AdDataModel>();
  const [district, setDistrict] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [items, setItems] = useState<(ItemModel | undefined)[]>([]);
  const [filteredData, setFilteredData] = useState<AdDataModel[]>([]);
  const [filters, setFilters] = useState<
    {
      value?: string;
      min?: number;
      max?: number;
      id: string;
    }[]
  >([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    ""
  );
  const [compareData, setCompareData] = useState<AdDataModel[]>([]);
  const [selectedCategory, setSelectedCatery] = useState(0);
  const getLocation = async (name: string, d: string, category: number) => {
    setLoading(true);
    if (name == "location") {
      setSelectedLocations([]);
      setSelectedLocation(undefined);
    }

    await getLocationForEstimator(name, d, category).then((d) => {
      if (name == "location") {
        setSelectedLocation(d[0]);
        setLocations(d);
      } else {
        console.log(d);
        let price = d.indexOf(
          d.filter((f: { type: string }) => f.type == "price")[0]
        );
        let area = d.indexOf(
          d.filter((f: { type: string }) => f.type == "area")[0]
        );
        let item = [
          d[price],
          d[area],
          ...d.filter(
            (f: { type: string }) => f.type != "price" && f.type != "area"
          ),
        ];
        setItems(item);
      }
    });

    setLoading(false);
  };
  useEffect(() => {
    getLocation("location", districts[0], selectedCategory);
    getLocation("items", districts[0], selectedCategory);
  }, []);

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

    filteredData.map((d) => {
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
  const search = async () => {
    try {
      setFilteredData([]);
      console.log(filters);
      setLoading(true);
      await getDataFilter(filters, selectedLocations, selectedCategory).then(
        (d) => {
          setFilteredData(d);
          // console.log(d);
        }
      );
      setLoading(false);
    } catch (error) {}
  };

  const [expand, setExpand] = useState(0);
  const view = (item: AdDataModel) => {
    onOpen();
    setData(item);
  };
  const toast = useToast();
  const compare = (item: AdDataModel) => {
    const includes = compareData.find((d) => item.id == d.id);
    if (compareData.length >= 5) {
      toast({
        title: "5-с олон зар харьцуулах боломжгүй",
        duration: 3000,
        status: "warning",
      });
      return;
    }
    includes
      ? setCompareData(compareData.filter((d) => d.id != item.id))
      : setCompareData((prev) => [...prev, item]);
    toast({
      title: `${includes ? "Хаслаа" : "Нэмлээ"} `,
      status: "info",
      duration: 1000,
    });
  };
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo<GoogleMapsType>(
    () =>
      ({
        lat: data?.lat ?? 47.91887307876936,
        lng: data?.lng ?? 106.91757202148438,
      } as GoogleMapsType),
    [data]
  );
  return (
    <div className="w-full justify-center p-10 min-h-[60vh] w-[90vw] mx-auto">
      <div className="my-10  gap-4">
        <div className="flex gap-4">
          <div>
            <p className="py-2">Дэд төрөл</p>
            <ChackraSelect
              value={selectedCategory}
              onChange={(e) => {
                if (e.target.value) {
                  let value = parseInt(e.target.value);
                  setSelectedCatery(value);
                  getLocation("items", "test", value);
                }
              }}
            >
              {categoryNames?.map((d, i) => {
                return (
                  <option key={i} value={i}>
                    {d}
                  </option>
                );
              })}
            </ChackraSelect>
          </div>
          <div>
            <p className="py-2">Дүүрэг</p>
            <ChackraSelect
              value={district}
              onChange={(e) => {
                if (e.target.value) {
                  let value = parseInt(e.target.value);
                  setDistrict(value);
                  getLocation("location", districts[value], selectedCategory);
                }
              }}
            >
              {districts.map((d, i) => {
                return (
                  <option key={i} value={i}>
                    {d}
                  </option>
                );
              })}
            </ChackraSelect>
          </div>
        </div>
        {loading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {locations.length > 0 && selectedLocation && (
          <div>
            <p className="py-2">Байршил</p>
            <div className="flex flex-wrap gap-4 my-4">
              {selectedLocations.map((s) => {
                return (
                  <div
                    className="flex gap-4 bg-green-500 rounded-md px-4 py-2 cursor-pointer"
                    onClick={() => {
                      const data = selectedLocations.filter((l) => l != s);
                      setSelectedLocations(data);
                    }}
                    key={s}
                  >
                    <p>{s}</p>
                    <p className="px-3 py-2 bg-red-500 rounded-md">
                      <CloseIcon />
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex w-[300px]">
              <ChackraSelect
                value={selectedLocation}
                onChange={(e) => {
                  if (e.target.value)
                    setSelectedLocation(e.target.value as string);
                }}
              >
                {locations.map((d) => {
                  return (
                    <option value={d} key={d}>
                      {d}
                    </option>
                  );
                })}
              </ChackraSelect>
              <button
                onClick={() => {
                  if (
                    selectedLocation &&
                    !selectedLocations.includes(selectedLocation)
                  ) {
                    setSelectedLocations((prev) => [...prev, selectedLocation]);
                  }
                }}
                className="px-4 py-2"
              >
                Нэмэх
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 my-4">
          {items?.length > 0 &&
            (items as ItemModel[])?.map((v, i) => {
              if (v.type != "location" && v.type != "district")
                return (v.value as ItemDetailModel[])?.length > 0 ? (
                  <VStack h={50} w={150} key={i}>
                    <Select
                      requirement={false}
                      width="large"
                      label={
                        filters.filter((f) => f.id == v.type)?.[0]?.value ??
                        v.name
                      }
                      data={[...(v.value ?? []), { id: "", value: v.name }]}
                      key={i}
                      Item={(props: ItemType) => {
                        return (
                          <button
                            {...props}
                            onClick={() => {
                              const include = filters.find(
                                (f) => f.id == v.type
                              );
                              props.data == v.name
                                ? setFilters(
                                    filters.filter((f) => f.id != v.type)
                                  )
                                : include
                                ? filters.map((f) =>
                                    f.id == v.type ? (f.value = props.data) : f
                                  )
                                : filters.push({
                                    id: v.type,
                                    value: props.data,
                                  });
                              setFilters((prev) => [...prev]);
                              if (props.onClick != null) props.onClick();
                            }}
                          >
                            {props.data}

                            {props.children}
                          </button>
                        );
                      }}
                    ></Select>
                  </VStack>
                ) : (
                  <VStack flex={1} key={i}>
                    <Heading size={"xs"}>{v.name}</Heading>
                    <Flex alignItems={"center"} gap={2}>
                      <Input
                        w={200}
                        type="number"
                        placeholder="Доод"
                        className="border-blue-400 rounded-full lue-400 border-1"
                        onChange={(e) => {
                          const include = filters.find((f) => f.id == v.type);
                          include
                            ? e.target.value == "" &&
                              filters.filter((f) => f.id == v.type)[0].max == 0
                              ? setFilters(
                                  filters.filter((f) => f.id != v.type)
                                )
                              : filters.map((f) =>
                                  f.id == v.type
                                    ? (f.min = Number(e.target.value))
                                    : f
                                )
                            : filters.push({
                                id: v.type,
                                min: Number(e.target.value),
                              });
                          setFilters((prev) => [...prev]);
                        }}
                      />
                      <Text>-</Text>
                      <Input
                        w={200}
                        type="number"
                        placeholder="Дээд"
                        className="border-blue-400 rounded-full lue-400 border-1 focus:outline-none"
                        onChange={(e) => {
                          const include = filters.find((f) => f.id == v.type);
                          include
                            ? e.target.value == "" &&
                              filters.filter((f) => f.id == v.type)[0].min == 0
                              ? setFilters(
                                  filters.filter((f) => f.id != v.type)
                                )
                              : filters.map((f) =>
                                  f.id == v.type
                                    ? (f.max = Number(e.target.value))
                                    : f
                                )
                            : filters.push({
                                id: v.type,
                                max: Number(e.target.value),
                              });
                          setFilters((prev) => [...prev]);
                        }}
                      />
                    </Flex>
                  </VStack>
                );
            })}
        </div>
        <button
          className="px-8 rounded-md py-2 bg-blue-500 text-white"
          onClick={() => search()}
        >
          Хайх
        </button>
      </div>

      <button
        className="px-8 rounded-md py-2 mb-5 bg-green-500 text-white"
        onClick={() => downloadExcel()}
      >
        Excel татах
      </button>
      <div className="w-full overflow-scroll">
        {loading ? (
          <Center minH={"60vh"}>
            <Spinner />
          </Center>
        ) : (
          <table className="w-full p-2 text-sm text-left border border-gray-400 table-auto">
            <thead>
              <tr>
                <th className="w-[10%]">Дугаар</th>
                <th>Огноо</th>
                <th>Харьцуулах</th>
                <th>Байршил</th>
                {items?.map((item, i) => {
                  return <th key={i}>{item?.name}</th>;
                })}
              </tr>
            </thead>
            {filteredData?.map((a, i) => {
              return (
                <tr key={i}>
                  <td width="10%" className="flex justify-between">
                    <Button
                      className={mergeNames(
                        STYLES.blueButton,
                        "text-sm h-[30px] px-2 py-1"
                      )}
                      onClick={() => view(a)}
                    >
                      {a.id}
                    </Button>
                  </td>
                  <td className="truncate ...">{a.date}</td>
                  <td className="truncate ...">
                    {" "}
                    <Button
                      className={mergeNames(
                        STYLES.blueButton,
                        "text-sm h-[30px] px-2 py-1 mx-auto"
                      )}
                      onClick={() => compare(a)}
                    >
                      <IoMdGitCompare />
                    </Button>
                  </td>
                  <td className="truncate ...">{a.location}</td>
                  {items.map((item, i) => {
                    let key: keyof AdDataModel;
                    key = item?.type as keyof AdDataModel;

                    return <td key={i}>{a[key]}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        )}
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        btnOpen={<></>}
        className=""
        onclick={() => {}}
        // btnClose={<LoadingButton text="any" isLoading={false} />}
        btnClose2="Буцах"
        header="Нэгтгэсэн мэдээлэл"
      >
        <Box maxWidth={"100%"} flex="0 0 100%" borderRadius="5px">
          <div className="flex flex-col w-full p-3 shadow-md gap-7 bg-bgGrey md:p-10 rounded-xl">
            {/*Product */}
            {data?.title && (
              <Heading variant={"mediumHeading"} mb={5} onClick={() => {}}>
                {data.title}
              </Heading>
            )}
            <Box
              className={mergeNames(
                "product__image",
                "border-2 border-blue-900/20 shadow-md gallery"
              )}
              onClick={() => {}}
            ></Box>
            <WhiteBox
              heading="Хаяг"
              className="grid xs:grid-cols-2 xl:grid-cols-4 gap-5"
            >
              {data &&
                Object.entries(data).map((k, i) => {
                  return locationPositions.map((p, index) => {
                    if (k[0] == p.id) {
                      return (
                        <ProductInfo
                          key={i}
                          title={p.name ?? ""}
                          id={p?.id ?? ""}
                          value={k[1] as string}
                          func={() => {
                            onClose();
                          }}
                          href={false}
                        />
                      );
                    }
                  });
                })}
            </WhiteBox>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <WhiteBox
                // heading={sharing ? "Pdf file нэр" : "Зарын дэлгэрэнгүй"}
                heading={"Зарын дэлгэрэнгүй"}
                className="flex flex-col gap-3 "
              >
                <Text
                  className="text-[#5c727d] whitespace-pre-line"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {data?.description ?? ""}
                  {/* {sharing ? data?.file?.[0]?.name : data?.desc} */}
                </Text>
              </WhiteBox>
              <WhiteBox heading="Газрын зураг">
                {isLoaded && (
                  <GoogleMap
                    onClick={() => {
                      onClose();
                    }}
                    options={mapOptions}
                    zoom={14}
                    center={mapCenter}
                    mapTypeId={google.maps.MapTypeId.ROADMAP}
                    mapContainerStyle={{ width: "100%", height: "30vh" }}
                  >
                    {{
                      lat: data?.lat ?? mapCenter?.lat,
                      lng: data?.lng ?? mapCenter?.lng,
                    } && (
                      <div>
                        <MarkerF
                          position={{
                            lat: data?.lat ?? mapCenter?.lat,
                            lng: data?.lng ?? mapCenter?.lng,
                          }}
                          animation={google.maps.Animation.DROP}
                          // className={mergeNames("group")}
                        />
                      </div>
                    )}
                  </GoogleMap>
                )}
              </WhiteBox>
            </div>
            {data && (
              <WhiteBox
                heading="Мэдээлэл"
                className="grid grid-cols-2 gap-3 md:grid-cols-3 2xl:grid-cols-4"
              >
                {data &&
                  Object.entries(data).map((k, i) => {
                    let locations = items
                      .filter(
                        (item) =>
                          (item?.position == ItemPosition.side ||
                            item?.type == "area") &&
                          item.type == k[0]
                      )
                      .filter((f) => f != undefined);

                    return locations.map((p) => (
                      <ProductInfo
                        key={i}
                        title={p?.name ?? ""}
                        id={p?.type ?? ""}
                        value={k[1] as string}
                        func={() => {
                          onClose();
                        }}
                        href={false}
                      />
                    ));
                  })}
                {data &&
                  Object.entries(data).map((k, i) => {
                    let locations = items
                      .filter(
                        (item) =>
                          item?.position == ItemPosition.default &&
                          item.type == k[0]
                      )
                      .filter((f) => f != undefined);

                    return locations.map((p) => (
                      <ProductInfo
                        key={i}
                        title={p?.name ?? ""}
                        id={p?.type ?? ""}
                        value={k[1] as string}
                        func={() => {
                          onClose();
                        }}
                        href={false}
                      />
                    ));
                  })}
              </WhiteBox>
            )}
          </div>
        </Box>
      </CustomModal>
      {compareData.length > 0 && (
        <>
          {" "}
          <AdminCompareSelect
            id={selectedCategory}
            data={compareData}
            btnView={true}
            setData={setCompareData}
          />
          {compareData.length > 0 && <div className="h-[250px]" />}
          {compareData?.length == 0 && (
            <div className="h-[60vh] flex justify-center items-center w-full text-xl">
              Зар байхгүй байна
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
