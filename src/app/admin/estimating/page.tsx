"use client";
import {
  getEstimateByStatus,
  updateEstimateById,
} from "@/app/(api)/estimate.api";
import MainContainer from "@/components/containers/mainContainer";
import EstimatedCard from "@/components/estimateCard";
import { EstimateStatus } from "@/config/enum";
import { EstimateModel } from "@/models/estimate.model";
import { Group, Radio } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const EstimatingPage = () => {
  const [estimates, setEstimates] = useState<EstimateModel[]>([]);
  const router = useRouter();
  const updateEstimate = async (
    id: string,
    status = EstimateStatus.finished
  ) => {
    try {
      await updateEstimateById(status, id).then((d) => {
        notifications.show({
          message: "Амжилттай.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getEstimate = async (check: EstimateStatus) => {
    await getEstimateByStatus(check).then((d) => {
      setEstimates(d);
    });
  };

  useEffect(() => {
    getEstimate(EstimateStatus.pending);
  }, []);
  return (
    <div className="mt-10">
      <MainContainer>
        <Group className="flex flex-col justify-end" defaultValue="2">
          <Radio
            label="Үнэлсэн үнэлгээ"
            color="blue"
            className="font-bold text-blue-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate(EstimateStatus.estimated);

                // setNum(0);
              }
            }}
            value="1"
          />

          <Radio
            color="yellow"
            className="font-bold text-yellow-400 whitespace-nowrap"
            label="Хүлээгдэж буй үнэлгээ"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate(EstimateStatus.pending);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="2"
          />

          <Radio
            color="green"
            className="font-bold text-green-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate(EstimateStatus.finished);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="3"
            label="Үнэлж дууссан"
          />
        </Group>
        <div className="flex bg-white p-5 my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col w-full gap-2">
            {estimates &&
              estimates.map((est, i) => {
                return (
                  <div className="flex items-center gap-2" key={i}>
                    <h1>{i + 1}</h1>
                    <EstimatedCard
                      est={est}
                      key={i}
                      AdminBtn={
                        est.status == "estimated" ? (
                          <button
                            onClick={() => updateEstimate(est._id ?? "")}
                            className="px-5 mx-auto my-4"
                          >
                            Дууссан
                          </button>
                        ) : (
                          <></>
                        )
                      }
                    />
                  </div>
                );
              })}

            <div className="flex flex-col"></div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default EstimatingPage;

const colSize = "flex flex-col min-w-[250px]   border-r border-gray-400";
