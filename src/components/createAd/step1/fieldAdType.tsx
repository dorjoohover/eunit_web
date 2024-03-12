import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import FormLabel from "@/components/createAd/formLabel";
import CheckItem from "./checkItem";
import { SharingView } from "@/config/enum";
import { CreateAdType } from "@/utils/type";
import { Dispatch } from "@reduxjs/toolkit";
import React, { SetStateAction } from "react";

const FieldAdType = ({
  types,
  setTypes,
}: {
  types: CreateAdType;
  setTypes: React.Dispatch<React.SetStateAction<CreateAdType>>;
}) => {
  return (
    <>
      <FormLabel title="Зарын төрөл" />
      <div className="flex flex-row flex-wrap justify-center gap-4 mt-2">
        {Object.keys(SharingView).map((type, key) => {
          const isSelected = type === types?.adType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={SharingView[type].name}
              onClick={() => {
                setTypes((prev: any) => ({
                  ...prev,
                  adType: type,
                }));
              }}
              LeftItem={() => <CheckItem {...{ isSelected }} />}
            />
          );
        })}
      </div>
    </>
  );
};

export default FieldAdType;
