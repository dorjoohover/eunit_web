"use client";
import { UserType } from "@/config/enum";
import { CategoryModel } from "@/models/category.model";
import { UserModel } from "@/models/user.model";
import { AdCateIdType, FetchAdType } from "@/utils/type";
import { GoogleMapsOptions } from "@/utils/values";
import { useLoadScript } from "@react-google-maps/api";
import { ReactNode, createContext, useState, useContext } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  let [ads, setAds] = useState<FetchAdType>({
    defaultAds: {
      ads: [],
      limit: 0,
    },
    specialAds: {
      ads: [],
      limit: 0,
    },
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
    libraries: GoogleMapsOptions.libraries,
  });
  let [compare, setCompare] = useState<AdCateIdType[]>([]);

  let [categories, setCategories] = useState<CategoryModel[]>();

  let [mark, setMark] = useState<number[]>([]);

  let [user, setUser] = useState<UserModel | undefined>(undefined);
  let [current, setCurrent] = useState<{
    status: boolean;
    type?: UserType;
    user: boolean;
  }>({
    status: false,
    user: false,
    type: undefined,
  });
  return (
    <AppContext.Provider
      value={{
        ads,
        setAds,
        user,
        setUser,
        current,
        setCurrent,
        mark,
        setMark,
        isLoaded,
        compare,
        setCompare,
        categories,
        setCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
