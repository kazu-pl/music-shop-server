import { GraphQLError } from "graphql";

import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import { MongooseAddons } from "types/mongoose.types";
import { Model, Document } from "mongoose";

/**
 * This type is to tell TypeScript that returned item from DB for sure has `_id` field because by default returned data has it optional when returning from DB
 */
interface MWithId {
  _id: Exclude<Document["_id"], undefined>;
}

const getEntityById = async <M>(
  id: string,
  model: Model<M>,
  /**
   * @example `Nie znaleziono ${notFoundItem}`
   */
  notFoundItem?: string
): Promise<M & MWithId & MongooseAddons> => {
  // even thou entity contains model data like finding, updating methods when being returned it's just the data kept in DB
  const entity = await model
    .findOne({
      _id: id,
    })
    .exec();

  if (!entity) {
    throw new GraphQLError(
      notFoundItem
        ? COMMON_MESSAGES.NOT_FOUND_FN(notFoundItem)
        : COMMON_MESSAGES.NOT_FOUND
    );
  }

  return entity as unknown as M & MWithId & MongooseAddons;
};

export default getEntityById;
