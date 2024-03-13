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
import { getConstants } from "./(api)/constants.api";
import { ConstantApi } from "@/utils/values";
import { Api } from "@/config/enum";
import { CategoryModel } from "@/models/category.model";

export default function Home() {
  const { ads, setAds, setCurrent, current, user, setUser } = useAppContext();
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState<CategoryModel[]>();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    await getAds(0).then((d) => setAds(d));
    await getConstants(ConstantApi.category, Api.GET, {}).then((d) =>
      setCategories(d)
    );
    setLoading(false);
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

    if (res) {
      setCurrent({
        status: res.status,
        user: true,
      });
    }
  };
  const getUserData = async () => {
    try {
      await getUser().then((d) => {
        setUser(d);
      });
    } catch (error) {
      setCurrent({
        status: false,
        user: false,
      });
    }
  };
  useEffect(() => {
    if (
      !current.user &&
      session &&
      session?.user?.email &&
      session?.user?.image &&
      session?.user?.name
    ) {
      login();
    }

    if (!user) {
      getUserData();
    }
  }, [session, current.user]);
  return (
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
