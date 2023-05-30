import mongoose, { Schema, Document } from "mongoose";

export interface GuitarShapeFilter extends Document {
  name: string;
}

const GuitarTypeFilterSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const GuitarTypeFilterModel = mongoose.model<GuitarShapeFilter>(
  "GuitarType",
  GuitarTypeFilterSchema
);

export default GuitarTypeFilterModel;
