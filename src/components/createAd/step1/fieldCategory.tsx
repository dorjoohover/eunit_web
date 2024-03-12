import CategoryButtonSelect from "@/components/createAd/categoryButtonSelect";
import Line from "@/components/createAd/formLine";
import { CategoryModel } from "@/models/category.model";
import { CreateAdType } from "@/utils/type";
import { Dispatch } from "react";

const FieldCategory = ({
  types,
  categories = [],
  setTypes = () => {},
  line = false,
}: {
  types: CreateAdType;
  categories: CategoryModel[];
  setTypes: React.Dispatch<React.SetStateAction<CreateAdType>>;
  line?: boolean;
}) => {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="grid w-full grid-cols-3 gap-4 py-4 lg:grid-cols-6 lg:gap-4 auto-rows-fr md:w-4/5">
          {categories?.map((item, key) => {
            const isSelected = key.toString() === types.categoryId.toString();
            if (item.parent == null) {
              return (
                <CategoryButtonSelect
                  key={key}
                  item={item}
                  isSelected={isSelected}
                  onClick={() => {
                    setTypes((prev) => ({
                      ...prev,
                      categoryId: key,
                      categoryName: item?.href,
                      subCategoryId: "",
                    }));
                  }}
                />
              );
            }
          })}
        </div>
      </div>
      {line && <Line />}
    </>
  );
};

export default FieldCategory;
