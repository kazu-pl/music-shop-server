// import availabilityLoader from "./availabilityLoader";

import GuitarFilterModel from "features/guitars/filters/GuitarFilter.model";
import { GuitarFilter } from "types/graphql.types";
import commonLoader from "./commonLoader";

/**
 * `loaders` is an object whose keys are models from graphql schema. Each of that model has another keys which are loaders for the concrete field of the model
 */
const loaders = {
  availabilityLoader: commonLoader<GuitarFilter>(
    GuitarFilterModel,
    "availabilities"
  ),
  bodyWoodLoader: commonLoader<GuitarFilter>(GuitarFilterModel, "bodyWood"),
  bridgeLoader: commonLoader<GuitarFilter>(GuitarFilterModel, "bridge"),
  fingerboardWoodLoader: commonLoader<GuitarFilter>(
    GuitarFilterModel,
    "fingerboardWood"
  ),
  guitarTypeLoader: commonLoader<GuitarFilter>(GuitarFilterModel, "guitarType"),
  pickupsSetLoader: commonLoader<GuitarFilter>(GuitarFilterModel, "pickupsSet"),
  producerLoader: commonLoader<GuitarFilter>(GuitarFilterModel, "producer"),
  shapeLoaderLoader: commonLoader<GuitarFilter>(GuitarFilterModel, "shape"),
};

export type Loaders = typeof loaders;

export default loaders;
