import { CreateAdSteps } from "@/config/enum";




export interface CategoryStepsModel {
  step: CreateAdSteps;

  values: string[];
}

export interface CategoryModel {
  _id: string
  name: string;

  english: string;

  parent?: string;

  steps: CategoryStepsModel[];

  suggestionItem: string[];

  subCategory: (string | CategoryModel)[] ;

  href: string;

  estimate: boolean;
}
