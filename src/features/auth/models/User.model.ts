import mongoose, { Schema, Document } from "mongoose";

export interface CheckoutItem {
  id: string;
  quantity: number;
}

export interface User extends Document {
  password: string;
  data: {
    name: string;
    surname: string;
    email: string;
    phone: number;
    street: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    wishlist: string[];
    checkout: CheckoutItem[];
  };
}

const UserSchema: Schema = new Schema(
  {
    password: { type: String, required: true },
    data: {
      // type: {
      //   name: { type: String, required: true },
      //   surname: { type: String, required: true },
      //   email: { type: String, required: true },
      //   phone: { type: Number, required: true },
      //   street: { type: String, required: true },
      //   streetNumber: { type: String, required: true },
      //   postalCode: { type: String, required: true },
      //   city: { type: String, required: true },
      //   _id: { type: Object, required: true },
      // }, // for some reason if I leave this object then updateOne won't work
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
