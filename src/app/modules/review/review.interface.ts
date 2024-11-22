import { Types } from "mongoose";

export type TReview = {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  userReview: string;
  createdAt?: Date;
  updatedAt?: Date;
};
