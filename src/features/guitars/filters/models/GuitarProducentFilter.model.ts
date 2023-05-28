import mongoose, { Schema, Document } from "mongoose";

export interface GuitarProducent extends Document {
  name: string;
  description: string;
}

const GuitarProducentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const GuitarProducentModel = mongoose.model<GuitarProducent>(
  "GuitarProducent",
  GuitarProducentSchema
);

export default GuitarProducentModel;
