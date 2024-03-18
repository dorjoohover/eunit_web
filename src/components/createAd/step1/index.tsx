import FormLabel from "@/components/createAd/formLabel";
import Title from "@/components/createAd/title";

import FieldAdType from "./fieldAdType";
import FieldCategory from "./fieldCategory";
import FieldSubCategory from "./fieldSubCategory";
import { CreateAdType } from "@/utils/type";
import { CategoryModel } from "@/models/category.model";
import FieldSellType from "./fieldSellType";

const Step1 = ({
  types,
  setTypes,
  sharing = false,
  categories = [],
  title = "Таны зарах хөрөнгийн төрөл?",
}: {
  types: CreateAdType;
  categories: CategoryModel[];
  setTypes: React.Dispatch<React.SetStateAction<CreateAdType>>;
  sharing?: boolean;
  title?: string;
}) => {
  return (
    <>
      <Title>Төрөл</Title>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
        <>
          {/* CATEGORY */}
          <FormLabel num="1" title={title} />
          <FieldCategory {...{ types, categories, setTypes }} />
        </>

        {types?.categoryId != -1 && (
          // SUBCATEGORY
          <>
         
            <FormLabel title="Дэд төрөл" num="2" />
            <FieldSubCategory
              {...{ types, setTypes }}
              localCategory={
                categories[types.categoryId!].subCategory as CategoryModel[]
              }
            />
          </>
        )}

        {types.subCategoryId && (
          // ZARAH TURUL BOLON ZARIIN TURUL
          // ZARAH TURUL: SELL OR RENT
          // ZARIIN TURUL: DEFAULT, SPECIAL, POSTER
          <>
            <FieldSellType
              title={"Борлуулах төрөл"}
              {...{ types, setTypes }}
              sharing={sharing}
            />
            {sharing && <FieldAdType {...{ types, setTypes }} />}
          </>
        )}
      </div>
    </>
  );
};

export default Step1;
