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

const GuitarProducentFilter = mongoose.model<GuitarProducent>(
  "GuitarProducent",
  GuitarProducentSchema
);

export default GuitarProducentFilter;
