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
import { CarEvaluateKey, CarEvaluateValues } from "@/utils/values";
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
          <Grid style={{ padding: "20px", fontSize: "11px" }}>
            {[
              { key: "brand", data: brands },
              { key: "mark", data: brands },
              { key: "motor", data: motor },
              { key: "motorType", data: motorType },
              { key: "engineType", data: engineType },
              { key: "steerType", data: steerType },
              { key: "wheelDrive", data: wheelDrive },
              { key: "color", data: carColor },
              { key: "meter", data: meterRange },
              { key: "manufactured", data: meterRange },
              { key: "imported", data: meterRange },
            ].map(({ key, data }) => (
              <Grid.Col span={4} key={key}>
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
          />
        </Box>
        <Spacer size={"10rem"} />
      </ReportTitle>
    </Box>
  );
};

export default Page;
