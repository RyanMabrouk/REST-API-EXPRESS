import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
export interface CreatorInput {
  user: UserDocument["_id"];
  platform: string;
  platformJWT: string;
}

export interface CreatorDocument extends CreatorInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CreatorSchema = new mongoose.Schema(
  {
    CreatorId: {
      type: String,
      required: true,
      unique: true,
      default: () => `Creator_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    platform: { type: String, required: true },
    platformJWT: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CreatorModel = mongoose.model<CreatorDocument>("Creator", CreatorSchema);

export default CreatorModel;
