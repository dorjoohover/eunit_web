import React from "react";
import { NoAds } from "./myAds";
import EstimatedCard, { EstimateButton } from "../estimateCard";
import { EstimateModel } from "@/models/estimate.model";

const Estimated = ({
  estimate,
  setEstimate,
}: {
  estimate: EstimateModel[];
  setEstimate: React.Dispatch<React.SetStateAction<EstimateModel[]>>;
}) => {
  return (
    <div className="py-5">
      <div className="flex justify-end w-full">
        {/* Таны үнэлгээ */}

        <EstimateButton label={true} onClick={() => setEstimate([])}/>
      </div>
      <div className="grid grid-cols-1 gap-3 my-3 xl:grid-cols-2 4xl:grid-cols-3 w-100">
        {estimate?.map((est, i) => {
          return <EstimatedCard est={est} key={i} />;
        })}
        <NoAds data={estimate?.length ?? 0} info="Үнэлгээ байхгүй байна" />
      </div>
    </div>
  );
};

export default Estimated;
