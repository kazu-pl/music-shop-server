import COMMON_MESSAGES from "constants/COMMON_MESSAGES";

import {
  Guitar,
  GuitarWithDataLoader,
  QueryGetGuitarsArgs,
  RequireFields,
} from "types/graphql.types";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import getFilters from "utils/db/getFilters";
import getSortBy from "utils/db/getSortBy";
import getSortOrder from "utils/db/getSortOrder";
import GuitarModel from "../Guitar.model";
import { Context } from "context";

type Type = "getGuitars" | "getGuitarsWithDataLoader";

const getGuitarsQueryResolver = async (
  type: Type,
  parent: object,
  args: RequireFields<QueryGetGuitarsArgs, "sort">,
  context: Context,
  info: GraphQLResolveInfo
) => {
  const { limit = 5, offset = 0, sort, filters } = args;

  const sortBy = getSortBy(sort.sortBy);
  const sortOrder = getSortOrder(sort.sortOrder);

  const filtersToUse = getFilters(filters);

  const [data, totalItems] = await Promise.all([
    GuitarModel.find({
      ...filtersToUse,
    })
      // .populate("availability") // add this if you want to get availablity filter instead of just its id
      .skip(offset as number)
      .limit(limit as number)
      .sort({ [sortBy]: sortOrder }), // 1 for asc, -1 for desc
    GuitarModel.countDocuments({ ...filtersToUse }),
  ]);

  if (!data) {
    throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
  }
  // eslint-disable-next-line no-console
  console.log(
    `SELECT ${totalItems} Guitars in list, with limit: ${limit}, offset: ${offset}`
  );
  return {
    data:
      type === "getGuitars"
        ? (data as unknown as Guitar[])
        : (data as unknown as GuitarWithDataLoader[]),
    totalItems: totalItems || 0,
  };
};

export default getGuitarsQueryResolver;
