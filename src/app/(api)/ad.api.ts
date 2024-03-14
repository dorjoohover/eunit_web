"use server";
import { AdStatus, AdTypes, Api, CreateAdSteps } from "@/config/enum";
import { CategoryStepsModel } from "@/models/category.model";
import { ItemModel } from "@/models/items.model";
import { UserModel } from "@/models/user.model";
import { ErrorMessages } from "@/utils/string";
import {
  AdFilterType,
  CreateAdType,
  FetchAdType,
  FetchAdUnitType,
  StepTypes,
} from "@/utils/type";
import { AdApi, api } from "@/utils/values";

import { cookies } from "next/headers";
import { getUser } from "./user.api";

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
  steps: CategoryStepsModel[],
  cateId: string
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
      location: data.map,
      subCategory: types.subCategoryId,
      category: cateId,
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



export async function getManyAds(
  num: number,
  self: boolean,
  limit: number,
  status: AdStatus,
  type: AdTypes,
  ads: string[],
  id?: string
): Promise<FetchAdUnitType> {
  try {
    let res = await fetch(
      `${api}${AdApi.many}${num}/${self}/${limit}/${status}/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dto: ads,
          cateId: id,
        }),
      }
    ).then((d) => d.json());
console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getMyAds(
  num: number,
  limit: number,
  status: AdStatus,
  type: AdTypes,
  id?: string
) {
  try {
    const currentUser = await getUser();
    const res = await getManyAds(
      num,
      true,
      limit,
      status,
      type,
      currentUser.ads,
      id
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getAdByCategory(id: string, num: number) {
  try {
    let res = await fetch(`${api}${AdApi.create}${id}/${num}`).then((d) =>
      d.json()
    );
    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}

export async function getFilteredAd(
  id: string,
  num: number,
  type: AdTypes,
  types: string[],
  items: AdFilterType[] = []
) {
  try {
    let res = await fetch(`${api}${AdApi.filter}${num}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cateId: id,
        types: types,
        items: items,
      }),
    }).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
export async function getAdById(id: string) {
  try {
    let res = await fetch(`${api}${AdApi.id}${id}`).then((d) => d.json());

    return res;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessages.occured);
  }
}
