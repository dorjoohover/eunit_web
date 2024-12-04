import { RequestModel } from "./request.model";
import { UserModel } from "./user.model";

export interface PaymentModel {
  id: number;
  email: string;
  name?: string;
  createdAt: Date;
  point: number;
  money: number;
  user: UserModel | number;
  request: RequestModel | number;
}
