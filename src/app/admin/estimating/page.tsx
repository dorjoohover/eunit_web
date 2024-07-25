"use client";
import {
  getEstimateByStatus,
  updateEstimateById,
} from "@/app/(api)/estimate.api";
import MainContainer from "@/components/containers/mainContainer";
import EstimatedCard from "@/components/estimateCard";
import { EstimateStatus } from "@/config/enum";
import { EstimateModel } from "@/models/estimate.model";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const EstimatingPage = () => {
  const [estimates, setEstimates] = useState<EstimateModel[]>([]);
  const router = useRouter();
  const toast = useToast();
  const updateEstimate = async (
    id: string,
    status = EstimateStatus.finished
  ) => {
    try {
      await updateEstimateById(status, id).then((d) => {
        toast({
          title: "Амжилттай.",
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
        <RadioGroup className="flex flex-col justify-end" defaultValue="2">
          <Radio
            colorScheme="blue"
            className="font-bold text-blue-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate(EstimateStatus.estimated);

                // setNum(0);
              }
            }}
            value="1"
          >
            Үнэлсэн үнэлгээ
          </Radio>
          <Radio
            colorScheme="yellow"
            className="font-bold text-yellow-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate(EstimateStatus.pending);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="2"
          >
            Хүлээгдэж буй үнэлгээ
          </Radio>
          <Radio
            colorScheme="green"
            className="font-bold text-green-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate(EstimateStatus.finished);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="3"
          >
            Үнэлж дууссан
          </Radio>
        </RadioGroup>
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
