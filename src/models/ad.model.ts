import { LocationModel } from "./location.model";

export interface AdModel {
  id?: number;

  title: string;

  location: number | LocationModel;

  createdAt: Date;

  area: number;

  price: number;
  unitPrice: number;
  operation: number;
  uneguiId: string;

  paymentMethod: string;
  date?: Date;

  buildingProcess?: string;

  floor?: string;
  room?: number;

  door?: string;

  balconyUnit?: string;

  howFloor?: number;

  buildingFloor?: number;

  windowUnit?: string;

  garage?: string;

  window?: string;

  description?: string;

  landUsage?: string;
}
