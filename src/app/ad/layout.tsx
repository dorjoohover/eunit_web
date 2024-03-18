"use client";
import { GoogleMapsOptions } from "@/utils/values";
import { useLoadScript } from "@react-google-maps/api";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode, Suspense } from "react";
import Loading from "../loading";

export default function AdLayout({ children }: { children: ReactNode }) {
  
  return  <>{children}</> 
}
