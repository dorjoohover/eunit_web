import { LocationModel } from "./location.model";
import { UserModel } from "./user.model";

export interface RequestModel {
  id: number;
  createdAt: Date;
  service: number;
  area?: number;
  operation?: number;
  user: UserModel | number;
  location?: LocationModel | number;
  brand?: string;
  mark?: string;
  capacity?: number;
  color?: string;
  conditions?: string;
  drive?: string;
  engine?: string;
  entry?: number;
  gearbox?: string;
  hurd?: string;
  interior?: string;
  manufacture?: number;
  mileage?: number;
  type?: string;
}
