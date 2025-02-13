"use client";
import { checkPayment, sendRequest } from "@/(api)/service.api";
import { useAppContext, useReportContext } from "@/_context";
import { Colors } from "@/base/constants";
import { locale } from "@/base/vocabs/mn";
import { ChooseDistrict, ServiceForm } from "@/components/report/district";
import { ChooseLocation } from "@/components/report/location";
import { ReportTitle } from "@/components/report/shared";
import { ChargeCard, WalletCard } from "@/components/shared/card";
import { Constant, PaymentType, ServiceType } from "@/config/enum";
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
  Grid,
  Highlight,
  Loader,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconSearch } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { debounce } from "lodash";
import { QpayType } from "@/utils/type";
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
          if (url.includes("20")) {
            setFilteredData(
              (d.payload as LocationModel[]).sort((a, b) => {
                return a.englishNameOfTown && b.englishNameOfTown
                  ? a.englishNameOfTown?.localeCompare(b.englishNameOfTown)
                  : a.name?.localeCompare(b.name);
              })
            );
          }
          setData(d.payload);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<LocationModel[] | null>(
    null
  );
  const [town, setTown] = useState(true);
  const [isList, setIsList] = useState(true);
  useEffect(() => {
    if (!data) return;

    const debouncedFilter = debounce(() => {
      const query = searchTerm.toLowerCase();
      setFilteredData(
        (data as LocationModel[]).filter(
          ({ town, name, englishNameOfTown }) =>
            town?.toLowerCase().includes(query) ||
            name?.toLowerCase().includes(query) ||
            englishNameOfTown?.toLowerCase().includes(query)
        )
      );
    }, 100);

    debouncedFilter();

    return () => debouncedFilter.cancel();
  }, [searchTerm, data]);
  // const filter = (e: string) => {
  //   if (data != null) {
  //     setFilteredData(
  //       (data as LocationModel[]).filter(
  //         (d) =>
  //           d.town?.toLowerCase().includes(e) ||
  //           d.name?.toLowerCase().includes(e) ||
  //           d.englishNameOfTown?.toLowerCase().includes(e)
  //       )
  //     );
  //   }
  // };
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
  const [qpay, setQpay] = useState<{
    qpay: QpayType;
    id: number;
  } | null>(null);
  const submit = async (payment: number) => {
    setLoading(true);
    if (!checker()) return;
    if (user?.wallet && user?.wallet - 1000 < 0) {
      notifications.show({
        color: "warning",
        title: "Анхааруулга",
        message: "Үлдэгдэл хүрэлцэхгүй байна.",
      });
    }
    const res = await sendRequest(
      payload.location!,
      { ...payload.values!, payment: payment },
      ServiceType.REVIEW
    );
    if (payment == PaymentType.QPAY) {
      console.log(res);
      setQpay({
        qpay: res?.data.data,
        id: res?.data.res,
      });
      setLoading(false);
      return;
    }
    if (res?.data?.success != false) {
      refetchUser();
      router.push(`/report/result?id=${res?.data.res}`);
    }
    setLoading(false);
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
    return {
      text: "ТАНЫ",
      text1: "үнэ цэн",
      text2: "хөрөнгө",
      fz: {
        md: 120,
        sm: 100,
        base: 60,
      },
    };
  };
  const matches = useMediaQuery("(min-width: 36em)");
  const matchesPad = useMediaQuery("(min-width: 50em)");
  const check = async () => {
    setLoading(true);
    const res = await checkPayment(qpay?.id!, qpay?.qpay.invoice_id!);

    if (res?.data) {
      refetchUser();
      router.push(`/report/result?id=${qpay?.id}`);
    }
    setLoading(false);
  };
  return (
    <Box>
      <ReportTitle {...reportTitleText()}>
        {district == null && (
          <Flex
            pb={{
              sm: 40,
              base: 30,
            }}
            w={"100%"}
            pr={{
              base: 16,
              md: 0,
            }}
            direction={{
              base: "row",
            }}
            justify={"space-between"}
          >
            <Flex align={"center"}>
              <Text
                fz={{
                  base: 24,
                  sm: 30,
                }}
                fw={500}
              >
                Дүүргийн мэдээлэл
              </Text>
            </Flex>
            <Flex w={"auto"} align={"center"}>
              <Box>
                <Button
                  radius={32}
                  c={isList ? "white" : "black"}
                  bg={isList ? "main" : "transparent"}
                  fw={{
                    base: 500,
                    sm: "bold",
                  }}
                  py={10}
                  px={30}
                  h={"auto"}
                  fz={{
                    base: 16,
                    sm: 21,
                  }}
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
              </Box>
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
          <Flex
            pb={40}
            w={"100%"}
            justify={"space-between"}
            direction={{
              md: "row",
              base: "column",
            }}
          >
            <Flex align={"center"}>
              <TextInput
                c={"deepMose"}
                fw={"bold"}
                fz={21}
                style={{
                  color: "deepMose",
                }}
                w={{
                  base: "100%",
                  sm: "auto",
                }}
                placeholder={"Хайлт"}
                onChange={(e) => setSearchTerm(e.target.value)}
                rightSection={<IconSearch color={Colors.deepMose} />}
              />
              <Text
                style={{
                  textWrap: "nowrap",
                  borderBottom: `1px solid black`,
                }}
                fz={21}
                mr={{
                  md: 0,
                  base: 16,
                }}
              >
                {filteredData?.length} үр дүн
              </Text>
            </Flex>
            <Flex
              w={"auto"}
              justify={{
                sm: "start",
                base: "space-between",
              }}
              direction={{
                xs: "row",
                base: "column",
              }}
            >
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
                fz={{ md: 21, base: 16 }}
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
                fz={{ md: 21, base: 16 }}
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
            <Text
              fz={{
                md: 30,
                base: 21,
              }}
              mb={{
                md: 100,
                sm: 60,
                base: 30,
              }}
            >
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
      <Modal.Root
        opened={opened}
        centered
        // fullScreen={!matches}
        size={matches ? (qpay != null ? "md" : "lg") : "xl"}
        onClose={close}
      >
        <Modal.Overlay />

        <Modal.Content radius={20} bg={"transparent"} className="items-center">
          <Modal.Header>
            <Modal.Title c={"#546274"} tt={"uppercase"}>
              Төлбөр төлөлт
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          {qpay == null && (
            <Box
              bg={"white"}
              px={{
                sm: "10%",
                base: 16,
              }}
              pt={20}
            >
              <WalletCard
                onClick={() => {
                  router.push("/wallet");
                }}
              />
              <Highlight
                mt={24}
                mb={32}
                fz={18}
                highlight={["урамшуулал", "3,000 E-unit"]}
                highlightStyles={{
                  background: Colors.main,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Шинэ хэрэглэгчийн урамшуулал бүхий 3,000 E-unit ашиглан энэхүү
                үйлчилгээг авах боломжтой.
              </Highlight>

              <Flex>
                {user?.wallet && user?.wallet > 1000 && (
                  <Button
                    w={"100%"}
                    fz={24}
                    bg={"main"}
                    py={16}
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
                        <Text c={"white"} fz={24}>
                          1,000.00
                        </Text>
                        <EunitIcon />
                      </Flex>
                    )}
                  </Button>
                )}
                <Button
                  w={"100%"}
                  fz={24}
                  bg={"main"}
                  py={16}
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
                      <Text c={"white"} fz={24}>
                        QPAY
                      </Text>
                      <Image
                        src={Assets.qpay}
                        width={25}
                        height={25}
                        alt="qpay logo"
                      />
                    </Flex>
                  )}
                </Button>
              </Flex>
            </Box>
          )}
          {qpay != null && (
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
                  {qpay.qpay.urls.map((url, k) => {
                    return (
                      <Grid.Col key={k} span={3}>
                        {/* {JSON.stringify(url)} */}

                        <Image
                          src={url.logo}
                          width={60}
                          height={60}
                          alt={url.name}
                        />
                        {/* <a href={url.link}>
                        </a> */}
                      </Grid.Col>
                    );
                  })}
                </Grid>
              )}
              {!matches ? (
                <Grid mb={20}>
                  {qpay.qpay.urls.map((url, k) => {
                    return (
                      <Grid.Col key={k} span={3}>
                        {/* {JSON.stringify(url)} */}

                        <Image
                          src={url.logo}
                          width={60}
                          height={60}
                          alt={url.name}
                        />
                        {/* <a href={url.link}>
                        </a> */}
                      </Grid.Col>
                    );
                  })}
                </Grid>
              ) : (
                <Image
                  className="mx-auto"
                  src={`data:image/png;base64,${qpay?.qpay.qr_image}`}
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
          )}
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
            <Loader color="main" type="bars" />
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
                      ${locale.data.GLOBAL.COMMITTEE} `,
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
                  text: `${d.name}`,
                  high: d.englishNameOfTown,
                  zipcode: `${d.zipcode}`,
                  name: d.name,
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
