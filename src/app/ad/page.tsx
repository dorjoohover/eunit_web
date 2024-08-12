"use client";

import { useAppContext } from "../_context";

import { ContainerX } from "@/components/container";
import ProAdContent from "@/components/ad/proAdContent";
import AdContent from "@/components/ad/adContent";

export default function AdPage() {
  const { ads } = useAppContext();
  
 
  return (
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
  );
}
