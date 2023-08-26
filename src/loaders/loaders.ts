// import availabilityLoader from "./availabilityLoader";

import GuitarFilterModel from "features/guitars/filters/GuitarFilter.model";
import { GuitarFilter, GuitarWithDataLoader } from "types/graphql.types";
import commonLoader from "./commonLoader";
import DataLoader from "dataloader";

export type LoadersKeys = Pick<
  GuitarWithDataLoader,
  | "availability"
  | "bodyWood"
  | "bridge"
  | "fingerboardWood"
  | "guitarType"
  | "pickupsSet"
  | "producer"
  | "shape"
>;

/**
 * `loaders` is an object whose keys are models from graphql schema. Each of that model has another keys which are loaders for the concrete field of the model
 */
const loaders: Record<
  keyof LoadersKeys,
  DataLoader<string, GuitarFilter, string>
> = {
  availability: commonLoader<GuitarFilter>(GuitarFilterModel, "availabilities"),
  bodyWood: commonLoader<GuitarFilter>(GuitarFilterModel, "bodyWood"),
  bridge: commonLoader<GuitarFilter>(GuitarFilterModel, "bridge"),
  fingerboardWood: commonLoader<GuitarFilter>(
    GuitarFilterModel,
    "fingerboardWood"
  ),
  guitarType: commonLoader<GuitarFilter>(GuitarFilterModel, "guitarType"),
  pickupsSet: commonLoader<GuitarFilter>(GuitarFilterModel, "pickupsSet"),
  producer: commonLoader<GuitarFilter>(GuitarFilterModel, "producer"),
  shape: commonLoader<GuitarFilter>(GuitarFilterModel, "shape"),
};

export type Loaders = typeof loaders;

export default loaders;
