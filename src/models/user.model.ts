import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
  avatar: string | null;
  bio: string | null;
  birthdate: Date | null;
  location: string | null;
  languages: string[] | null;
  niche: string[] | null;
  verified: boolean;
  topPick: boolean;
  haveVideo: boolean;
  creator: boolean;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    bio: { type: String, default: null },
    birthdate: { type: Date, default: null },
    location: { type: String, default: null },
    languages: { type: [String], default: null },
    niche: { type: [String], default: null },
    verified: { type: Boolean, default: false },
    topPick: { type: Boolean, default: false },
    haveVideo: { type: Boolean, default: false },
    creator: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
