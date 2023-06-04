import mongoose, { Schema, Document } from "mongoose";
import { GuitarFilterTypeEnum } from "types/graphql.types";

export const GuitarFilterName = "GuitarFilter";

export interface GuitarFilterModelType extends Document {
  name: string;
  description: string;

  /**
   * below are values that `type` member can get but for utils like getGuitarModelFieldForResolver I typed it with `GuitarFilterTypeEnum` anum which gets in fact the same values
   */
  type: GuitarFilterTypeEnum;
  // type:
  //   | "PRODUCER"
  //   | "SHAPE"
  //   | "PICKUPS_SET"
  //   | "BODY_WOOD"
  //   | "FINGERBOARD_WOOD"
  //   | "BRIDGE"
  //   | "GUITAR_TYPE"
  //   | "AVAILABILITY";
}

const GuitarFilterSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  type: { type: String, required: true },
});

const GuitarFilterModel = mongoose.model<GuitarFilterModelType>(
  GuitarFilterName,
  GuitarFilterSchema
);

export default GuitarFilterModel;
