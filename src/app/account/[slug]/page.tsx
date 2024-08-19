"use client";

import { getManyAds, getMyAds } from "@/app/(api)/ad.api";
import { getMyEstimate } from "@/app/(api)/estimate.api";
import { useAppContext } from "@/app/_context";
import Estimated from "@/components/account/estimated";
import Mark from "@/components/account/mark";
import MyAds from "@/components/account/myAds";
import Profile from "@/components/account/profile";
import SharingAds from "@/components/account/sharedAds";
import WalletPage from "@/components/account/wallet";
import { AdStatus, AdTypes } from "@/config/enum";
import { EstimateModel } from "@/models/estimate.model";
import { FetchAdUnitType } from "@/utils/type";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const { user, mark, categories } = useAppContext();

  const [ads, setAds] = useState<FetchAdUnitType>({ ads: [], limit: 0 });
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateModel[]>([]);
  const getAds = async (
    status: AdStatus,
    id?: string,
    n?: number,
    type?: AdTypes,
    res?: boolean
  ) => {
    if (res)
      setAds({
        ads: [],
        limit: 0,
      });
    setLoading(true);
    await getMyAds(
      n ?? 0,
      12,
      status,
      id ?? "%20",
      ads.limit,
      type ?? AdTypes.all
    ).then((d) => {
      if (d != null) {
        setAds(d);
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
      mark,
      0
    ).then((d) => {
      console.log(d);
      setAds(d);
    });

    setLoading(false);
  };
  const getEstimate = async () => {
    setLoading(true);
    await getMyEstimate().then((d) => {
      if (d.statusCode != 404) setEstimate(d);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (params.slug.toLowerCase() == "myads" && user != undefined && !loading) {
      getAds(AdStatus.created, undefined, 0, AdTypes.all, true);
    }
    if (
      params.slug.toLowerCase() == "sharedads" &&
      user != undefined &&
      !loading
    ) {
      getAds(AdStatus.created, undefined, 0, AdTypes.sharing, true);
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
  }, [params, user]);
  switch (params.slug.toLowerCase()) {
    case "myads":
      return (
        <MyAds
          userAds={user?.ads?.length ?? 0}
          ads={ads}
          getAds={(status, id, n) => getAds(status, id, n)}
          loading={loading}
          setAds={setAds}
          category={categories}
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
          category={categories}
        />
      );
    case "estimated":
      return <Estimated estimate={estimate} setEstimate={setEstimate} />;
    case "wallet":
      return <WalletPage />;
    case "mark":
      return <Mark ads={ads} category={categories} loading={loading} />;
    default:
      return notFound();
  }
}
