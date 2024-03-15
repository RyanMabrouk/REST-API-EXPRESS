import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
export interface OfferInput {
  user: UserDocument["_id"];
  description: string;
  price: number;
  email: string;
  tel: string;
  status: "Pending" | "Approved" | "Declined";
  title: string;
}

export interface OfferDocument extends OfferInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const offerSchema = new mongoose.Schema(
  {
    offerId: {
      type: String,
      required: true,
      unique: true,
      default: () => `offer_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    email: { type: String, required: true },
    tel: { type: String, required: true },
    title: { type: String, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Declined"],
    },
  },
  {
    timestamps: true,
  }
);

const OfferModel = mongoose.model<OfferDocument>("Offer", offerSchema);

export default OfferModel;
