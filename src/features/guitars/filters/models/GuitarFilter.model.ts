import mongoose, { Schema, Document } from "mongoose";

export interface GuitarFilter extends Document {
  name: string;
  description: string;
  type:
    | "PRODUCER"
    | "SHAPE"
    | "PICKUPS_SET"
    | "BODY_WOOD"
    | "FINGERBOARD_WOOD"
    | "BRIDGE"
    | "GUITAR_TYPE"
    | "AVAILABILITY";
}

const GuitarFilterSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const GuitarFilterFilter = mongoose.model<GuitarFilter>(
  "GuitarFilter",
  GuitarFilterSchema
);

export default GuitarFilterFilter;
