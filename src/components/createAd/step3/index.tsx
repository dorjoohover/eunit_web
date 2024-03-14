import FormTitle from "@/components/createAd/title";

import { NumberInput, NumberInputField } from "@chakra-ui/react";
import FormLine from "../formLine";
import { AtomLabel } from "./atom";

import { Dispatch, SetStateAction } from "react";
import { GeneralDataType, StepTypes } from "@/utils/type";
import { ItemModel } from "@/models/items.model";
import FieldPriceArea from "./fieldPriceArea";
import mergeNames from "@/utils/functions";
import FieldTitle from "./fieldTitle";
import FieldPhotoUpload from "./fieldPhotoUpload";
import { useAppContext } from "@/app/_context";

// FILTER DATA: PRICE, AREA, UNITPRICE
// TITLE, DESCRIPTION, IMAGE UPLOAD
const Step3 = ({
  filter,
  images,
  generalData,
  setImages,
  setGeneralData,
  sharing,
}: {
  sharing?: boolean;
  images: File[];
  filter: ItemModel[];
  setImages: Dispatch<SetStateAction<File[]>>;
  generalData: StepTypes;
  setGeneralData: Dispatch<SetStateAction<StepTypes>>;
}) => {
  const { user } = useAppContext();
  return (
    <>
      <FormTitle>Ерөнхий мэдээлэл</FormTitle>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 lg:px-20 sm:px-10 px-4">
        <div className="grid grid-cols-1 gap-6 mt-4 mb-8 md:grid-cols-3 md:px-0 md:gap-10 md:mb-16">
          <FieldPriceArea
            generalData={generalData}
            setGeneralData={setGeneralData}
          />
        </div>
        <FormLine />

        <div className="flex flex-col gap-8 mt-8 mb-10 md:flex-row md:px-0 md:mt-16">
          <div
            className={mergeNames(
              sharing
                ? "grid grid-cols-2 w-full items-center gap-10"
                : "flex-1 space-y-8 "
            )}
          >
            <FieldTitle
              generalData={generalData}
              setGeneralData={setGeneralData}
            />
            <div className="flex flex-col items-start w-full">
              <AtomLabel>Утасны дугаар</AtomLabel>
              <NumberInput
                className="flex flex-col items-start w-full"
                onChange={(e) => {
                  setGeneralData((prev) => ({ ...prev, phone: parseInt(e) }));
                }}
                value={generalData.phone == 0 ? user.phone : generalData.phone}
              >
                <NumberInputField
                  className={mergeNames(
                    generalData?.phone?.toString().length ?? 0 < 8
                      ? "border-red-400 ring-red-400"
                      : "border-blue-400/70 ring-blue-400",
                    "w-full px-4 py-2 border-2 rounded-full  "
                  )}
                />
              </NumberInput>
            </div>
            <div className="hidden md:block">
              <FieldPhotoUpload
                images={images}
                setImages={setImages}
                data={generalData}
                setData={setGeneralData}
              />
            </div>
          </div>

          {sharing ?? (
            <div className="flex-1 pb-2">
              <div className="flex justify-between">
                <AtomLabel>Зарын дэлгэрэнгүй</AtomLabel>
                <p className="font-semibold">
                  {generalData?.desc?.length ?? 0}/500
                </p>
              </div>
              <textarea
                cols={30}
                rows={13}
                placeholder="Дэлгэрэнгүй"
                maxLength={500}
                value={generalData?.desc || ""}
                onChange={
                  (e) =>
                  
                        setGeneralData((prev) => ({
                          ...prev,
                          desc: e.target.value,
                        }))
                      
                    
                  // setGeneralData((prev) => ({ ...prev, desc: e.target.value }))
                }
                className={mergeNames(
                  generalData?.desc?.length ?? 0 > 0
                    ? "border-blue-400/60 ring-blue-400 "
                    : "border-red-400 ring-red-400",
                  "w-full px-4 border-2 rounded-2xl "
                )}
              />
            </div>
          )}
          <div className="block md:hidden">
            <FieldPhotoUpload
              setImages={setImages}
              data={generalData}
              setData={setGeneralData}
              images={images}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
/* <div className="flex flex-col items-center gap-4 md:flex-row justify-evenly">
        <div>
          <LilFormLabel title="Төлбөрийн нөхцөл" />
          <div className="flex justify-center gap-4">
            {['Банкны лизингтэй', 'Хувь лизингтэй', 'Бэлэн'].map(
              (item, key) => {
                const isSelected = item === payment;
                return (
                  <ButtonSelectItem
                    key={key}
                    text={item}
                    isSelected={isSelected}
                    onClick={() => setPayment(item)}
                  />
                );
              }
            )}
          </div>
        </div>
        <div>
          <LilFormLabel title="Бартер" />
          <div className="flex justify-center gap-4">
            {['Байгаа', 'Байхгүй'].map((item, key) => {
              const isSelected = item === payment;
              return (
                <ButtonSelectItem
                  key={key}
                  text={item}
                  isSelected={isSelected}
                  onClick={() => setPayment(item)}
                />
              );
            })}
          </div>
        </div>
      </div> */
