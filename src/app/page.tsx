"use client";

import { Suspense, useEffect, useState } from "react";
import { useAppContext } from "./_context";
import { getAds } from "./(api)/ad.api";
import { useSession } from "next-auth/react";
import { loginUser } from "./(api)/auth.api";
import { getUser } from "./(api)/user.api";
import Loading from "./loading";
import { ContainerX } from "@/components/container";
import ProAdContent from "@/components/ad/proAdContent";
import AdContent from "@/components/ad/adContent";
import SwiperHeader from "@/components/swiperHeader";
import CategorySelect from "@/components/categorySelect";
import { UserModel } from "@/models/user.model";
import { UserStatus } from "@/config/enum";

export default function Home() {
  const {
    ads,
    setAds,
    categories,
    current,
    setCurrent,
    user,
    setUser,
    setMark,
  } = useAppContext();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);
  const getData = async () => {
    await getAds(0).then((d) => setAds(d));
  };
  useEffect(() => {
    if (!loading) {
      getData();
    }
  }, []);

  const login = async () => {
    const res = await loginUser(
      session!.user!.email!,
      session!.user!.image!,
      session!.user!.name!
    );
    res ? setUser(undefined) : getUserData();
  };
  const getUserData = async () => {
    setLoading(true);
    await getUser()
      .then((d) => {
        if (d != null) {
          setUser(d);
          setMark(d?.bookmarks);
          setCurrent({
            user: true,
            status: d.status != UserStatus.banned,
            type: d.userType
          });
        }
      })
      .catch(() => {
        setUser(undefined);
      });
    setLoading(false);
  };
  useEffect(() => {
    if (
      !user &&
      session &&
      session?.user?.email &&
      session?.user?.image &&
      session?.user?.name
    ) {
      login();
    }
    if (!user && current.user) {
      getUserData();
    }
  }, [session]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <SwiperHeader />
      <CategorySelect categories={categories} />

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
