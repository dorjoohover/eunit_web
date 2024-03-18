import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import FormLabel from "@/components/createAd/formLabel";
import Line from "@/components/createAd/formLine";
import CheckItem from "./checkItem";
import { SellTypes, SharingSellTypes } from "@/utils/values";
import { CreateAdType } from "@/utils/type";

const FieldSellType = ({
  types,
  setTypes = () => {},
  sharing = false,
  line = false,
  title = "",
}: {
  types: CreateAdType;

  setTypes: React.Dispatch<React.SetStateAction<CreateAdType>>;
  line?: boolean;
  sharing: boolean;
  title: string;
}) => {
  return (
    <>
      <FormLabel num={"3"} title={title} />
      <div className="flex flex-row flex-wrap justify-center w-full gap-4 mt-2">
        {(sharing ? SharingSellTypes : SellTypes).map((type, key) => {
          const isSelected = sharing
            ? SharingSellTypes[key].id === types?.sellType
            : SellTypes[key].id === types?.sellType;
          const text = (sharing ? SharingSellTypes : SellTypes)[key].name;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              data={text}
              onClick={() =>
                setTypes((prev) => ({
                  ...prev,
                  sellType: sharing
                    ? SharingSellTypes[key].id
                    : SellTypes[key].id,
                }))
              }
              LeftItem={() => <CheckItem {...{ isSelected }} />}
            />
          );
        })}
      </div>
      {line && <Line />}
    </>
  );
};

export default FieldSellType;
