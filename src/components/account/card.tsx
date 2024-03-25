import { FetchAdUnitType } from "@/utils/type";
import AdContent from "../ad/adContent";

export const UserAds = ({ ads }: { ads?: FetchAdUnitType }) => {
    return (
      <>
        {ads && <AdContent title="" inCat={false} data={ads} showLink="hidden" />}
      </>
    );
  };
  export const SharingAds = ({ ads }: { ads?: FetchAdUnitType }) => {
    return (
      <>
        {ads ? (
          <AdContent title="" inCat={false} showLink="hidden" data={ads} />
        ) : (
          <div>Зар байхгүй</div>
        )}
      </>
    );
  };