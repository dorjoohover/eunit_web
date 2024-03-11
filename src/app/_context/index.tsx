"use client";
import { UserModel } from "@/models/user.model";
import { FetchAdType } from "@/utils/type";
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

  let [user, setUser] = useState<UserModel | undefined>(undefined);
  let [current, setCurrent] = useState<{ status: boolean; user: boolean }>({
    status: false,
    user: false,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
