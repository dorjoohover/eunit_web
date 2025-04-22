"use client";

import { carEvaluate, getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import { ReportTitle, Spacer } from "@/components/report/shared";
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  NumberInput,
  Select,
  Stepper,
  TextInput,
} from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { CarEvaluateKey, CarEvaluateValues } from "@/utils/values";
import { Image } from "@mantine/core";
import { QpayType } from "@/utils/type";
import { PaymentType, ServiceType } from "@/config/enum";
import { DatePicker, YearPicker, YearPickerInput } from "@mantine/dates";
import {
  brands,
  carColor,
  carMain,
  carTechnik,
  engineType,
  marks,
  meterRange,
  motor,
  motorType,
  steerType,
  wheelDrive,
} from "./selectModel";
import { money } from "@/utils/functions";
import { divide } from "lodash";
interface FormType {
  brand?: string;
  mark?: string;
  motor?: string;
  motorType?: string;
  engineType?: string;
  steerType?: string;
  wheelDrive?: string;
  color?: string;
  meter?: string;
  manufactured?: string;
  imported?: string;
  conditions?: string;
  type?: string;
  interior?: string;
}
const Page = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormType>({
    brand: "",
    mark: "",
    motor: "",
    motorType: "",
    engineType: "",
    steerType: "",
    wheelDrive: "",
    conditions: "",
    interior: "",
    type: "",
    color: "",
    meter: "",
    manufactured: "",
    imported: "",
  });
  const id = params.get("id");
  const { user, refetchUser } = useAppContext();
  const router = useRouter();
  const [qpay, setQpay] = useState<{
    qpay: QpayType;
    id: number;
  } | null>(null);

  const [step, setStep] = useState(0);
  const checker = () => {
    if (
      form.brand != null ||
      form.mark != null ||
      form.motor != null ||
      form.motorType != null ||
      form.engineType != null ||
      form.steerType != null ||
      form.wheelDrive != null ||
      form.color != null ||
      form.meter != null ||
      form.manufactured != null ||
      form.conditions != null ||
      form.type != null ||
      form.interior != null ||
      form.imported != null
    )
      return true;
    return false;
  };
  const submit = async () => {
    setLoading(true);
    if (!checker()) return;

    const res = await carEvaluate(form, ServiceType.REVIEW);
    console.log(res);
    if (res?.data?.success != false) {
      refetchUser();
      router.push(`/car/result?id=${res?.data.res}`);
    }
    setLoading(false);
  };

  useEffect(() => {}, []);
  //   if (loading)
  //     return (
  //       <Center>
  //         <Loading />
  //       </Center>
  //     );
  const [active, setActive] = useState(0);

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
          !form["motorType"] ||
          !form["motor"] ||
          !form["engineType"] ||
          !form["wheelDrive"]
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
          !form["conditions"] ||
          !form["type"]
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
        submit();

        break;
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

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
                        setForm((prev) => ({ ...prev, brand: e }));
                        setForm((prev) => ({ ...prev, mark: undefined }));
                      }
                    }}
                    value={form["brand"]}
                    variant="car"
                    p="2px"
                    withScrollArea={false}
                    data={brands}
                    label={CarEvaluateValues["brand"].label}
                    placeholder={CarEvaluateValues["brand"].pl}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Select
                    w="100%"
                    onChange={(e) => {
                      if (e != null) {
                        const split = e?.split(" ");
                        const brand = split?.[0];
                        const mark = split?.[1];
                        setForm((prev) => ({ ...prev, mark: mark }));
                        if (form["brand"] == null || form["brand"] != brand)
                          setForm((prev) => ({ ...prev, brand: brand }));
                      }
                    }}
                    value={`${
                      form["mark"]
                        ? `${form["brand"]} ${form["mark"]}`
                        : undefined
                    }`}
                    variant="car"
                    p="2px"
                    withScrollArea={false}
                    data={marks
                      .map((mark) => {
                        if (
                          form["brand"] != null &&
                          form["brand"] == mark.parent
                        ) {
                          return {
                            label: mark.label,
                            value: `${mark.parent} ${mark.value}`,
                          };
                        }

                        if (!form["brand"]) {
                          return {
                            label: mark.label,
                            value: `${mark.parent} ${mark.value}`,
                          };
                        } else {
                          return undefined;
                        }
                      })
                      .filter((e) => e != undefined)}
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
                {carTechnik.map(({ key, data }, i) => (
                  <Grid.Col span={data.length > 3 ? 12 : 12} key={key}>
                    {data.length <= 3 ? (
                      <div>
                        <p className="leading-[2] text-[#546274] text-[14px] font-400">
                          {CarEvaluateValues[key as CarEvaluateKey].label}
                        </p>
                        <Flex w={"100%"} gap={12} rowGap={12}>
                          {Array.from(
                            { length: data.length },
                            (_, i) => i + 1
                          ).map((i) => {
                            return (
                              <Button
                                variant="outline"
                                c={
                                  form[key as keyof FormType] ==
                                  data[i - 1].value
                                    ? Colors.main
                                    : Colors.black
                                }
                                flex={1}
                                py={16}
                                h={"100%"}
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
                        __size="20px"
                        withScrollArea={false}
                        styles={{
                          dropdown: { maxHeight: 200, overflowY: "auto" },
                          label: { fontSize: "16px" },
                        }}
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
            <Stepper.Step
              description="Алхам 3"
              label="Нэмэлт мэдээлэл"
              bg={"transparent"}
            >
              <Grid gutter={12} maw={450}>
                {carMain.map(({ key, data }, i) => (
                  <Grid.Col span={data.length > 3 ? 6 : 12} key={key}>
                    {data.length <= 3 ? (
                      <div>
                        <p className="leading-[2] text-[#546274] text-[14px] font-400">
                          {CarEvaluateValues[key as CarEvaluateKey].label}
                        </p>
                        <Flex w={"100%"} gap={12} rowGap={12}>
                          {Array.from(
                            { length: data.length },
                            (_, i) => i + 1
                          ).map((i) => {
                            return (
                              <Button
                                variant="outline"
                                c={
                                  form[key as keyof FormType] ==
                                  data[i - 1].value
                                    ? Colors.main
                                    : Colors.black
                                }
                                flex={1}
                                py={16}
                                h={"100%"}
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
              Та илгээхдээ итгэлтэй байна уу
            </Stepper.Completed>
          </Stepper>
          <Group justify="start" mt="xl">
            {active != 0 && (
              <Button variant="default" onClick={prevStep} radius={4}>
                Буцах
              </Button>
            )}
            <Button onClick={nextStep} radius={4} color={Colors.main}>
              {active == 3 ? "Илгээх" : "Үргэлжлүүлэх"}
            </Button>
          </Group>
          {/* <Grid style={{ padding: "20px", fontSize: "11px" }}>
           
            {carMain.map(({ key, data }, i) => (
              <Grid.Col span={4} key={i}>
                <Select
                  w="100%"
                  my={5}
                  onChange={(e) => {
                    if (e != null) setForm((prev) => ({ ...prev, [key]: e }));
                  }}
                  value={form[key as keyof FormType]}
                  variant="rounded"
                  p="2px"
                  __size="20px"
                  withScrollArea={false}
                  styles={{
                    dropdown: { maxHeight: 200, overflowY: "auto" },
                    label: { fontSize: "16px" },
                  }}
                  data={data}
                  label={CarEvaluateValues[key as CarEvaluateKey].label}
                  placeholder={CarEvaluateValues[key as CarEvaluateKey].pl}
                />
              </Grid.Col>
            ))}
            
            
            <Grid.Col span={4}>
              <Spacer size={44} />
              <Button
                px={20}
                bg="main"
                fz={20}
                py={12}
                h="auto"
                fullWidth
                onClick={submit}
              >
                Үнэлгээ хийх
              </Button>
            </Grid.Col>
          </Grid>
          <Image
            src="/assets/images/car/carEva.png"
            alt="error image"
            w={{
              base: "100%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            }}
            mx={"auto !important"}
            p={20}
          /> */}
        </Box>
        <Spacer size={"10rem"} />
      </ReportTitle>
    </Box>
  );
};

export default Page;
