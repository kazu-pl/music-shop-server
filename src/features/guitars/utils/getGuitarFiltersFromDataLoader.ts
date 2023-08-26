import { LoadersKeys } from "loaders/loaders";
import mongoose from "mongoose";
import { GuitarWithDataLoader } from "types/graphql.types";
import { Context } from "vm";

const getGuitarFiltersFromDataLoader = async (
  parent: GuitarWithDataLoader, // parent is gonna be an object with guitar which has fields like `availability: 43654gb5h`
  context: Context,
  dataLoaderKey: keyof LoadersKeys
) => {
  const id = (
    parent[dataLoaderKey] as unknown as mongoose.Types.ObjectId
  ).toHexString(); // get _id string value instead of New ObjectId("...")

  return await context.loaders[dataLoaderKey].load(id);
};

export default getGuitarFiltersFromDataLoader;
