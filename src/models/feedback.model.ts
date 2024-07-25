import { UserModel } from "./user.model";

export interface FeedbackModel {
  _id?: string;
  title: string;

  user: string | UserModel;

  message: string;
}
