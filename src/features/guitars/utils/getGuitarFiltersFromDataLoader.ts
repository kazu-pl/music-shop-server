import { Loaders } from "loaders";
import mongoose from "mongoose";
import { GuitarWithDataLoader } from "types/graphql.types";
import { Context } from "vm";

const getGuitarFiltersFromDataLoader = async (
  parent: GuitarWithDataLoader,
  context: Context,
  dataLoaderKey: keyof Loaders
) => {
  const id = (
    parent.availability as unknown as mongoose.Types.ObjectId
  ).toHexString(); // get _id string value instead of New ObjectId("...")

  return await context.loaders[dataLoaderKey].load(id);
};

export default getGuitarFiltersFromDataLoader;
