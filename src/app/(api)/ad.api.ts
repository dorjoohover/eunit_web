"use server";
import { Api, CreateAdSteps } from "@/config/enum";
import { CategoryStepsModel } from "@/models/category.model";
import { ItemModel } from "@/models/items.model";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import { CreateAdType, FetchAdType, StepTypes } from "@/utils/type";
import { AdApi, api } from "@/utils/values";

import { cookies } from "next/headers";

export async function getAds(num: number): Promise<FetchAdType> {
  try {
    let res = await fetch(`${api}${AdApi.view}${num}`, {}).then((d) =>
      d.json()
    );

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getSearchAds(value: string): Promise<FetchAdType> {
  try {
    let res = await fetch(`${api}${AdApi.search}${value}`, {}).then((d) =>
      d.json()
    );

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function createAd(
  images: FormData,
  data: StepTypes,
  types: CreateAdType,
  steps: CategoryStepsModel[]
) {
  try {
    const token = cookies().get("token");

    const filters: any[] = [];

    let imagesRes = await fetch(`${api}upload`, {
      method: "POST",
      headers: {
        cache: "no-store",
        Authorization: `Bearer ${token?.value ?? ""}`,
      },
      body: images,
    }).then((d) => d.json());
    steps.map((step) => {
      (step.values as ItemModel[]).map((value) => {
        let key: keyof StepTypes;
        key = value.type as keyof StepTypes;

        filters.push({
          name: value.name,
          id: value.type,
          value: data[key],
          position: value.position,
          type: value.types,
          index: value.index,
          isSearch: value.isSearch ?? false,
          isUse: value.isUse ?? false,
        });
      });
    });
    const body = {
      images: imagesRes.file,
      title: data.title,
      description: data.desc,
      location: data.map?.latLng,
      subCategory: types.subCategoryId,
      category: types.category_ID,
      sellType: types.sellType,
      items: filters,
      adType: types.adType == "sharing" ? "sharing" : "default",
      adStatus: "pending",
      view: "hide",
    };

    let res = await fetch(`${api}${AdApi.create}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value ?? ""}`,
        charset: "UTF-8",
      },
      body: JSON.stringify(body),
    }).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
