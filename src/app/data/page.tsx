"use client";

import { calcData } from "@/(api)/ad.api";
import { getUserData } from "@/(api)/auth.api";
import { getRequestResult, sendRequest } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Colors } from "@/base/constants";
import * as XLSX from "xlsx";
import { DownloadIcon } from "@/components/icons";
import {
  AnalyzeWidget,
  ApartmentInfo,
  ResultWidget,
  UserWidget,
} from "@/components/report/result";
import {
  IconText,
  InlineText,
  ReportTitle,
  Spacer,
} from "@/components/report/shared";
import { ServiceCard, WalletCard } from "@/components/shared/card";
import { Constant, ServiceType } from "@/config/enum";
import { AdModel } from "@/models/ad.model";
import { LocationModel } from "@/models/location.model";
import { EunitIcon } from "@/theme/components/icon";
import { Assets } from "@/utils/assets";
import { money, parseDate } from "@/utils/functions";
import { ConstantApi } from "@/utils/routes";
import {
  DataDownloadValue,
  defaultMapCenter,
  defaultMapContainerStyle,
  defaultMapOptions,
  defaultMapZoom,
  districts,
} from "@/utils/values";
import {
  Box,
  Button,
  Center,
  Flex,
  Highlight,
  Loader,
  Modal,
  NumberInput,
  Overlay,
  rem,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePicker, DatePickerInput, DatesRangeValue } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure, useFetch } from "@mantine/hooks";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { IconCalendar } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCalendar, BiDownload } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaUnlockAlt } from "react-icons/fa";
import { FiUnlock } from "react-icons/fi";
import {
  IoIosArrowRoundBack,
  IoMdArrowBack,
  IoMdDownload,
} from "react-icons/io";
import { MdApartment } from "react-icons/md";
import { RiFileDownloadFill } from "react-icons/ri";
import { Loading } from "../loading";

type ResultType = {
  data: AdModel[];
  limit: number;
  location: LocationModel;
};

interface FormType {
  district?: string;
  town?: string;
  area?: string;
  date?: [Date | null, Date | null];
}

const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const id = params.get("id");
  const { user, refetchUser } = useAppContext();
  const date = new Date();
  const [opened, { open, close }] = useDisclosure(false);

  const [form, setForm] = useState<FormType>({
    area: undefined,
    district: undefined,
    date: [
      new Date(date.getFullYear(), date.getMonth(), date.getDay() - 1),
      date,
    ],
    town: undefined,
  });
  const [data, setData] = useState<ResultType>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [location, setLocation] = useState<LocationModel[]>([]);
  const getLocation = async (e: string | null) => {
    setIsLoading(true);
    const res = await fetch(
      `${ConstantApi.constant}${Constant.TOWN}/${e}`
    ).then((d) => d.json());
    setLocation(res.payload);
    setIsLoading(false);
  };
  const updateDistrict = async (e: string | null) => {
    if (e != null) {
      setForm((prev) => ({ ...prev, district: e }));
      getLocation(e);
    }
  };

  const request = () => {
    open();
  };
  const getResult = async () => {
    setLoading(true);
    console.log(id);
    if (id == null) return;
    const res = await getRequestResult(+id);
    console.log(res);

    if (res?.success) {
      setData(res.data);
    }
    console.log("asdf");
    setLoading(false);
  };

  useEffect(() => {
    getResult();
  }, []);

  const onGetExportProduct = async (
    id: number,
    title?: string,
    worksheetname?: string
  ) => {
    try {
      setLoading(true);

      const res = await getRequestResult(+id);
      const ads = res?.data.data.data;
      const location = res?.data.location as LocationModel;
      if (ads && Array.isArray(ads)) {
        const dataToExport = ads.map((ad: AdModel) => {
          const date = new Date(`${ad.date}`);
          return {
            ID: ad.id,
            Огноо: parseDate(date, "."),
            Дүүрэг: location.district,
            Хороо: `${location.khoroo}-р хороо`,
            "Ерөнхий байршил": location.name,
            "Хотхоны нэр": location.name,
            "Хотхоны нэр /Англи/": location.englishNameOfTown,
            Зипкод: location.zipcode,
            "Нийт үнэ": money(`${ad.price}`),
            Талбай: `${ad.area}м.кв`,
            "Нэгжийн үнэ": money(`${ad.unitPrice}`),
            "Ашиглалтад орсон он": ad.operation,
            "Нийт давхар": ad.buildingFloor,
            "Өөрийн давхар": ad.howFloor,
            "Шалны материал": ad.floor,
            "Хаалганы материал": ad.door,
            "Тагтны тоо": ad.balconyUnit,
            "Цонх материал": ad.window,
            "Цонхны тоо": ad.windowUnit,
            Лизинг: ad.paymentMethod,
            Тайлбар: ad.description,
          };
        });
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  const excel = async () => {
    setLoading(true);
    if (form.town && form.area) {
      const res = await sendRequest(
        +form.town,
        {
          area: +form.area,
          count: data?.limit,
          startDate: form.date![0]!,
          endDate: form.date![1]!,
        },
        ServiceType.DATA
      );
      refetchUser();
      onGetExportProduct(res?.data, "Дата", "Дата");
      close();
    }
    setLoading(false);
  };
  const submit = async () => {
    setLoading(true);

    if (form.town && form.area != undefined && form.date) {
      await calcData(
        +form.town,
        { area: +form.area },
        ServiceType.DATA,
        form.date![0]!,
        form.date![1]!
      ).then((d) => setData(d?.data));
    }
    setLoading(false);
  };
  const icon = (
    <IconCalendar
      style={{ width: rem(18), height: rem(18), color: Colors.main }}
      stroke={1.5}
    />
  );
  const unlock = (
    <FaUnlockAlt
      style={{ width: rem(18), height: rem(18), color: "white" }}
      // stroke={1.5}
    />
  );
  const download = (
    <RiFileDownloadFill
      style={{ width: rem(18), height: rem(18), color: "white" }}
      // stroke={1.5}
    />
  );

  const rows = data?.data?.map((el, i) => {
    const location = el.location as LocationModel;
    const date = new Date(`${el.date}`);
    return (
      <tr key={i} className="text-nowrap  ">
        <td className="px-4 py-2">{el.id}</td>
        <td className="px-4">{parseDate(date, ".")}</td>
        <td className="px-4">{location.district}</td>
        <td className="px-4">{location.khoroo}-р хороо</td>
        <td className="px-4">{location.name}</td>
        <td className="px-4">{location.town}</td>
        <td className="px-4">{location.englishNameOfTown}</td>
        <td className="px-4">{location.zipcode}</td>
        <td className="px-4">{money(`${el.price}`)}</td>
        <td className="px-4">{el.area}</td>
        <td className="px-4">{money(`${el.unitPrice}`)}</td>
        <td className="px-4">{el.operation}</td>
        <td className="px-4">{el.buildingFloor}</td>
        <td className="px-4">{el.howFloor}</td>
        <td className="px-4">{el.floor}</td>
        <td className="px-4">{el.door}</td>
        <td className="px-4">{el.balconyUnit}</td>
        <td className="px-4">{el.window}</td>
        <td className="px-4">{el.windowUnit}</td>
        <td className="px-4">{el.paymentMethod}</td>
        <td className="px-4">{el.description}</td>
      </tr>
    );
  });

  const ths = (
    <tr className="text-nowrap table-auto">
      <th className="px-4 pt-2 pb-4">ID</th>
      <th className="px-4">Огноо</th>
      <th className="px-4">Дүүрэг</th>
      <th className="px-4">Хороо</th>
      <th className="px-4">Ерөнхий байршил</th>
      <th className="px-4">Хотхоны нэр</th>
      <th className="px-4">Хотхоны нэр /Англи/</th>
      <th className="px-4">Зипкод</th>
      <th className="px-4">Нийт үнэ</th>
      <th className="px-4">Талбай</th>
      <th className="px-4">Нэгжийн үнэ</th>
      <th className="px-4">Ашиглалтад орсон он</th>
      <th className="px-4">Нийт давхар</th>
      <th className="px-4">Өөрийн давхар</th>
      <th className="px-4">Шалны материал</th>
      <th className="px-4">Хаалганы материал</th>
      <th className="px-4">Тагтны тоо</th>
      <th className="px-4">Цонх материал</th>
      <th className="px-4">Цонхны тоо</th>
      <th className="px-4">Лизинг</th>
      <th className="px-4">Тайлбар</th>
    </tr>
  );

  return (
    <Box>
      <ReportTitle
        text={"дата мэдээлэл"}
        fz={{
          md: 80,
          sm: 64,
          base: 40,
        }}
      >
        <Flex
          w={"100%"}
          direction={{
            md: "row",
            base: "column",
          }}
          gap={{
            md: 40,
            sm: 32,
            base: 20,
          }}
          h={"100%"}
          align={"center"}
        >
          <Flex>
            <Select
              w={200}
              my={5}
              variant="rounded"
              p={"2px"}
              onChange={(e) => updateDistrict(e)}
              data={districts.map((district) => {
                return {
                  label: district.name,
                  value: district.id,
                };
              })}
              __size="20px"
              label={DataDownloadValue["district"].label}
              placeholder={DataDownloadValue["district"].pl}
              value={form.district}
            />

            <Select
              value={form.town}
              w={200}
              my={5}
              onChange={(e) => {
                if (e != null) setForm((prev) => ({ ...prev, town: e }));
              }}
              variant="rounded"
              p={"2px"}
              __size="20px"
              rightSection={isLoading ? <Loader size={20} /> : <Box />}
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              data={location?.map((l) => {
                return {
                  label: l.town!,
                  value: `${l.id}`,
                };
              })}
              label={DataDownloadValue["town"].label}
              placeholder={DataDownloadValue["town"].pl}
            />

            <Select
              w={200}
              my={5}
              onChange={(e) => {
                if (e != null) setForm((prev) => ({ ...prev, area: e }));
              }}
              value={form.area}
              variant="rounded"
              p={"2px"}
              __size="20px"
              withScrollArea={false}
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              data={[
                {
                  label: "80м.кв-с доош",
                  value: `80`,
                },
                {
                  label: "80м.кв-с дээш",
                  value: `81`,
                },
                {
                  label: "Бүгд",
                  value: `0`,
                },
              ]}
              label={DataDownloadValue["area"].label}
              placeholder={DataDownloadValue["area"].pl}
            />
          </Flex>

          <Flex align={"center"}>
            <DatePickerInput
              rightSection={icon}
              type="range"
              w={"100%"}
              __size="20px"
              value={form.date}
              valueFormat="YYYY-MM-DD"
              p={"2px"}
              maxDate={new Date()}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, date: e }));
              }}
              label={DataDownloadValue["date"].label}
            />
            <Button
              onClick={() => {
                submit();
              }}
              w={{
                md: "auto",
                base: "100%",
              }}
              bg={"main"}
              tt={"uppercase"}
              px={40}
              fz={20}
              display={{
                base: "none",
                sm: "block",
              }}
              radius={5}
              c={"white"}
            >
              Харах
            </Button>
          </Flex>
          <Button
            onClick={() => {
              submit();
            }}
            w={{
              md: "auto",
              base: "100%",
            }}
            display={{
              sm: "none",
              base: "b;ock",
            }}
            bg={"main"}
            tt={"uppercase"}
            px={40}
            fz={20}
            radius={5}
            c={"white"}
          >
            Харах
          </Button>
        </Flex>
        <Spacer
          size={{
            md: 80,
            sm: 60,
            base: 40,
          }}
        />
        <Text c={"headBlue"} fz={16} fw={600}>
          Илэрц:
          {`${parseDate(new Date(form.date![0]!), ".")}-${parseDate(
            new Date(form.date![1]!),
            "."
          )}`}{" "}
          хооронд {data?.limit ?? 0} ширхэг мэдээлэл байна.
        </Text>
        <Spacer
          size={{
            md: 60,
            sm: 42,
            base: 24,
          }}
        />

        <ScrollArea scrollbars="xy" mah={260}>
          <table
            style={{
              overflowX: "auto",
            }}
            className="overscroll-x-auto relative overflow-x-auto"
          >
            <thead>{ths}</thead>
            <tbody className="relative">
              {rows}
              <Overlay
                style={{
                  position: "absolute",
                  top: `${
                    ((data?.data.length ? 1 : 0) / (data?.data.length ?? 1)) *
                    100
                  }%`,
                  left: 0,
                  right: 0,
                  bottom: "10px",
                }}
                bg={`
          linear-gradient(to bottom, rgba(255,255,255, 0.02), rgba(255, 255, 255, 0.7))
        `}
                blur={4}
              />
            </tbody>
          </table>
        </ScrollArea>
        <Spacer size={60} />
        <Flex justify={"space-between"}>
          {/* <Button
            bg={"main"}
            c={"white"}
            leftSection={unlock}
            fz={20}
            fw={400}
            h={"auto"}
            radius={5}
            px={20}
            py={8}
          >
            Битүүмж арилгах
          </Button> */}
          <Button
            bg={"main"}
            c={"white"}
            leftSection={download}
            fz={20}
            fw={400}
            h={"auto"}
            radius={5}
            px={20}
            py={8}
            onClick={() => request()}
          >
            Excel татах
          </Button>
        </Flex>
        <Spacer size={80} />
      </ReportTitle>
      <Modal.Root opened={opened} centered size={"lg"} onClose={close}>
        <Modal.Overlay />

        <Modal.Content radius={20} bg={"transparent"}>
          <Modal.Header>
            <Modal.Title c={"#546274"} tt={"uppercase"}>
              Төлбөр төлөлт
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Box bg={"white"} px={"10%"} pt={20}>
            <WalletCard
              user={user}
              onClick={() => {
                router.push("/wallet");
              }}
            />
            <Highlight
              mt={24}
              mb={32}
              fz={18}
              highlight={["урамшуулал", "20,000 E-unit"]}
              highlightStyles={{
                background: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Шинэ хэрэглэгчийн урамшуулал бүхий 20,000 E-unit ашиглан энэхүү
              үйлчилгээг авах боломжтой.
            </Highlight>

            <Button
              w={"100%"}
              fz={24}
              bg={"main"}
              py={16}
              h={"auto"}
              mb={40}
              onClick={() => excel()}
            >
              <Flex align={"center"}>
                <Text c={"white"} fz={24}>
                  {money(`${(data?.limit ?? 0) * 100}`)}
                </Text>
                <EunitIcon />
                <Text c={"white"} fz={24}>
                  төлөх
                </Text>
              </Flex>
            </Button>
          </Box>
        </Modal.Content>
      </Modal.Root>
      <Box
        style={{
          borderTopColor: Colors.deepMose20,
          borderTopWidth: 1,
          borderTopStyle: "solid",
        }}
        w={"100%"}
        bg={"white"}
      ></Box>
    </Box>
  );
};

export default Page;
