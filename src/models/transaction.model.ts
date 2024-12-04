import { PaymentModel } from "./payment.model";
import { RequestModel } from "./request.model";
import { UserModel } from "./user.model";

export interface TransactionModel {
  id: number;
  createdAt: Date;
  point: number;
  message: string;
  receiver: UserModel | number;
  remitter: UserModel | number;
  request: RequestModel | number | null;
  payment: PaymentModel | number | null;
}
