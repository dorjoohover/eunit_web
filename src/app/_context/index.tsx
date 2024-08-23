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

  return (
    <AppContext.Provider
      value={{
        ads,
        setAds,
        isLoaded,
        compare,
        setCompare,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
