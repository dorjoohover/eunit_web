"use client";

import { carEvaluate, getRequestResult } from "@/(api)/service.api";
import { useAppContext } from "@/_context";
import { Loading } from "@/app/loading";
import { Colors } from "@/base/constants";
import { ReportTitle, Spacer } from "@/components/report/shared";
import { Box, Button, Flex, Grid, Group, Select } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { CarEvaluateValues } from "@/utils/values";
import { Image } from "@mantine/core";
import { QpayType } from "@/utils/type";
import { PaymentType, ServiceType } from "@/config/enum";
import { DatePicker } from "@mantine/dates";
import {
  brands,
  carColor,
  engineType,
  meterRange,
  motor,
  motorType,
  steerType,
  wheelDrive,
} from "./selectModel";
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
      router.push(`/report/result?id=${res?.data.res}`);
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

  return (
    <Box>
      <ReportTitle text={"АВТОМАШИН"}>
        <Box
          bg={"white"}
          style={{
            borderRadius: "20px",
          }}
        >
          <Grid style={{ padding: "20px" }}>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, brand: e }));
                }}
                value={form.brand}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={brands}
                label={CarEvaluateValues["brand"].label}
                placeholder={CarEvaluateValues["brand"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, mark: e }));
                }}
                value={form.mark}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={brands}
                label={CarEvaluateValues["mark"].label}
                placeholder={CarEvaluateValues["mark"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, motor: e }));
                }}
                value={form.motor}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={motor}
                label={CarEvaluateValues["motor"].label}
                placeholder={CarEvaluateValues["motor"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, motorType: e }));
                }}
                value={form.motorType}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={motorType}
                label={CarEvaluateValues["motorType"].label}
                placeholder={CarEvaluateValues["motorType"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null)
                    setForm((prev) => ({ ...prev, engineType: e }));
                }}
                value={form.engineType}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={engineType}
                label={CarEvaluateValues["engineType"].label}
                placeholder={CarEvaluateValues["engineType"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, steerType: e }));
                }}
                value={form.steerType}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={steerType}
                label={CarEvaluateValues["steerType"].label}
                placeholder={CarEvaluateValues["steerType"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null)
                    setForm((prev) => ({ ...prev, wheelDrive: e }));
                }}
                value={form.wheelDrive}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={wheelDrive}
                label={CarEvaluateValues["wheelDrive"].label}
                placeholder={CarEvaluateValues["wheelDrive"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, color: e }));
                }}
                value={form.color}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={carColor}
                label={CarEvaluateValues["color"].label}
                placeholder={CarEvaluateValues["color"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, meter: e }));
                }}
                value={form.meter}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={meterRange}
                label={CarEvaluateValues["meter"].label}
                placeholder={CarEvaluateValues["meter"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null)
                    setForm((prev) => ({ ...prev, manufactured: e }));
                }}
                value={form.manufactured}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={meterRange}
                label={CarEvaluateValues["manufactured"].label}
                placeholder={CarEvaluateValues["manufactured"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                w={"100%"}
                my={5}
                onChange={(e) => {
                  if (e != null) setForm((prev) => ({ ...prev, imported: e }));
                }}
                value={form.imported}
                variant="rounded"
                p={"2px"}
                __size="20px"
                withScrollArea={false}
                styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
                data={meterRange}
                label={CarEvaluateValues["imported"].label}
                placeholder={CarEvaluateValues["imported"].pl}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Spacer size={44} />
              <Button
                px={20}
                bg={"main"}
                fz={20}
                py={12}
                h={"auto"}
                fullWidth
                onClick={submit}
              >
                Үнэлгээ хийх
              </Button>
            </Grid.Col>
          </Grid>
          <Spacer size={"1rem"} />
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
          />
        </Box>
        <Spacer size={"10rem"} />
      </ReportTitle>
    </Box>
  );
};

export default Page;
