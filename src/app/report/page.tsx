"use client";
import { sendRequest } from "@/(api)/service.api";
import { useAppContext, useReportContext } from "@/_context";
import { Colors } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { ChooseDistrict } from "@/components/report/district";
import { ChooseLocation } from "@/components/report/location";
import { ReportTitle } from "@/components/report/shared";
import { Constant } from "@/config/enum";
import { LocationModel } from "@/models/location.model";
import { ConstantApi } from "@/utils/routes";
import { districts } from "@/utils/values";
import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type DistrictType = {
  district: string;
  count: number;
};

const Page = () => {
  const searchParams = useSearchParams();
  const district = searchParams.get("district");
  const location = searchParams.get("location");

  const [payload, setPayload] = useState<{
    district?: number;
    location?: number;
    area?: number;
  }>({
    // district id | index bna
    district: undefined,
    location: undefined,
    area: undefined,
  });
  const { user, refetchUser } = useAppContext();
  const [data, setData] = useState<DistrictType[] | LocationModel[]>([]);

  const getData = async (url: string) => {
    try {
      await fetch(url)
        .then((d) => d.json())
        .then((d) => {
          if (url.includes("location")) {
            setFilteredData(d.payload as LocationModel[]);
          }
          setData(d.payload);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [filteredData, setFilteredData] = useState<LocationModel[] | null>(
    null
  );
  const filter = (e: string) => {
    if (data != null) {
      setFilteredData(
        (data as LocationModel[]).filter(
          (d) =>
            d.town.toLowerCase().includes(e) || d.name.toLowerCase().includes(e)
        )
      );
    }
  };
  const checker = () => {
    if (payload.district != null && payload.location != null) return true;
    return false;
  };
  const router = useRouter();

  const submit = async () => {
    if (!checker()) return;

    const res = await sendRequest(payload.location!, payload.area!);
    console.log(res);
    if (res?.success) {
      refetchUser();
      router.push(`/report/result?id=${res.data}`);
    }
    // setUser((await getUserData()).data);
    // if (!res?.token) {
    //   router.push("/login");
    //   return;
    // }
    // if (res.success) {
    //   setResult(res!.data);
    // }
    // router.push(
    //   `/report/result?location=${payload.location}&area=${payload.area}`
    // );
  };
  useEffect(() => {
    if (!district && !location)
      getData(`${ConstantApi.constant}${Constant.DISTRICT}/0`);
    if (district) {
      getData(
        `${ConstantApi.constant}${Constant.LOCATION}/${districts[+district].id}`
      );
      setPayload((prev) => ({ ...prev, district: +district }));
    }
    if (location && district) {
      setPayload((prev) => ({
        ...prev,
        district: parseInt(district),
        location: parseInt(location),
      }));
    }
  }, [district, location]);

  const nextStep = (value: number) => {
    if (location) {
      submit();
    } else {
      router.push(
        `/report?${
          district
            ? `district=${payload.district}&location=${value}`
            : `district=${value}`
        }`
      );
    }
  };
  const reportTitleText = () => {
    if (district && payload.district) return districts[payload.district].name;
    if (location)
      return (data as LocationModel[])?.filter(
        (loc) => loc.id == payload.location
      )[0]?.town;
    return "Дүүрэг даяар эса";
  };

  return (
    <Box>
      <ReportTitle text={reportTitleText()}>
        {district && location == null && (
          <Flex pb={40} w={"100%"} justify={"space-between"}>
            <Flex align={"center"}>
              <TextInput
                c={"deepMose"}
                fw={"bold"}
                fz={21}
                onChange={(e) => filter(e.target.value)}
                rightSection={<IconSearch color={Colors.deepMose} />}
              />
              <Text>0</Text>
            </Flex>
            <Flex w={"auto"}>
              <Button>a</Button>
              <Button>b</Button>
            </Flex>
          </Flex>
        )}
        {district && location && (
          <Box>
            <Text fz={30} mb={100}>
              Шаардлагатай мэдээлэл бөглөх хэсэг
            </Text>

            <Flex
              mx={160}
              w={"full"}
              justify={"center"}
              align={"center"}
              gap={180}
            >
              <TextInput
                label="Орон сууцны м.кв"
                placeholder="Зөвхөн тоо оруулна уу."
                c={"grey"}
                onChange={(e) => {
                  const value = e.target.value;
                  const v =
                    value == undefined || value == ""
                      ? 0
                      : isNaN(parseFloat(value))
                      ? 0
                      : parseFloat(value);

                  if (value != null)
                    setPayload((prev) => ({ ...prev, area: v }));
                }}
                value={payload.area}
                pattern="/^[\d.]+$/"
                variant="bottom"
                mr={50}
                w={"100%"}
              />
              <Button
                c={"white"}
                w={"100%"}
                onClick={() => {
                  nextStep(0);
                }}
                px={60}
                py={20}
                h={"auto"}
                bg={"main"}
              >
                Боловсруулах
              </Button>
            </Flex>
          </Box>
        )}
      </ReportTitle>
      <Box
        style={{
          borderTopColor: Colors.deepMose20,
          borderTopWidth: 1,
          borderTopStyle: "solid",
        }}
        w={"100%"}
        bg={"white"}
      >
        {district == null &&
          location == null &&
          districts.map((district, i) => {
            const count =
              (data as DistrictType[])?.filter(
                (d) => d.district == district.id
              )?.[0]?.count ?? 0;

            let dist = {
              img: district.img,
              id: district.id,
              text: `${district.committee}-${locale.data.GLOBAL.N}
                      ${locale.data.GLOBAL.COMMITTEE} |`,
              label: `${count} ${locale.data.GLOBAL.APARTMENT}`,
              name: district.name,
            };
            return (
              <ChooseDistrict
                key={i}
                district={dist}
                onClick={() => {
                  nextStep(i);
                }}
              />
            );
          })}
        {district != null &&
          location == null &&
          filteredData?.map((d, i) => {
            return (
              <ChooseLocation
                key={i}
                location={{
                  label: `${d.count} ${locale.data.GLOBAL.INFORMATION}`,
                  text: d.name,
                  title: d.town,
                }}
                onClick={() => {
                  nextStep(d.id);
                }}
              />
            );
          })}
      </Box>
    </Box>
  );

  // return <Result slug={slug} />;
};

export default Page;
