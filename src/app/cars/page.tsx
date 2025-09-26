"use client";
import { checkPayment, getCarInfo, carEvaluate } from "@/(api)/service.api";
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
  Loader,
  Modal,
  RingProgress,
  Select,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  carAdditional,
  carAllFields,
  CarEvaluateKey,
  CarEvaluateValues,
  carTechnical,
  carView,
  ReportSubmitErrorMessages,
  ReportSubmitErrorMessagesType,
} from "@/utils/values";
import { Image } from "@mantine/core";
import { QpayType, VehicleInfo } from "@/utils/type";
import { PaymentType, ServiceType } from "@/config/enum";

import { isValidCarNumber, money } from "@/utils/functions";
import { upperFirst } from "lodash";
import {
  useDisclosure,
  useMediaQuery,
  useScrollIntoView,
} from "@mantine/hooks";
import { GeneralWidget } from "@/components/report/result";
import { IoCarSportOutline, IoColorFillOutline } from "react-icons/io5";
import { BsBookmark } from "react-icons/bs";
import { PiEngine } from "react-icons/pi";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { AiOutlineDashboard } from "react-icons/ai";
import {
  GiBrassKnuckles,
  GiCarKey,
  GiCarWheel,
  GiGearStickPattern,
  GiMachineGunMagazine,
  GiSuspensionBridge,
  GiTireIron,
  GiWindow,
} from "react-icons/gi";
import { LuPaintRoller, LuPalette } from "react-icons/lu";
import { FaCarSide, FaGasPump, FaSnowflake } from "react-icons/fa";
import {
  MdOutlineAssessment,
  MdOutlineChecklist,
  MdOutlineDirectionsCar,
  MdOutlineMemory,
  MdOutlineSystemSecurityUpdateWarning,
} from "react-icons/md";
export interface FormType {
  plateNumber?: string;
  milleage?: number | string;
  drive?: number | string;
  gearbox?: number | string;
  vehicleCondition?: number | string;
  engineAndTransmission?: number | string;
  suspensionAndSteering?: number | string;
  brakeSystem?: number | string;
  tire?: number | string;
  climateSystem?: number | string;
  body?: number | string;
  paintwork?: number | string;
  rim?: number | string;
  windshield?: number | string;
  salon?: number | string;
  electronicSystem?: number | string;
  overall?: number | string;
  extraFeatures?: number | string;
}
export const carFields = [
  {
    name: "Марк",
    key: "markName",
    icon: <IoCarSportOutline size={24} />,
    step: undefined,
  },
  {
    name: "Модел",
    key: "modelName",
    icon: <BsBookmark size={24} />,
    step: undefined,
  },
  {
    name: "Хөдөлгүүрийн багтаамж",
    key: "capacity",
    icon: <PiEngine size={24} />,
    step: undefined,
  },
  {
    name: "Өнгө",
    key: "colorName",
    icon: <IoColorFillOutline size={24} />,
    step: undefined,
  },
  {
    name: "Үйлдвэрлэсэн он",
    key: "buildYear",
    icon: <CiCalendarDate size={24} />,
    step: undefined,
  },
  {
    name: "Импортын огноо",
    key: "importDate",
    icon: <CiCalendar size={24} />,
    step: undefined,
  },
  {
    name: "Гүйлт",
    key: "milleage",
    icon: <AiOutlineDashboard size={24} />,
    step: 1,
  },
  {
    name: "Хөдөлгүүрийн төрөл",
    key: "fueltype",
    icon: <FaGasPump size={24} />,
    step: undefined,
  },
  {
    name: "Хүрд",
    key: "wheelPosition",
    icon: <MdOutlineSystemSecurityUpdateWarning size={24} />,
    step: undefined,
  },
  {
    name: "Хурдны хайрцаг",
    key: "gearbox",
    icon: <GiGearStickPattern size={24} />,
    step: 2,
  },
  { name: "Хөтлөгч", key: "drive", icon: <FaCarSide size={24} />, step: 2 },
  {
    name: "Ерөнхий нөхцөл",
    key: "vehicleCondition",
    icon: <MdOutlineChecklist size={24} />,
    step: 2,
  },
  {
    name: "Хөдөлгүүр ба хурдны хайрцаг",
    key: "engineAndTransmission",
    icon: <GiMachineGunMagazine size={24} />,
    step: 2,
  },
  {
    name: "Тэнхлэг ба жолоодлого",
    key: "suspensionAndSteering",
    icon: <GiSuspensionBridge size={24} />,
    step: 2,
  },
  {
    name: "Тоормос",
    key: "brakeSystem",
    icon: <GiBrassKnuckles size={24} />,
    step: 2,
  },
  { name: "Дугуй", key: "tire", icon: <GiTireIron size={24} />, step: 2 },
  {
    name: "Агааржуулалт/Халаалт",
    key: "climateSystem",
    icon: <FaSnowflake size={24} />,
    step: 2,
  },
  {
    name: "Биеийн байдал",
    key: "body",
    icon: <MdOutlineDirectionsCar size={24} />,
    step: 3,
  },
  {
    name: "Будаг",
    key: "paintwork",
    icon: <LuPaintRoller size={24} />,
    step: 3,
  },
  { name: "Обуд", key: "rim", icon: <GiCarWheel size={24} />, step: 3 },
  {
    name: "Салхины шил",
    key: "windshield",
    icon: <GiWindow size={24} />,
    step: 3,
  },
  { name: "Салоны өнгө", key: "salon", icon: <LuPalette size={24} />, step: 4 },
  {
    name: "Электроник систем",
    key: "electronicSystem",
    icon: <MdOutlineMemory size={24} />,
    step: 4,
  },
  {
    name: "Их бие",
    key: "overall",
    icon: <MdOutlineAssessment size={24} />,
    step: 4,
  },
  {
    name: "Нэмэлт тоноглол",
    key: "extraFeatures",
    icon: <GiCarKey size={24} />,
    step: 4,
  },
];
const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormType>({
    plateNumber: undefined,
    milleage: undefined,
    drive: undefined,
    gearbox: undefined,
    vehicleCondition: undefined,
    engineAndTransmission: undefined,
    suspensionAndSteering: undefined,
    brakeSystem: undefined,
    tire: undefined,
    climateSystem: undefined,
    body: undefined,
    paintwork: undefined,
    rim: undefined,
    windshield: undefined,
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
      if (laststep.includes(value) && active == 4 && !opened) continue;
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
  const [vehicle, setVehicle] = useState<VehicleInfo | null>(null);
  const [price, setPrice] = useState();
  const submit = async (payment: number) => {
    // const check = checker();
    // console.log(check);
    // if (!check) return;
    setLoading(true);
    if (
      payment != PaymentType.QPAY &&
      user?.wallet &&
      user?.wallet - 1000 < 0
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
    const res = await carEvaluate(
      { value: form, vehicle: vehicle! },
      ServiceType.REVIEW,
      payment
    );

    // setPrice(res?.data?.price);
    // notifications.show({
    //   message: `${money(res?.data?.price)}`,
    //   autoClose: false,
    // });
    console.log(res);
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
      router.push(`/cars/result?id=${res?.data.res}`);
    }
    setLoading(false);
  };
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 0,
  });
  const [active, setActive] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const nextStep = async () => {
    const plateNumber = form.plateNumber;
    if (plateNumber && active == 0) {
      if (!isValidCarNumber(plateNumber!)) {
        notifications.show({
          position: "top-center",
          message: "Улсын дугаар алдаатай байна.",
        });
        return;
      } else {
        if (vehicle == null) {
          const res = await getCarInfo(plateNumber);
          setVehicle(res?.data.vehicle);
        } else {
          setActive(1);
        }
      }
    }

    if (active == 1) {
      if (
        !form.drive ||
        !form.gearbox ||
        !form.vehicleCondition ||
        !form.engineAndTransmission ||
        !form.suspensionAndSteering ||
        !form.brakeSystem ||
        !form.tire ||
        !form.climateSystem ||
        !form.milleage
      ) {
        console.log(form);
        notifications.show({
          position: "top-center",
          message: "Мэдээллийг бүрэн оруулна уу",
        });
        return;
      }
      setActive((current) => (current < 4 ? current + 1 : current));
    }
    if (active == 2) {
      if (!form.body || !form.paintwork || !form.rim || !form.windshield) {
        notifications.show({
          position: "top-center",
          message: "Мэдээллийг бүрэн оруулна уу",
        });
        return;
      }
      setActive((current) => (current < 4 ? current + 1 : current));
    }
    if (active == 3) {
      if (
        !form.salon ||
        !form.electronicSystem ||
        !form.overall ||
        !form.extraFeatures
      ) {
        notifications.show({
          position: "top-center",
          message: "Мэдээллийг бүрэн оруулна уу",
        });
        return;
      }
      setActive((current) => (current < 4 ? current + 1 : current));
    }
    scrollIntoView({
      alignment: "start",
    });
  };
  const prevStep = () => {
    scrollIntoView({
      alignment: "start",
    });
    setActive((current) => (current > 0 ? current - 1 : current));
  };

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
  const getCarFieldDisplay = (carField: {
    name: string;
    key: string;
    icon: JSX.Element;
    step?: number;
  }) => {
    const key = carField.key as keyof FormType | keyof VehicleInfo;

    // Form болон Vehicle-аас value-г авна
    const valueFromForm = form[key as keyof FormType];
    const valueFromVehicle = vehicle?.[key as keyof VehicleInfo];

    // Step 1: "milleage" field
    if (key === "milleage") {
      return valueFromForm ? `${money(String(valueFromForm))}км` : "";
    }

    if (carField.step === undefined) {
    
      return valueFromVehicle ?? "";
    }

    if (valueFromForm && key in carAllFields) {
      const fieldValues = carAllFields[key as keyof typeof carAllFields]?.value;
      if (fieldValues && valueFromForm in fieldValues) {
        return fieldValues[valueFromForm as keyof typeof fieldValues] ?? "";
      }
    }

    return "";
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
  //  if (e.target.value == null) {
  //                   message = "Улсын дугаараа оруулна уу";
  //                 } else {
  //                   if (!isValidCarNumber(e.target.value)) {
  //                     message = "Улсын дугаар алдаатай байна.";
  //                   }
  //                 }

  const steps = (step: number) => {
    // dugaar oruulah
    if (step == 0)
      return (
        <Grid maw={450} gutter={12}>
          <Grid.Col span={12}>
            <TextInput
              fz={15}
              label={"Улсын дугаар"}
              placeholder={"1234УБА"}
              value={form.plateNumber}
              onChange={(e) => {
                const value = e.target.value.replaceAll(",", "");
                setForm((prev) => ({
                  ...prev,
                  plateNumber: `${value}`,
                }));
              }}
              variant="car"
              min={0}
              w={"100%"}
              maw={"100%"}
            />
          </Grid.Col>
          {vehicle && (
            <div className="p-4 bg-white rounded-2xl shadow w-full">
              {vehicle.buildYear && (
                <CarField
                  label="Үйлдвэрлэсэн он"
                  value={`${vehicle.buildYear} он`}
                />
              )}
              {vehicle.markName && (
                <CarField label="Марк" value={vehicle.markName} />
              )}
              {vehicle.modelName && (
                <CarField label="Модел" value={vehicle.modelName} />
              )}
              {vehicle.plateNumber && (
                <CarField label="Улсын дугаар" value={vehicle.plateNumber} />
              )}
              {vehicle.colorName && (
                <CarField label="Өнгө" value={vehicle.colorName} />
              )}
              {vehicle.className && (
                <CarField label="Ангилал" value={vehicle.className} />
              )}
              {vehicle.fueltype && (
                <CarField label="Хөдөлгүүрийн төрөл" value={vehicle.fueltype} />
              )}
              {vehicle.fueltype && (
                <CarField label="Хүрд" value={vehicle.wheelPosition ?? ""} />
              )}
              {vehicle.capacity && (
                <CarField
                  label="Хөдөлгүүрийн багтаамж"
                  value={`${vehicle.capacity} cc`}
                />
              )}
              {vehicle.mass && (
                <CarField label="Жин" value={`${vehicle.mass} кг`} />
              )}
              {vehicle.manCount && (
                <CarField
                  label="Суудлын тоо"
                  value={vehicle.manCount.toString()}
                />
              )}

              {vehicle.importDate && (
                <CarField
                  label="Импортын огноо"
                  value={`${vehicle.importDate} он`}
                />
              )}
            </div>
          )}
        </Grid>
      );
    // body, rim , windshield, PAINTWORK, OVERALL, ELECTRONICSYSTEM, SALON, CLIMATESYSTEM, SUSPENSIONANDSTEERINGm,ENGINEANDTRANSMISSION, BRAKESYSTEM, TIRE, EXTRAFEATURES, VEHICLECONDITION, DRIVE, GEARBOX,

    return (
      <Grid gutter={12}>
        {active == 1 &&
          Object.entries(carTechnical).map(([k, value], i) => {
            const data = value.values;
            const label = value.label;
            const key = value.key;
            console.log(form[value as unknown as keyof FormType], label);
            return (
              <Grid.Col
                span={(data?.length ?? 0) > 3 ? 6 : 6}
                key={`${key} ${i}`}
              >
                {key === undefined ? (
                  <div>
                    <p className="leading-[2] text-[#546274] text-[14px] font-400">
                      {label}
                    </p>
                    <Flex w={"100%"} gap={12} rowGap={12} align={"stretch"}>
                      <TextInput
                        mb={10}
                        key={i}
                        fz={16}
                        label={""}
                        placeholder={label}
                        value={
                          form[value as unknown as keyof FormType] as string
                        }
                        onChange={(e) => {
                          console.log(e.target.value, k);
                          if (e.target.value != null) {
                            setForm((prev) => ({
                              ...prev,
                              [k]: e.target.value,
                            }));
                          }
                        }}
                        variant="icon"
                        min={0}
                        w={"100%"}
                        maw={"100%"}
                      />
                    </Flex>
                  </div>
                ) : (
                  <Select
                    w="100%"
                    my={5}
                    onChange={(e) => {
                      if (e != null) setForm((prev) => ({ ...prev, [k]: e }));
                    }}
                    value={form[k as keyof FormType] as string}
                    variant="car"
                    __size="20px"
                    withScrollArea={false}
                    styles={{
                      dropdown: { maxHeight: 200, overflowY: "auto" },
                      label: { fontSize: "16px" },
                    }}
                    data={data?.map(([k, v]: [string, string]) => {
                      return {
                        label: v,
                        value: k,
                      };
                    })}
                    label={label}
                    placeholder={label}
                  />
                )}
              </Grid.Col>
            );
          })}
        {active == 2 &&
          Object.entries(carView).map(([k, value], i) => {
            const data = value.values;
            const label = value.label;
            const key = value.key;

            return (
              <Grid.Col
                span={(data?.length ?? 0) > 3 ? 6 : 6}
                key={`${key} ${i}`}
              >
                <Select
                  w="100%"
                  my={5}
                  onChange={(e) => {
                    if (e != null) setForm((prev) => ({ ...prev, [k]: e }));
                  }}
                  value={form[k as keyof FormType] as string}
                  variant="car"
                  __size="20px"
                  withScrollArea={false}
                  styles={{
                    dropdown: { maxHeight: 200, overflowY: "auto" },
                    label: { fontSize: "16px" },
                  }}
                  data={data?.map(([k, v]: [string, string]) => {
                    return {
                      label: v,
                      value: k,
                    };
                  })}
                  label={label}
                  placeholder={label}
                />
              </Grid.Col>
            );
          })}
        {active == 3 &&
          Object.entries(carAdditional).map(([k, value], i) => {
            const data = value.values;
            const label = value.label;
            const key = value.key;

            return (
              <Grid.Col
                span={(data?.length ?? 0) > 3 ? 6 : 6}
                key={`${key} ${i}`}
              >
                <Select
                  w="100%"
                  my={5}
                  onChange={(e) => {
                    if (e != null) setForm((prev) => ({ ...prev, [k]: e }));
                  }}
                  value={form[k as keyof FormType] as string}
                  variant="car"
                  __size="20px"
                  withScrollArea={false}
                  styles={{
                    dropdown: { maxHeight: 200, overflowY: "auto" },
                    label: { fontSize: "16px" },
                  }}
                  data={data?.map(([k, v]: [string, string]) => {
                    return {
                      label: v,
                      value: k,
                    };
                  })}
                  label={label}
                  placeholder={label}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    );
  };
  return (
    <Box ref={targetRef}>
      <ReportTitle text={"АВТОМАШИН"}>
        <Box
          style={{
            borderRadius: "20px",
          }}
        >
          {!matches && (
            <Flex align={"center"}>
              <RingProgress
                thickness={10}
                sections={[
                  {
                    value: (100 * active) / 4,
                    color: Colors.main,
                  },
                ]}
                size={100}
                transitionDuration={250}
                label={
                  <Text ta="center" c={Colors.headBlue} fw={"900"} fz={24}>
                    {active}/4
                  </Text>
                }
              />
              <Box>
                <Text fz={16} fw={500}>
                  {active == 0
                    ? "Миний машин"
                    : active == 1
                    ? "Техникийн үзүүлэлт"
                    : active == 2
                    ? "Гадна үзэмж"
                    : active == 3
                    ? "Дотор ба нэмэлт"
                    : "Баталгаажуулалт"}
                </Text>
                <Text c={"#546274"} fz={14} fw={400}>
                  {active != 4 ? `Алхам ${active + 1}` : ""}
                </Text>
              </Box>
            </Flex>
          )}
          {!matches && steps(active)}
          {/* {matches && ( */}
          <Stepper active={active} onStepClick={setActive} color={Colors.main}>
            {matches && (
              <Stepper.Step
                description="Алхам 1"
                label="Миний машин"
                bg={"transparent"}
              >
                {steps(0)}
              </Stepper.Step>
            )}
            {matches && (
              <Stepper.Step
                description="Алхам 2"
                label="Техникийн үзүүлэлт"
                bg={"transparent"}
              >
                {steps(1)}
              </Stepper.Step>
            )}
            {matches && (
              <Stepper.Step
                description="Алхам 3"
                label="Гадна үзэмж"
                bg={"transparent"}
              >
                {steps(2)}
              </Stepper.Step>
            )}
            {matches && (
              <Stepper.Step
                description="Алхам 4"
                label="Дотор ба нэмэлт"
                bg={"transparent"}
              >
                {steps(3)}
              </Stepper.Step>
            )}

            {active == 4 && (
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
                          onClick={() => {
                            if (carField.step) {
                              setActive(carField.step);
                            }
                          }}
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
                              {upperFirst(`${getCarFieldDisplay(carField)}`)}
                            </Text>
                          </Box>
                        </Flex>
                      </Grid.Col>
                    ))}
                  </Grid>
                </GeneralWidget>
              </Stepper.Completed>
            )}
          </Stepper>
          {/* )} */}
          <Group justify="start" mt="xl">
            {active != 0 && (
              <Button variant="default" onClick={prevStep} radius={4}>
                Буцах
              </Button>
            )}
            <Button
              onClick={
                () => (active == 4 ? submit(PaymentType.POINT) : nextStep())
                // active == 4 ? submit(PaymentType.QPAY) : nextStep()
              }
              loading={loading}
              disabled={loading}
              radius={4}
              color={Colors.main}
            >
              {active == 4 ? "Илгээх" : "Үргэлжлүүлэх"}
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
                  {/* {paymentValues["usage"].map((data, i) => {
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
                  })} */}
                </Flex>
              </Box>

              {/* <WalletCard
                onClick={() => {
                  router.push("/wallet");
                }}
              /> */}
              {/* {form.usage == `${PaymentUsage.VALUE}` ||
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
                ))} */}
              <Text fz={16} lh={1.1} mb={20} c={Colors.darkBlue}>
                Урамшууллын үлдэгдэл: {money(`${user?.wallet ?? 0}`)} E-unit
              </Text>
              {/* <Flex rowGap={0} gap={5} mb={20}>
                <Text fz={16} lh={1.1} c={Colors.darkBlue}>
                  Нийт төлбөр{" "}
                </Text>
                <Text fz={16} lh={1.1} c={Colors.darkBlue} fw={"bold"}>
                  : {money(`${reportPrice(form.usage)}`)}₮
                </Text>
              </Flex> */}
              <Text fz={16} lh={1.1} mb={20} c={Colors.darkBlue} fw={"bold"}>
                Төлбөрийн нөхцөл:
              </Text>
            </Box>
          )}
        </Modal.Content>
      </Modal.Root>
    </Box>
  );
};

export default Page;

const CarField = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex justify-between">
      <dt className="text-gray-600">{label}:</dt>
      <dd className="font-bold">{value}</dd>
    </div>
  );
};
