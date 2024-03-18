import ButtonSelectItem from "@/components/createAd/formButtonSelectItem";
import Line from "@/components/createAd/formLine";
import { CategoryModel } from "@/models/category.model";
import { CreateAdType } from "@/utils/type";

const FieldSubCategory = ({
  types,
  localCategory = [],
  setTypes = () => {},
}: {
  types: CreateAdType;
  localCategory: CategoryModel[];
  setTypes: React.Dispatch<React.SetStateAction<CreateAdType>>;
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-1 mb-6 md:gap-4 md:px-10">
        {localCategory?.map((item, key) => {
          const isSelected = types.subCategoryId === item._id;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              data={item?.name ?? ""}
              onClick={() => {
                setTypes((prev) => ({
                  ...prev,
                  subCategoryId: item._id,
                }));
              }}
            />
          );
        })}
      </div>
      <Line />
    </>
  );
};

export default FieldSubCategory;
