"use client";
import { getUser } from "@/(api)/user.api";
import { UserModel } from "@/models/user.model";
import {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface AppContextType {
  user: UserModel | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserModel | undefined>>;
  refetchUser: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({
  token,
  children,
}: {
  token?: string;
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserModel | undefined>(undefined);
  useEffect(() => {
    refetchUser();
    console.log(user);
  }, [token]);
  const refetchUser = async () => {
    await getUser().then((d) => {
      if (d != null) setUser(d);
    });
  };
  return (
    <AppContext.Provider value={{ user, setUser, refetchUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}

interface ReportContextType {
  payload: {
    district: string;
    location: string;
    town: string;
    id?: number;
    area?: number;
  };
  setPayload: Dispatch<
    SetStateAction<{
      district: string;
      location: string;
      town: string;
      id?: number;
      area?: number;
    }>
  >;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportWrapper({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<{
    district: string;
    location: string;
    town: string;
    id?: number;
    area?: number;
  }>({
    district: "",
    location: "",
    town: "",
    id: undefined,
    area: undefined,
  });

  return (
    <ReportContext.Provider value={{ payload, setPayload }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReportContext() {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
