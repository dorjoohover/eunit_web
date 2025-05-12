"use client";

import {
  carEvaluate,
  checkPayment,
  getRequestResult,
} from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import { ReportTitle, Spacer } from "@/components/report/shared";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Group,
  Highlight,
  Loader,
  Modal,
  NumberInput,
  Select,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  CarEvaluateKey,
  CarEvaluateValues,
  reportPrice,
  ReportSubmitErrorMessages,
  ReportSubmitErrorMessagesType,
} from "@/utils/values";
import { Image } from "@mantine/core";
import { QpayType } from "@/utils/type";
import { PaymentType, PaymentUsage, ServiceType } from "@/config/enum";
import { DatePicker, YearPicker, YearPickerInput } from "@mantine/dates";
import {
  CarBrand,
  carColor,
  carMain,
  CarMark,
  cars,
  carTechnik,
  meterRange,
  orgValues,
  OrgValueType,
  paymentValues,
  PaymentValueType,
  steerType,
} from "./selectModel";
import { money, motorLabel } from "@/utils/functions";
import { divide, upperFirst } from "lodash";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { WalletCard } from "@/components/shared/card";
import { EunitIcon } from "@/theme/components/icon";
import { Assets } from "@/utils/assets";
import { GeneralWidget } from "@/components/report/result";
import { IoCarSportOutline, IoColorFillOutline } from "react-icons/io5";
import { BsBookmark, BsFuelPump } from "react-icons/bs";
import { PiEngine, PiSteeringWheel } from "react-icons/pi";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiCarWheel, GiGearStickPattern } from "react-icons/gi";
import { LuPaintRoller } from "react-icons/lu";
import { RiCarLine } from "react-icons/ri";
import { TbNumber } from "react-icons/tb";
interface FormType {
  brand?: string;
  mark?: string;
  motor?: string;
  engine?: string;
  gearbox?: string;
  steerType?: string;
  drive?: string;
  color?: string;
  meter?: string;
  manufactured?: string;
  imported?: string;
  conditions?: string;
  // type?: string;
  interior?: string;
  lastname?: string;
  firstname?: string;
  usage?: string;
  org?: string;
}
const carFields = [
  {
    name: "Бренд",
    key: "brand",
    icon: <IoCarSportOutline size={24} />,
    step: 0,
  },
  { name: "Марк", key: "mark", icon: <BsBookmark size={24} />, step: 0 },
  { name: "Багтаамж", key: "motor", icon: <PiEngine size={24} />, step: 1 },
  {
    name: "Өнгө",
    key: "color",
    icon: <IoColorFillOutline size={24} />,
    step: 2,
  },
  {
    name: "Үйлдвэрлэсэн",
    key: "manufactured",
    icon: <CiCalendarDate size={24} />,
    step: 0,
  },
  {
    name: "Импортлосон",
    key: "imported",
    icon: <CiCalendar size={24} />,
    step: 0,
  },
  {
    name: "Гүйлт",
    key: "meter",
    icon: <AiOutlineDashboard size={24} />,
    step: 0,
  },
  {
    name: "Хөдөлгүүрийн төрөл",
    key: "engine",
    icon: <BsFuelPump size={24} />,
    step: 1,
  },
  {
    name: "Хүрд",
    key: "steerType",
    icon: <PiSteeringWheel size={24} />,
    step: 2,
  },
  {
    name: "Хурдны хайрцаг",
    key: "gearbox",
    icon: <GiGearStickPattern size={24} />,
    step: 1,
  },
  {
    name: "Салоны өнгө",
    key: "interior",
    step: 2,
    icon: <LuPaintRoller size={24} />,
  },
  // { name: "Төрөл", key: "type", icon: <RiCarLine size={24} />, step: 2 },
  {
    name: "Хөтлөгч",
    key: "drive",
    icon: <GiCarWheel size={24} />,
    step: 1,
  },
  { name: "Нөхцөл", key: "conditions", icon: <TbNumber size={24} />, step: 2 },
];
const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormType>({
    brand: "",
    mark: "",
    motor: "",
    engine: "",
    gearbox: "",
    steerType: "",
    drive: "",
    conditions: "",
    interior: "",
    // type: "",
    color: "",
    meter: "0",
    manufactured: "",
    lastname: undefined,
    firstname: undefined,
    usage: undefined,
    org: undefined,
    imported: "",
  });
  const id = params.get("id");
  const { user, refetchUser } = useAppContext();
  const router = useRouter();
  const [qpay, setQpay] = useState<{
    qpay: QpayType;
    id: number;
  } | null>(null);
  const matches = useMediaQuery("(min-width: 36em)");
  const matchesPad = useMediaQuery("(min-width: 50em)");

  const checker = () => {
    let res = true;
    const laststep = ["lastname", "firstname", "org", "usage"];

    for (const value of Object.keys(CarEvaluateValues)) {
      let v = value as keyof FormType;
      if (laststep.includes(value) && active == 3 && !opened) continue;
      if (!form[v]) {
        notifications.show({
          message:
            ReportSubmitErrorMessages[v as ReportSubmitErrorMessagesType],
          position: "top-center",
        });
        res = false;
        break;
      }
    }

    return res;
  };

  const submit = async (payment: number) => {
    const check = checker();
    console.log(check)
    if (!check) return;
    setLoading(true);
    if (
      payment != PaymentType.QPAY &&
      user?.wallet &&
      user?.wallet - reportPrice(form.usage) < 0
    ) {
      notifications.show({
        position: "top-center",
        color: "warning",
        title: "Анхааруулга",
        message: "Үлдэгдэл хүрэлцэхгүй байна.",
      });
    }
    if (payment == PaymentType.QPAY && qpay != null) {
      setLoading(false);
      return;
    }
    const res = await carEvaluate(form, ServiceType.REVIEW, payment);
    if (payment == PaymentType.QPAY) {
      setQpay({
        qpay: res?.data.data,
        id: res?.data.res,
      });
      setLoading(false);
      return;
    }
    if (res?.data?.success != false) {
      refetchUser();
      router.push(`/car/result?id=${res?.data.res}`);
    }
    setLoading(false);
  };

  const [active, setActive] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const nextStep = () => {
    console.log(active);
    switch (active) {
      case 0:
        if (
          !form["brand"] ||
          !form["mark"] ||
          !form["manufactured"] ||
          !form["meter"] ||
          !form["imported"]
        ) {
          notifications.show({
            position: "top-center",
            message: "Мэдээллийг бүрэн оруулна уу",
          });
          return;
        }
        setActive((current) => (current < 3 ? current + 1 : current));
        break;
      case 1:
        if (
          !form["engine"] ||
          !form["motor"] ||
          !form["gearbox"] ||
          !form["drive"]
        ) {
          notifications.show({
            position: "top-center",
            message: "Мэдээллийг бүрэн оруулна уу",
          });
          return;
        }
        setActive((current) => (current < 3 ? current + 1 : current));
        break;
      case 2:
        if (
          !form["color"] ||
          !form["interior"] ||
          !form["steerType"] ||
          !form["conditions"]
          // !form["type"]
        ) {
          notifications.show({
            position: "top-center",
            message: "Мэдээллийг бүрэн оруулна уу",
          });
          return;
        }
        setActive((current) => (current < 3 ? current + 1 : current));
        break;

      case 3:
        // setActive((current) => (current < 3 ? current + 1 : current));
        if (checker()) {
          open();
        }

        break;
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const openApp = (url: string) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      // For custom URL schemes with fallback
      const start = Date.now();
      // window.location.href = url;

      // Fallback to App Store if app not installed
      setTimeout(() => {
        if (Date.now() - start < 2000) {
          window.location.href = url || "https://apps.apple.com";
        }
      }, 500);
    } else if (isAndroid) {
      // Android iframe approach
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = url;
      document.body.appendChild(iframe);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 3000);
    } else {
      window.location.href = url;
    }
  };
  const check = async () => {
    setLoading(true);
    const res = await checkPayment(qpay?.id!, qpay?.qpay.invoice_id!);
    if (!res?.data)
      notifications.show({
        position: "top-center",
        message: "Төлбөр төлөгдөөгүй байна.",
      });
    if (res?.data) {
      refetchUser();
      router.push(`/car/result?id=${qpay?.id}`);
    }
    setLoading(false);
  };
  if (loading)
    return (
      <Center>
        <Loading />
      </Center>
    );
  // return (
  //   <Center h={"400px"}>
  //     <Text fz={40}>Тун удахгүй</Text>
  //   </Center>
  // );
  return (
    <Box>
      <ReportTitle text={"АВТОМАШИН"}>
        <Box
          style={{
            borderRadius: "20px",
          }}
        >
          <Stepper
            active={active}
            onStepClick={setActive}
            color={Colors.main}
            bg={"transparent"}
          >
            <Stepper.Step
              description="Алхам 1"
              label="Ерөнхий мэдээлэл"
              bg={"transparent"}
            >
              <Grid maw={450} gutter={12}>
                <Grid.Col span={12}>
                  <Select
                    w="100%"
                    my={5}
                    onChange={(e) => {
                      if (e != null) {
                        console.log(e);
                        setForm((prev) => ({ ...prev, brand: e }));
                        setForm((prev) => ({ ...prev, mark: undefined }));
                      }
                    }}
                    value={form["brand"]}
                    variant="car"
                    p="2px"
                    withScrollArea={false}
                    data={Object.entries(cars)
                      .map(([key, value]) => {
                        return {
                          value: key,
                          label: value.label,
                        };
                      })
                      .filter((a) => a != undefined)}
                    label={CarEvaluateValues["brand"].label}
                    placeholder={CarEvaluateValues["brand"].pl}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Select
                    w="100%"
                    onChange={(e) => {
                      if (e != null) {
                        const split = e?.split("_");
                        const brand = split?.[0];
                        const mark = split?.[1];
                        setForm((prev) => ({ ...prev, mark: mark }));
                        if (form["brand"] == null || form["brand"] != brand)
                          setForm((prev) => ({ ...prev, brand: brand }));
                        const m =
                          cars[brand as CarBrand].marks[mark as CarMark];
                        console.log(brand, mark, m);
                        if ((m["engine"] as string[]).length == 1)
                          setForm((prev) => ({
                            ...prev,
                            engine: m["engine"][0],
                          }));
                        if ((m["gearbox"] as string[]).length == 1)
                          setForm((prev) => ({
                            ...prev,
                            gearbox: m["gearbox"][0],
                          }));
                        if ((m["drive"] as string[]).length == 1)
                          setForm((prev) => ({
                            ...prev,
                            drive: m["drive"][0],
                          }));
                      }
                    }}
                    value={`${
                      form["mark"]
                        ? `${form["brand"]}_${form["mark"]}`
                        : undefined
                    }`}
                    variant="car"
                    p="2px"
                    withScrollArea={false}
                    data={(form["brand"]
                      ? Object.entries(
                          cars[form["brand"] as CarBrand].marks
                        ).map(([key, value]) => {
                          return {
                            label: value.label,
                            value: `${form["brand"]}_${key}`,
                          };
                        })
                      : Object.entries(cars).flatMap(([k, car]) =>
                          Object.entries(car.marks).map(([key, value]) => {
                            if (key != "busad" && key != "Бусад")
                              return {
                                value: `${k}_${key}`,
                                label: value.label,
                              };
                          })
                        )
                    ).filter((a) => a != undefined)}
                    label={CarEvaluateValues["mark"].label}
                    placeholder={CarEvaluateValues["mark"].pl}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <YearPickerInput
                    label="Үйлдвэрлэгдсэн он"
                    variant="unstyled"
                    styles={{
                      label: {
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#546274",
                        lineHeight: 2,
                        marginBottom: 4,
                      },

                      input: {
                        borderRadius: 10,
                        border: `2px solid #929292`,
                        height: "auto",
                        padding: "12px 16px",
                        fontSize: 16,
                      },
                    }}
                    placeholder={"Сонгоно уу"}
                    minDate={new Date(1992, 1)}
                    maxDate={
                      form["imported"]
                        ? new Date(+form["imported"], 1)
                        : new Date(new Date().getFullYear(), 1)
                    }
                    value={
                      form["manufactured"]
                        ? new Date(form["manufactured"])
                        : undefined
                    }
                    onChange={(e) => {
                      if (e != null) {
                        if (+e < 0) {
                          notifications.show({
                            color: "red",
                            message: "Он буруу орсон байна.",
                          });
                        }
                        setForm((prev) => ({
                          ...prev,
                          manufactured: `${e.getFullYear()}`,
                        }));
                      }
                    }}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <YearPickerInput
                    label="Импортлогдсон он"
                    styles={{
                      label: {
                        fontWeight: 400,
                        fontSize: 14,
                        color: "#546274",
                        lineHeight: 2,
                        marginBottom: 4,
                      },
                      input: {
                        borderRadius: 10,
                        border: `2px solid #929292`,
                        height: "auto",
                        fontSize: 16,
                        padding: "12px 16px",
                      },
                    }}
                    variant="unstyled"
                    placeholder={"Сонгоно уу"}
                    minDate={
                      form["manufactured"]
                        ? new Date(+form["manufactured"], 1)
                        : new Date(1997, 1)
                    }
                    maxDate={new Date(new Date().getFullYear(), 1)}
                    value={
                      form["imported"] ? new Date(form["imported"]) : undefined
                    }
                    onChange={(e) => {
                      if (e != null) {
                        if (+e < 0) {
                          notifications.show({
                            color: "red",
                            message: "Он буруу орсон байна.",
                          });
                        }
                        setForm((prev) => ({
                          ...prev,
                          imported: `${e.getFullYear()}`,
                        }));
                      }
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInput
                    fz={15}
                    label={"Гүйлт"}
                    placeholder={"Оруулна уу"}
                    value={`${money(`${form["meter"] ?? 0}`)}`}
                    rightSection={<>км</>}
                    onChange={(e) => {
                      if (e.target.value != null) {
                        if (+e < 0) {
                          notifications.show({
                            color: "red",
                            message: "Гүйлт буруу орсон байна.",
                          });
                        }
                        const value = e.target.value.replaceAll(",", "");
                        setForm((prev) => ({
                          ...prev,
                          meter: `${value}`,
                        }));
                      }
                    }}
                    variant="car"
                    min={0}
                    w={"100%"}
                    maw={"100%"}
                  />
                </Grid.Col>
              </Grid>
            </Stepper.Step>
            <Stepper.Step
              description="Алхам 2"
              label="Техникийн үзүүлэлт"
              bg={"transparent"}
            >
              <Grid gutter={12} maw={450}>
                {carTechnik.map((key, i) => {
                  const data =
                    (cars[form["brand"] as CarBrand]?.marks[
                      form["mark"] as CarMark
                    ]?.[key] as any[]) ?? [];

                  return (
                    <Grid.Col
                      span={data?.length > 3 ? 12 : 12}
                      key={`${key} ${i}`}
                    >
                      {key != "motor" ? (
                        <div>
                          <p className="leading-[2] text-[#546274] text-[14px] font-400">
                            {CarEvaluateValues[key as CarEvaluateKey].label}
                          </p>
                          <Flex
                            w={"100%"}
                            gap={12}
                            rowGap={12}
                            align={"stretch"}
                          >
                            {Array.from(
                              { length: data.length },
                              (_, i) => i + 1
                            ).map((i) => {
                              return (
                                <Button
                                  key={i}
                                  variant="outline"
                                  c={
                                    form[key as keyof FormType] == data[i - 1]
                                      ? Colors.main
                                      : Colors.black
                                  }
                                  flex={1}
                                  py={16}
                                  style={{
                                    textWrap: "wrap",
                                    whiteSpace: "normal",
                                    wordWrap: "break-word",
                                  }}
                                  h={"auto"}
                                  lh={1.2}
                                  bg={
                                    form[key as keyof FormType] == data[i - 1]
                                      ? Colors.reportInputActive
                                      : "transparent"
                                  }
                                  styles={{
                                    root: {
                                      borderColor:
                                        form[key as keyof FormType] ==
                                        data[i - 1]
                                          ? Colors.main
                                          : "#929292",
                                    },
                                  }}
                                  onClick={() => {
                                    setForm((prev) => ({
                                      ...prev,
                                      [key]: data[i - 1],
                                    }));
                                  }}
                                >
                                  {data[i - 1]}
                                </Button>
                              );
                            })}
                          </Flex>
                        </div>
                      ) : (
                        <Select
                          w="100%"
                          my={5}
                          onChange={(e) => {
                            if (e != null)
                              setForm((prev) => ({ ...prev, [key]: e }));
                          }}
                          value={form[key as keyof FormType]}
                          variant="car"
                          __size="20px"
                          withScrollArea={false}
                          styles={{
                            dropdown: { maxHeight: 200, overflowY: "auto" },
                            label: { fontSize: "16px" },
                          }}
                          data={motorLabel(data[0], data[1], data?.[2])}
                          label={CarEvaluateValues[key as CarEvaluateKey].label}
                          placeholder={
                            CarEvaluateValues[key as CarEvaluateKey].pl
                          }
                        />
                      )}
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Stepper.Step>
            <Stepper.Step
              description="Алхам 3"
              label="Нэмэлт мэдээлэл"
              bg={"transparent"}
            >
              <Grid gutter={12} maw={450}>
                {carMain.map(({ key, data }, i) => (
                  <Grid.Col span={data.length > 3 ? 6 : 12} key={i}>
                    {data.length <= 3 ? (
                      <div>
                        <p className="leading-[2] text-[#546274] text-[14px] font-400">
                          {CarEvaluateValues[key as CarEvaluateKey].label}
                        </p>
                        <Flex
                          w={"100%"}
                          gap={12}
                          rowGap={12}
                          style={{
                            alignItems: "stretch",
                          }}
                        >
                          {Array.from(
                            { length: data.length },
                            (_, i) => i + 1
                          ).map((i) => {
                            return (
                              <Button
                                variant="outline"
                                style={{
                                  textWrap: "wrap",
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                }}
                                c={
                                  form[key as keyof FormType] ==
                                  data[i - 1].value
                                    ? Colors.main
                                    : Colors.black
                                }
                                flex={1}
                                key={i}
                                py={16}
                                h={"auto"}
                                lh={1.2}
                                bg={
                                  form[key as keyof FormType] ==
                                  data[i - 1].value
                                    ? Colors.reportInputActive
                                    : "transparent"
                                }
                                styles={{
                                  root: {
                                    borderColor:
                                      form[key as keyof FormType] ==
                                      data[i - 1].value
                                        ? Colors.main
                                        : "#929292",
                                  },
                                  label: {
                                    whiteSpace: "normal",
                                  },
                                }}
                                onClick={() => {
                                  setForm((prev) => ({
                                    ...prev,
                                    [key]: data[i - 1].value,
                                  }));
                                }}
                              >
                                {data[i - 1].label}
                              </Button>
                            );
                          })}
                        </Flex>
                      </div>
                    ) : (
                      <Select
                        w="100%"
                        my={5}
                        onChange={(e) => {
                          if (e != null)
                            setForm((prev) => ({ ...prev, [key]: e }));
                        }}
                        value={form[key as keyof FormType]}
                        variant="car"
                        withScrollArea={false}
                        data={data}
                        label={CarEvaluateValues[key as CarEvaluateKey].label}
                        placeholder={
                          CarEvaluateValues[key as CarEvaluateKey].pl
                        }
                      />
                    )}
                  </Grid.Col>
                ))}
              </Grid>
            </Stepper.Step>

            <Stepper.Completed>
              <GeneralWidget title="Та илгээхдээ итгэлтэй байна уу">
                <Grid>
                  {carFields.map((carField, index) => (
                    <Grid.Col
                      span={{ lg: 3, md: 3, sm: 4, base: 6 }}
                      key={index}
                    >
                      <Flex
                        gap="md"
                        justify="left"
                        align="center"
                        direction="row"
                        w={"100%"}
                        wrap="wrap"
                        h={"100%"}
                        style={{
                          border: "1px solid #DDDDDD",
                          borderRadius: 12,
                          cursor: "pointer",
                        }}
                        onClick={() => setActive(carField.step)}
                        py={12}
                        px={{
                          md: "10%",
                          base: 10,
                        }}
                      >
                        {carField.icon}
                        <Box>
                          <Text
                            fz={{
                              sm: 12,
                              base: 12,
                            }}
                            fw={"bold"}
                            c={"#262626"}
                            lh={1}
                          >
                            {carField.name}
                          </Text>
                          <Text
                            fz={{
                              lg: 20,

                              base: 16,
                            }}
                            lh={1.1}
                            fw={300}
                          >
                            {upperFirst(
                              `${
                                carField.key == "meter"
                                  ? `${money(
                                      `${form[carField.key as keyof FormType]}`
                                    )}км`
                                  : form[carField.key as keyof FormType]
                              }`
                            )}
                          </Text>
                        </Box>
                      </Flex>
                    </Grid.Col>
                  ))}
                </Grid>
              </GeneralWidget>
            </Stepper.Completed>
          </Stepper>
          <Group justify="start" mt="xl">
            {active != 0 && (
              <Button variant="default" onClick={prevStep} radius={4}>
                Буцах
              </Button>
            )}
            <Button
              onClick={nextStep}
              loading={loading}
              disabled={loading}
              radius={4}
              color={Colors.main}
            >
              {active == 3 ? "Илгээх" : "Үргэлжлүүлэх"}
            </Button>
          </Group>
        </Box>
        <Spacer size={"10rem"} />
      </ReportTitle>
      <Modal.Root
        opened={opened}
        centered
        // fullScreen={!matches}
        size={matches ? (qpay != null ? "md" : "lg") : "xl"}
        onClose={() => {
          close();
          setQpay(null);
        }}
      >
        <Modal.Overlay />

        <Modal.Content radius={20} bg={"transparent"} className="items-center">
          <Modal.Header>
            <Modal.Title c={"#546274"} tt={"uppercase"}>
              Төлбөр төлөлт
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>

          {qpay != null ? (
            <Box
              bg={"white"}
              px={{
                sm: "10%",
                base: 16,
              }}
              pt={20}
            >
              {!matchesPad && matches && (
                <Grid mb={20}>
                  {qpay.qpay?.urls.map((url, k) => {
                    return (
                      <Grid.Col key={k} span={3}>
                        <Box
                          onClick={() => openApp(url.link)}
                          className="cursor-pointer"
                        >
                          <Image
                            src={url.logo}
                            width={60}
                            height={60}
                            alt={url.name}
                          />
                        </Box>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              )}
              {!matches ? (
                <Grid mb={20}>
                  {qpay.qpay?.urls.map((url, k) => {
                    return (
                      <Grid.Col key={k} span={3}>
                        <Box
                          onClick={() => openApp(url.link)}
                          className="cursor-pointer"
                        >
                          <Image
                            src={url.logo}
                            width={60}
                            height={60}
                            alt={url.name}
                          />{" "}
                        </Box>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              ) : (
                <Image
                  className="mx-auto"
                  src={`data:image/png;base64,${qpay?.qpay?.qr_image}`}
                  alt="qpay image"
                  width={200}
                  height={200}
                />
              )}
              <Button
                w={"100%"}
                fz={24}
                bg={"main"}
                py={10}
                h={"auto"}
                mb={40}
                disabled={loading}
                onClick={() => {
                  check();
                }}
              >
                {loading ? (
                  <Center>
                    <Loader color={"white"} type="bars" />
                  </Center>
                ) : (
                  <Flex align={"center"}>
                    <Text c={"white"} fz={24}>
                      Төлбөр шалгах
                    </Text>
                  </Flex>
                )}
              </Button>
            </Box>
          ) : (
            <Box
              bg={"white"}
              px={{
                sm: "10%",
                base: 16,
              }}
              pt={20}
            >
              {["lastname", "firstname"].map((value, i) => {
                return (
                  <TextInput
                    mb={10}
                    key={i}
                    fz={16}
                    label={CarEvaluateValues[value as CarEvaluateKey].label}
                    placeholder={CarEvaluateValues[value as CarEvaluateKey].pl}
                    value={form[value as keyof FormType]}
                    onChange={(e) => {
                      if (e.target.value != null) {
                        setForm((prev) => ({
                          ...prev,
                          [value]: e.target.value,
                        }));
                      }
                    }}
                    error={
                      form[value as keyof FormType] == undefined
                        ? ReportSubmitErrorMessages[
                            value as ReportSubmitErrorMessagesType
                          ]
                        : ""
                    }
                    variant="icon"
                    min={0}
                    w={"100%"}
                    maw={"100%"}
                  />
                );
              })}

              <Box mb={10}>
                <Text fz={14} fw={500} lh={1.55}>
                  {CarEvaluateValues["usage"].label}
                </Text>
                <Flex
                  w={"100%"}
                  gap={12}
                  rowGap={12}
                  style={{
                    alignItems: "stretch",
                  }}
                >
                  {paymentValues["usage"].map((data, i) => {
                    return (
                      <Button
                        variant="outline"
                        style={{
                          textWrap: "wrap",
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                        c={
                          form["usage"] == `${data.value}`
                            ? Colors.main
                            : Colors.black
                        }
                        fw={400}
                        flex={1}
                        key={i}
                        py={8}
                        h={"auto"}
                        lh={1.2}
                        bg={
                          form["usage"] == `${data.value}`
                            ? Colors.reportInputActive
                            : "transparent"
                        }
                        fz={12}
                        styles={{
                          root: {
                            borderColor:
                              form["usage"] == `${data.value}`
                                ? Colors.main
                                : Colors.stroke,
                          },
                          label: {
                            whiteSpace: "normal",
                          },
                        }}
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            usage: `${data.value}`,
                          }));

                          setForm((prev) => ({
                            ...prev,
                            org:
                              data.value == PaymentUsage.VALUE
                                ? `eunit`
                                : undefined,
                          }));
                        }}
                        leftSection={
                          data.icon != undefined ? (
                            <Box
                              w={36}
                              h={36}
                              style={{
                                borderRadius: 5,
                                overflow: "hidden",
                              }}
                            >
                              <Image
                                src={Assets.service}
                                h={"100%"}
                                w={"100%"}
                                fit="cover"
                                alt={data.label}
                              />
                            </Box>
                          ) : null
                        }
                      >
                        {data.label}
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
              {form["usage"] && (
                <Box mb={10}>
                  <Text fz={14} fw={500} lh={1.55}>
                    {CarEvaluateValues["org"].label}
                  </Text>
                  <Flex
                    w={"100%"}
                    gap={12}
                    rowGap={12}
                    style={{
                      alignItems: "stretch",
                    }}
                  >
                    {orgValues[form["usage"] as OrgValueType].map((data, i) => {
                      return (
                        <Button
                          variant="outline"
                          style={{
                            textWrap: "wrap",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                          c={
                            form["org"] == `${data.value}`
                              ? Colors.main
                              : Colors.black
                          }
                          fw={400}
                          flex={1}
                          key={i}
                          py={8}
                          h={"auto"}
                          lh={1.2}
                          bg={
                            form["org"] == `${data.value}`
                              ? Colors.reportInputActive
                              : "transparent"
                          }
                          fz={12}
                          styles={{
                            root: {
                              borderColor:
                                form["org"] == `${data.value}`
                                  ? Colors.main
                                  : Colors.stroke,
                            },
                            label: {
                              whiteSpace: "normal",
                            },
                          }}
                          onClick={() => {
                            console.log(data.value)
                            setForm((prev) => ({
                              ...prev,
                              org: `${data.value}`,
                            }));
                          }}
                          leftSection={
                            data.icon != undefined ? (
                              <Box
                                w={36}
                                h={36}
                                style={{
                                  borderRadius: 5,
                                  overflow: "hidden",
                                }}
                              >
                                <Image
                                  src={data.icon}
                                  h={"100%"}
                                  w={"100%"}
                                  fit="cover"
                                  alt={data.name}
                                />
                              </Box>
                            ) : null
                          }
                        >
                          {data.name}
                        </Button>
                      );
                    })}
                  </Flex>
                </Box>
              )}
              {/* <WalletCard
                onClick={() => {
                  router.push("/wallet");
                }}
              /> */}
              {form.usage == `${PaymentUsage.VALUE}` ||
                (!form.usage && (
                  <Highlight
                    mt={24}
                    mb={24}
                    fz={16}
                    lh={1.1}
                    c={Colors.darkBlue}
                    highlight={["урамшуулал", " E-unit"]}
                    highlightStyles={{
                      background: Colors.main,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Шинэ хэрэглэгчийн урамшуулал бүхий 2,000 E-unit ашиглан
                    энэхүү үйлчилгээг авах боломжтой.
                  </Highlight>
                ))}
              <Text fz={16} lh={1.1} mb={20} c={Colors.darkBlue}>
                Урамшууллын үлдэгдэл: {money(`${user?.wallet ?? 0}`)} E-unit
              </Text>
              <Flex rowGap={0} gap={5} mb={20}>
                <Text fz={16} lh={1.1} c={Colors.darkBlue}>
                  Нийт төлбөр{" "}
                </Text>
                <Text fz={16} lh={1.1} c={Colors.darkBlue} fw={"bold"}>
                  : {money(`${reportPrice(form.usage)}`)}₮
                </Text>
              </Flex>
              <Text fz={16} lh={1.1} mb={20} c={Colors.darkBlue} fw={"bold"}>
                Төлбөрийн нөхцөл:
              </Text>
              <Flex>
                {user?.wallet && user?.wallet >= reportPrice(form.usage) ? (
                  <Button
                    w={"100%"}
                    fz={20}
                    bg={"main"}
                    py={12}
                    h={"auto"}
                    mb={40}
                    disabled={loading}
                    onClick={() => {
                      if (!loading) submit(PaymentType.POINT);
                    }}
                  >
                    {loading ? (
                      <Center>
                        <Loader color={"white"} type="bars" />
                      </Center>
                    ) : (
                      <Flex align={"center"}>
                        <EunitIcon />
                        <Text c={"white"} fz={20}>
                          Лояалти
                        </Text>
                      </Flex>
                    )}
                  </Button>
                ) : null}
                <Button
                  w={"100%"}
                  fz={20}
                  bg={"main"}
                  py={12}
                  h={"auto"}
                  mb={40}
                  disabled={loading}
                  onClick={() => {
                    if (!loading) submit(PaymentType.QPAY);
                  }}
                >
                  {loading ? (
                    <Center>
                      <Loader color={"white"} type="bars" />
                    </Center>
                  ) : (
                    <Flex align={"center"}>
                      <EunitIcon />
                      <Text c={"white"} fz={20}>
                        Qpay
                      </Text>
                    </Flex>
                  )}
                </Button>
              </Flex>
            </Box>
          )}
        </Modal.Content>
      </Modal.Root>
    </Box>
  );
};

export default Page;
