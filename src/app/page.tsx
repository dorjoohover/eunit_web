"use client";

import { Suspense, useEffect } from "react";
import { useAppContext } from "./_context";
import { getAds } from "./(api)/ad.api";
import { useSession } from "next-auth/react";
import { loginUser } from "./(api)/auth.api";
import { getUser } from "./(api)/user.api";
import Loading from "./loading";

export default function Home() {
  const { ads, setAds, setCurrent, current, user, setUser } = useAppContext();
  const { data: session, status } = useSession();
  const getData = async () => {
    await getAds(0).then((d) => setAds(d));
  };
  useEffect(() => {
    getData();
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
    await getUser().then((d) => {
      setUser(d);
    });
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
      <p>user: {JSON.stringify(user)}</p>
      <p>{JSON.stringify(ads.defaultAds)}</p>
      <button onClick={() => getData()}>adsf</button>
    </>
  );
}
