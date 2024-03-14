"use client";

import { getMyAds } from "@/app/(api)/ad.api";
import { getUser } from "@/app/(api)/user.api";
import { useAppContext } from "@/app/_context";
import MyAds from "@/components/account/myAds";
import Profile from "@/components/account/profile";
import { AdStatus, AdTypes } from "@/config/enum";
import { CategoryModel } from "@/models/category.model";
import { FetchAdUnitType } from "@/utils/type";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user, setUser , setMark} = useAppContext();
  const updateUser = async () => {
    await getUser().then((d) => {
      setUser(d),
      setMark(d.bookmarks)
    });
  };
  const [ads, setAds] = useState<FetchAdUnitType>({ ads: [], limit: 0 });
  const [loading, setLoading] = useState(false);
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
  const getAds = async (status: AdStatus, id?: string, n?: number) => {
    setLoading(true);
    await getMyAds(n ?? 0, 12, status, AdTypes.all, id).then((d) => {
      update(d);
    });
    setLoading(false);
  };

  useEffect(() => {
    updateUser();
  }, []);

  useEffect(() => {
    if (params.slug.toLowerCase() == "myads" && user != undefined && !loading) {
      getAds(AdStatus.created, undefined, 0);
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
    default:
      return notFound();
  }
}
