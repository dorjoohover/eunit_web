import { getRequestAllUser, getRequestUser } from "@/(api)/service.api";
import { ServiceType } from "@/config/enum";
import { LocationModel } from "@/models/location.model";
import { RequestModel } from "@/models/request.model";
import { money, parseDate } from "@/utils/functions";
import { ServiceValues } from "@/utils/values";
import {
  Box,
  Button,
  Flex,
  Group,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { upperFirst } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ServiceHistory = () => {
  const [history, setHistory] = useState<RequestModel[]>([]);

  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const getHistory = async (page = 1, l = limit) => {
    await getRequestUser(page, l).then((d) => {
      if (d?.success) {
        setTotal(d.data[1]);
        console.log(d.data[0]);
        setHistory(d.data[0]);
      }
    });
  };
  useEffect(() => {
    getHistory();
  }, []);

  const rows = history.map((element) => {
    const type = element.service as keyof typeof ServiceValues;
    const router = useRouter();
    const location = element.location as LocationModel;
    const address =
      location != undefined
        ? `${location.city} хот, ${location.district} дүүрэг, ${
            location.khoroo
          }${location.khoroo && "-р хороо,"}${location.town}${
            location.town ? " хотхон" : location.name
          }`
        : `${upperFirst(element.brand)}, ${upperFirst(element?.mark)}, ${
            element?.capacity
          }л, ${element.engine}`;
    return (
      <Table.Tr key={element.id}>
        <Table.Td>
          {parseDate(new Date(element.createdAt) ?? new Date(), "-", true)}
        </Table.Td>
        <Table.Td>
          <Text px={20} w={"100%"} py={5} ta={"center"}>
            {ServiceValues[type]}
          </Text>
        </Table.Td>
        <Table.Td ta={"center"}>{address}</Table.Td>
        <Table.Td
          style={{
            textWrap: "nowrap",
          }}
        >
          {element.area == 0
            ? "Бүгд"
            : element.area != null
            ? `${element.area} м.кв`
            : `${element.manufacture} / ${element.entry} он`}
        </Table.Td>
        <Table.Td ta={"center"}>
          <Button
            unstyled
            onClick={() => {
              if (element.service != ServiceType.DATA) {
                element.area
                  ? router.push(`/report/result?id=${element.id}`)
                  : element.brand
                  ? router.push(`/cars/result?id=${element.id}`)
                  : null;
              }
            }}
          >
            <Text>
              {element.service == ServiceType.DATA
                ? "Excel татсан"
                : "Үйлчилгээ дахин харах"}
            </Text>
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });
  return (
    <Box>
      <ScrollArea scrollbars="x">
        <Table stickyHeader mt={60} stickyHeaderOffset={60}>
          <Table.Thead bg={"lightIvory"}>
            <Table.Tr>
              <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                Огноо
              </Table.Th>
              <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                Төрөл
              </Table.Th>
              <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                {/* Хаяг байршил */}
                Хөрөнгө
              </Table.Th>
              <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                Хэмжүүр
              </Table.Th>
              <Table.Th ta={"center"} c={"headBlue"} fw={"normal"}>
                Үйлдэл
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
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
  );
};
