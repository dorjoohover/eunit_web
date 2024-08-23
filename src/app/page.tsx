"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "./_context";
import { getAds } from "./(api)/ad.api";
import { useSession } from "next-auth/react";
import { getUser } from "./(api)/user.api";
import Loading from "./loading";
import { ContainerX } from "@/components/container";
import ProAdContent from "@/components/ad/proAdContent";
import AdContent from "@/components/ad/adContent";
import SwiperHeader from "@/components/swiperHeader";
import CategorySelect from "@/components/categorySelect";
import { AdTypes, UserStatus } from "@/config/enum";
import { UserModel } from "@/models/user.model";

export default function Home() {
  const { ads, setAds } = useAppContext();
  const { data: session } = useSession();
  const [page, setPage] = useState({
    default: 0,
    special: 0,
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);
  const getData = async () => {
    const defaultAds = await getAds(
      page.default,
      12,
      AdTypes.default,
      ads.defaultAds?.limit ?? 0
    );
    const specialAds = await getAds(
      page.special,
      4,
      AdTypes.special,
      ads.specialAds?.limit ?? 0
    );
    setAds({
      defaultAds,
      specialAds,
    });
  };
  useEffect(() => {
    if (!loading) {
      getData();
    }
  }, [page]);

  const getUserData = async () => {
    setLoading(true);

    const data = await getUser();
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user && !user && typeof window !== "undefined") {
      getUserData();
    }
  }, [session]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <SwiperHeader />
      <CategorySelect />

      <ContainerX className="py-6">
        {/* <Heading className="">Шинэ зарууд</Heading> */}
        {ads?.specialAds?.ads.length > 0 && (
          <ProAdContent
            title="Онцгой зар"
            data={ads?.specialAds}
            showLink=""
            pg={false}
            inCat={false}
          />
        )}

        {ads?.defaultAds?.ads.length > 0 && (
          <AdContent
            data={ads?.defaultAds}
            showLink=""
            pg={false}
            inCat={false}
          />
        )}
      </ContainerX>
    </>
  );
}
