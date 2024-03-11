import { AdModel } from "@/models/ad.model"

export type FetchAdUnitType = {
    ads: AdModel[],
    limit: number
}

export type FetchAdType = {
    defaultAds: FetchAdUnitType,
    specialAds: FetchAdUnitType
}
export type FeedbackType = {
    title: string,
    message: string
}

