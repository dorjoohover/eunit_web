"use client";
import { sendRequest } from "@/(api)/service.api";
import { useAppContext, useReportContext } from "@/_context";
import { Colors } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { ChooseDistrict, ServiceForm } from "@/components/report/district";
import { ChooseLocation } from "@/components/report/location";
import { ReportTitle } from "@/components/report/shared";
import { ChargeCard, WalletCard } from "@/components/shared/card";
import { Constant, ServiceType } from "@/config/enum";
import { LocationModel } from "@/models/location.model";
import { colors } from "@/theme/colors";
import { EunitIcon } from "@/theme/components/icon";
import { Assets } from "@/utils/assets";
import { ConstantApi } from "@/utils/routes";
import { districts } from "@/utils/values";
import {
  Box,
  Button,
  Center,
  Flex,
  Highlight,
  Loader,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
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
  const [opened, { open, close }] = useDisclosure(false);

  const [payload, setPayload] = useState<{
    district?: number;
    location?: number;
    values?: {
      area: number;
      no?: string;
      floor?: number;
      room?: number;
    };
  }>({
    // district id | index bna
    district: undefined,
    values: undefined,
    location: undefined,
  });
  const { user, refetchUser } = useAppContext();
  const [data, setData] = useState<DistrictType[] | LocationModel[]>([]);
  const [loading, setLoading] = useState(false);
  const getData = async (url: string) => {
    try {
      setLoading(true);
      await fetch(url)
        .then((d) => d.json())
        .then((d) => {
          if (url.includes("location")) {
            setFilteredData(d.payload as LocationModel[]);
          }
          setData(d.payload);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [filteredData, setFilteredData] = useState<LocationModel[] | null>(
    null
  );
  const [town, setTown] = useState(true);
  const [isList, setIsList] = useState(true);
  const filter = (e: string) => {
    if (data != null) {
      setFilteredData(
        (data as LocationModel[]).filter(
          (d) =>
            d.town?.toLowerCase().includes(e) ||
            d.name.toLowerCase().includes(e) ||
            d.englishNameOfTown?.toLowerCase().includes(e)
        )
      );
    }
  };
  const checker = () => {
    if (
      payload.district != null ||
      payload.location != null ||
      payload.values != null
    )
      return true;
    return false;
  };
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    if (!checker()) return;
    if (user?.wallet && user?.wallet - 2000 < 0) {
      notifications.show({
        color: "warning",
        title: "Анхааруулга",
        message: "Үлдэгдэл хүрэлцэхгүй байна.",
      });
    }
    const res = await sendRequest(
      payload.location!,
      payload.values!,
      ServiceType.REVIEW
    );
    if (res?.success) {
      refetchUser();
      router.push(`/report/result?id=${res.data}`);
    }
  };
  const getTown = (t?: number) => {
    if (district)
      getData(
        `${ConstantApi.constant}${
          t === undefined ? (town ? Constant.TOWN : Constant.NOTTOWN) : t
        }/${districts[+district!].id}`
      );
  };
  useEffect(() => {
    if (!district && !location)
      getData(`${ConstantApi.constant}${Constant.DISTRICT}/0`);
    if (district) {
      getTown();
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

  const nextStep = (
    value: number,
    values?: {
      area: number;
      no?: string;
      floor?: number;
      room?: number;
    }
  ) => {
    if (location && values) {
      setPayload((prev) => ({ ...prev, values: values }));
      open();
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
    if (district && !location)
      return { text: districts[payload.district ?? +district].name };
    if (location) {
      return {
        text:
          (data as LocationModel[])?.filter(
            (loc) => loc.id == payload.location
          )[0]?.town ??
          (data as LocationModel[])?.filter(
            (loc) => loc.id == payload.location
          )[0]?.name,
      };
    }
    return { text: "ТАНЫ", text1: "үнэ цэн", text2: "хөрөнгө" };
  };

  return (
    <Box>
      <ReportTitle {...reportTitleText()}>
        {district == null && (
          <Flex pb={40} w={"100%"} justify={"space-between"}>
            <Flex align={"center"}>
              <Text fz={30} fw={500}>
                Дүүргийн мэдээлэл
              </Text>
            </Flex>
            <Flex w={"auto"}>
              <Button
                radius={32}
                c={isList ? "white" : "black"}
                bg={isList ? "main" : "transparent"}
                fw={"bold"}
                py={10}
                px={30}
                h={"auto"}
                fz={21}
                style={{
                  border: `1px solid ${Colors.headBlue}`,
                }}
                onClick={() => {
                  getTown(Constant.TOWN);
                  setIsList(true);
                }}
              >
                Жагсаалтаар
              </Button>
              {/* <Button
                py={10}
                px={30}
                h={"auto"}
                radius={32}
                c={!isList ? "white" : "black"}
                bg={!isList ? "main" : "transparent"}
                fw={"bold"}
                fz={21}
                onClick={() => {
                  getTown(Constant.NOTTOWN);
                  setIsList(false);
                }}
                style={{
                  border: `1px solid ${Colors.headBlue}`,
                }}
              >
                Байршлаар
              </Button> */}
            </Flex>
          </Flex>
        )}
        {district && location == null && (
          <Flex pb={40} w={"100%"} justify={"space-between"}>
            <Flex align={"center"}>
              <TextInput
                c={"deepMose"}
                fw={"bold"}
                fz={21}
                style={{
                  color: "deepMose",
                }}
                placeholder={"Хайлт"}
                onChange={(e) => filter(e.target.value)}
                rightSection={<IconSearch color={Colors.deepMose} />}
              />
              <Text td={"underline"} fz={21}>
                {filteredData?.length} result
              </Text>
            </Flex>
            <Flex w={"auto"}>
              <Button
                radius={32}
                c={town ? "white" : "black"}
                bg={town ? "main" : "transparent"}
                fw={"bold"}
                py={10}
                px={30}
                h={"auto"}
                style={{
                  border: `1px solid ${Colors.headBlue}`,
                }}
                fz={21}
                onClick={() => {
                  getTown(Constant.TOWN);
                  setTown(true);
                }}
              >
                Хотхонтой байр
              </Button>
              <Button
                radius={32}
                c={!town ? "white" : "black"}
                bg={!town ? "main" : "transparent"}
                fw={"bold"}
                fz={21}
                h={"auto"}
                py={10}
                px={30}
                onClick={() => {
                  getTown(Constant.NOTTOWN);
                  setTown(false);
                }}
                style={{
                  border: `1px solid ${Colors.headBlue}`,
                }}
              >
                Хотхонгүй байр
              </Button>
            </Flex>
          </Flex>
        )}
        {district && location && (
          <Box>
            <Text fz={30} mb={100}>
              Шаардлагатай мэдээлэл бөглөх хэсэг
            </Text>

            <ServiceForm
              submit={(values: {
                area: number;
                no?: string;
                floor?: number;
                room?: number;
              }) => {
                nextStep(0, values);
              }}
            />
          </Box>
        )}
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
              highlight={["урамшуулал", "10,000 E-unit"]}
              highlightStyles={{
                background: Colors.main,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Шинэ хэрэглэгчийн урамшуулал бүхий 10,000 E-unit ашиглан энэхүү
              үйлчилгээг авах боломжтой.
            </Highlight>

            <Button
              w={"100%"}
              fz={24}
              bg={"main"}
              py={16}
              h={"auto"}
              mb={40}
              onClick={() => {
                if (!loading) submit();
              }}
            >
              {loading ? (
                <Center>
                  <Loader c={"white"} />
                </Center>
              ) : (
                <Flex align={"center"}>
                  <Text c={"white"} fz={24}>
                    2,000.00
                  </Text>
                  <EunitIcon />
                  <Text c={"white"} fz={24}>
                    төлөх
                  </Text>
                </Flex>
              )}
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
      >
        {loading && (
          <Center h={400}>
            <Loader color="main" />
          </Center>
        )}
        {!loading &&
          district == null &&
          location == null &&
          districts
            .map((district) => {
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
                count: count,
              };
              return dist;
            })
            .sort((a, b) => b.count - a.count)
            .map((district, i) => {
              return (
                <ChooseDistrict
                  key={i}
                  district={district}
                  onClick={() => {
                    const index = districts.findIndex(
                      (a) => a.id == district.id
                    );
                    nextStep(index);
                  }}
                />
              );
            })}
        {!loading &&
          district != null &&
          location == null &&
          filteredData?.map((d, i) => {
            return town ? (
              <ChooseLocation
                key={i}
                location={{
                  label: `${d.count} ${locale.data.GLOBAL.INFORMATION}`,
                  text: `| ${d.name} | ${d.zipcode}`,
                  high: d.englishNameOfTown,
                  title: d.town ?? "",
                }}
                onClick={() => {
                  nextStep(d.id);
                }}
              />
            ) : (
              <ChooseLocation
                key={i}
                location={{
                  label: `${d.count} ${locale.data.GLOBAL.INFORMATION}`,
                  title: d.name,
                  text: "",
                }}
                onClick={() => {
                  // nextStep(d.id);
                  notifications.show({
                    title: "Мэдэгдэл",
                    message: "Тун удахгүй",
                  });
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
