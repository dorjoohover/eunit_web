"use client";

import { getManyAds, getMyAds } from "@/app/(api)/ad.api";
import { getMyEstimate } from "@/app/(api)/estimate.api";
import { getUser } from "@/app/(api)/user.api";
import { useAppContext } from "@/app/_context";
import Estimated from "@/components/account/estimated";
import Mark from "@/components/account/mark";
import MyAds from "@/components/account/myAds";
import Profile from "@/components/account/profile";
import SharingAds from "@/components/account/sharedAds";
import { AdStatus, AdTypes } from "@/config/enum";
import { CategoryModel } from "@/models/category.model";
import { EstimateModel } from "@/models/estimate.model";
import { FetchAdUnitType } from "@/utils/type";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user, mark } = useAppContext();

  const [ads, setAds] = useState<FetchAdUnitType>({ ads: [], limit: 0 });
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateModel[]>([]);
  const [category, setCategory] = useState<{
    category: CategoryModel[];
    subCategory: CategoryModel[];
  }>();
  const update = (data: FetchAdUnitType) => {
    setAds(data);
    let cate: CategoryModel[] = [],
      sub: CategoryModel[] = [];
    data?.ads.map((ad) => {
      let c = ad.category as CategoryModel,
        s = ad.subCategory as CategoryModel;

      if (cate.find((cat) => cat._id == c._id) == undefined) {
        cate.push(c);
      }
      if (sub.find((sc) => sc._id == s._id) == undefined) {
        sub.push(s);
      }
    });
    setCategory({ category: cate, subCategory: sub });
  };
  const getAds = async (
    status: AdStatus,
    id?: string,
    n?: number,
    type?: AdTypes
  ) => {
    setLoading(true);
    console.log(type);
    await getMyAds(n ?? 0, 12, status, type ?? AdTypes.all, id).then((d) => {
      if (d != null) {
        update(d);
        console.log(d);
      }
    });
    setLoading(false);
  };
  const getMarks = async (num?: number) => {
    setLoading(true);
    await getManyAds(
      num ?? 0,
      false,
      10,
      AdStatus.created,
      AdTypes.all,
      mark
    ).then((d) => setAds(d));

    setLoading(false);
  };
  const getEstimate = async () => {
    setLoading(true);
    await getMyEstimate().then((d) => {
      setEstimate(d);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (params.slug.toLowerCase() == "myads" && user != undefined && !loading) {
      getAds(AdStatus.created, undefined, 0, AdTypes.sharing);
    }
    if (
      params.slug.toLowerCase() == "sharedads" &&
      user != undefined &&
      !loading
    ) {
      getAds(AdStatus.created, undefined, 0);
    }
    if (
      params.slug.toLowerCase() == "estimated" &&
      user != undefined &&
      !loading
    ) {
      getEstimate();
    }
    if (params.slug.toLowerCase() == "mark" && user != undefined && !loading) {
      getMarks();
    }
  }, [params.slug, user]);
  switch (params.slug.toLowerCase()) {
    case "myads":
      return (
        <MyAds
          userAds={user?.ads?.length ?? 0}
          ads={ads}
          getAds={(status, id, n) => getAds(status, id, n)}
          loading={loading}
          setAds={setAds}
          category={category?.category}
          subCategory={category?.subCategory}
        />
      );
    case "profile":
      return <Profile user={user} />;
    case "sharedads":
      return (
        <SharingAds
          userAds={user?.ads?.length ?? 0}
          ads={ads}
          getAds={(status, id, n) => getAds(status, id, n, AdTypes.sharing)}
          loading={loading}
          setAds={setAds}
          category={category?.category}
          subCategory={category?.subCategory}
        />
      );
    case "estimated":
      return <Estimated estimate={estimate} setEstimate={setEstimate} />;
    case "mark":
      return <Mark ads={ads} category={category?.category} loading={loading} />;
    default:
      return notFound();
  }
}
