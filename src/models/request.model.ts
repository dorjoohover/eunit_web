import { LocationModel } from "./location.model";
import { UserModel } from "./user.model";

export interface RequestModel {
  id: number;
  createdAt: Date;
  service: number;
  area: number;
  operation?: number;
  user: UserModel | number;
  location: LocationModel | number;
}
