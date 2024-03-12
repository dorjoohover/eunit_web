import { CreateAdSteps } from "@/config/enum";
import { ItemModel } from "./items.model";

export interface CategoryStepsModel {
  step: CreateAdSteps;

  values: string[] | ItemModel[];
}

export interface CategoryModel {
  _id: string;
  name: string;

  english: string;

  parent?: string;

  steps: CategoryStepsModel[];

  suggestionItem: string[];

  subCategory: (string | CategoryModel)[];

  href: string;

  estimate: boolean;
}
