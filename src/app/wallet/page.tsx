"use client";
import { sendPointByUser, userHistory } from "@/(api)/user.api";
import { useAppContext } from "@/_context";
import { Colors } from "@/base/constants";
import { ReportTitle } from "@/components/report/shared";
import { ChargeCard, WalletCard } from "@/components/shared/card";
import { TransactionType } from "@/config/enum";
import { PaymentModel } from "@/models/payment.model";
import { TransactionModel } from "@/models/transaction.model";
import { UserModel } from "@/models/user.model";
import { money, parseDate } from "@/utils/functions";
import { TransactionValue } from "@/utils/values";
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Pagination,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCounter, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

interface FormType {
  receiver?: string;
  total?: number;
  message?: string;
}

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];
const Page = () => {
  const form = useForm<FormType>({
    mode: "uncontrolled",
    initialValues: {
      receiver: undefined,
      total: undefined,
      message: undefined,
    },
  });
  const [history, setHistory] = useState<TransactionModel[]>([]);
  const { user } = useAppContext();

  const [opened, { open, close }] = useDisclosure(false);
  const send = async (values: FormType) => {
    if (values.receiver && values.total) {
      await sendPointByUser(
        values.receiver,
        values.total,
        values.message ?? ""
      ).then((d) => {
        notifications.show({
          message: d.succeed
            ? `${values.receiver} хаягтай хэрэглэгч рүү ${values.total}EUnit шилжүүллээ`
            : d.message,
          title: d.succeed ? "Амжилттай" : "Анхааруулга",
          color: d.succeed ? "green" : "red",
        });
      });
    }
  };
  const charge = () => {};
  const [value, setValue] = useState<Date | null>(null);
  const rows = history.map((element) => {
    const remitter = element.remitter as UserModel;
    const receiver = element.receiver as UserModel;
    const transactionType =
      remitter.id == user?.id
        ? TransactionType.outcome
        : TransactionType.income;
    const typeValues = TransactionValue(transactionType);
    return (
      <Table.Tr key={element.id}>
        <Table.Td>
          {parseDate(new Date(element.createdAt) ?? new Date(), "-", true)}
        </Table.Td>
        <Table.Td>
          <Box mx={"auto"} display={"flex"} w={90}>
            <Text
              c={"white"}
              px={20}
              w={"100%"}
              py={5}
              bg={typeValues.color}
              tt={"uppercase"}
              ta={"center"}
            >
              {typeValues.text}
            </Text>
          </Box>
        </Table.Td>
        <Table.Td ta={"center"}>{money(element.point.toString())}</Table.Td>
        <Table.Td>{(element.payment as PaymentModel)?.point}</Table.Td>
        <Table.Td ta={"center"}>
          {transactionType == TransactionType.income
            ? remitter.name
            : receiver.name}
        </Table.Td>
      </Table.Tr>
    );
  });

  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const getHistory = async (page = 1, l = limit) => {
    await userHistory(l, page).then((d) => {
      if (d.succeed) {
        setTotal(d.payload[1]);
        setHistory(d.payload[0]);
      }
    });
  };
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Box pl={60} pt={60} pos={"relative"}>
      <ReportTitle text={"Хэтэвч"}>
        <Modal.Root opened={opened} centered size={"xl"} onClose={close}>
          <Modal.Overlay />
          <Modal.Content radius={20} bg={"transparent"}>
            <ChargeCard user={user?.email} onClick={() => {}} />
          </Modal.Content>
        </Modal.Root>
        <Box>
          <Text fz={30} pb={40}>
            Хэтэвч цэнэглэх болон e-unit оноог шилжүүлэг хийх хэсэг
          </Text>
          <Flex w={"100%"} gap={50} mb={32} justify={"space-between"}>
            <Box flex={1} maw={500}>
              <WalletCard onClick={open} user={user} />
            </Box>
            <Box flex={1} maw={500}>
              {/* <form onSubmit={form.onSubmit((values) => send(values))}>
                <Box w={"100%"}>
                  <Text fz={30}>Шилжүүлэг</Text>
                  {Object.keys(form.values).map((key) => {
                    return key == "message" ? (
                      <Textarea
                        mb={16}
                        w={"100%"}
                        bg={"#0000001a"}
                        radius={10}
                        key={form.key(key)}
                        placeholder={"Мессеж"}
                        color={Colors.main}
                        {...form.getInputProps(key)}
                      />
                    ) : (
                      <TextInput
                        mb={16}
                        w={"100%"}
                        bg={"#0000001a"}
                        radius={10}
                        key={form.key(key)}
                        placeholder={
                          key == "receiver"
                            ? "Шилжүүлэх хүний имайл хаяг"
                            : "Үнийн дүн"
                        }
                        color={Colors.main}
                        {...form.getInputProps(key)}
                      />
                    );
                  })}
                  <Button type="submit" h={"auto"} w={"100%"} py={13}>
                    Шилжүүлэх
                  </Button>
                </Box>
              </form> */}
            </Box>
          </Flex>
          <Text fz={30}>Гүйлгээний түүх</Text>
          <Box>
            {/* <Flex mt={24}>
              <Select
                placeholder="Валют сонгох"
                data={["React", "Angular", "Vue", "Svelte"]}
                defaultValue="React"
                clearable
              />
              <Select
                placeholder="Төрөл сонгох"
                data={["React", "Angular", "Vue", "Svelte"]}
                defaultValue="React"
                clearable
              />
              <DateInput
                value={value}
                onChange={setValue}
                label="Date input"
                placeholder="Date input"
              />
              <Button>Хайх</Button>
            </Flex> */}
            <Table stickyHeader mt={30} stickyHeaderOffset={60}>
              <Table.Thead bg={"lightIvory"}>
                <Table.Tr>
                  <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                    Огноо
                  </Table.Th>
                  <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                    Төрөл
                  </Table.Th>
                  <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                    Хэмжээ
                  </Table.Th>
                  <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                    Сүлжээ/Банк
                  </Table.Th>
                  <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                    Хаяг/Данс
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <Flex justify={"end"} w={"100%"} mt={20} pb={40}>
              <Pagination.Root
                total={Math.ceil(total / limit)}
                color="main"
                radius={5}
                onChange={(e) => {
                  getHistory(e, limit);
                }}
              >
                <Group gap={5} justify="center">
                  <Pagination.First />
                  <Pagination.Previous />
                  <Pagination.Items />
                  <Pagination.Next />
                  <Pagination.Last />
                </Group>
              </Pagination.Root>{" "}
            </Flex>
          </Box>
        </Box>
      </ReportTitle>
    </Box>
  );
};

export default Page;
