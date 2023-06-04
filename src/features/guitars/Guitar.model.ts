import mongoose, { Schema, Document } from "mongoose";
import { GuitarFilterName } from "./filters/GuitarFilter.model";

export interface Guitar extends Document {
  name: string;
  description: string;
  price: number;
  stringsNumber: number;
  scaleLength: number;
  fretsNumber: number;
  /**
   * Id of producer kept in DB in Guitar model, the Id is then used in resolvers to bring the real Producer Filter in the place of its id
   */
  producer: string;
  /**
   * Id of availability kept in DB in Guitar model, the Id is then used in resolvers to bring the real Availability Filter in the place of its id
   */
  availability: string;
  /**
   * Id of bodyWood kept in DB in Guitar model, the Id is then used in resolvers to bring the real BodyWood Filter in the place of its id
   */
  bodyWood: string;
  /**
   * Id of bridge kept in DB in Guitar model, the Id is then used in resolvers to bring the real Brridge Filter in the place of its id
   */
  bridge: string;
  /**
   * Id of fingerboardWood kept in DB in Guitar model, the Id is then used in resolvers to bring the real FingerboardWood Filter in the place of its id
   */
  fingerboardWood: string;
  /**
   * Id of pickupsSet kept in DB in Guitar model, the Id is then used in resolvers to bring the real PickupsSet Filter in the place of its id
   */
  pickupsSet: string;
  /**
   * Id of shape kept in DB in Guitar model, the Id is then used in resolvers to bring the real Shape Filter in the place of its id
   *
   * This is the id of guitar shape whose resolved value can be `Les Paul` or `Stratocaster` and so on
   */
  shape: string;
  /**
   * Id of guitarType kept in DB in Guitar model, the Id is then used in resolvers to bring the real GuitarType Filter in the place of its id
   *
   * This is the id of guitar type whose resolved value can be `Electric` or `Acoustic` and so on
   */
  guitarType: string;
  imageId?: string;
}

const GuitarSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    stringsNumber: { type: Number, required: true },
    scaleLength: { type: Number, required: true },
    fretsNumber: { type: Number, required: true },
    availability: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    bodyWood: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    bridge: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    fingerboardWood: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },

    guitarType: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    pickupsSet: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    producer: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    shape: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: GuitarFilterName,
    },
    imageId: { type: mongoose.Types.ObjectId, required: false },
  },
  {
    timestamps: true,
  }
);

const GuitarModel = mongoose.model<Guitar>("Guitar", GuitarSchema);

export default GuitarModel;
