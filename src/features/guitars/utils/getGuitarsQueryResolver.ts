import COMMON_MESSAGES from "constants/COMMON_MESSAGES";

import { QueryGetGuitarsArgs, RequireFields } from "types/graphql.types";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import getFilters from "utils/db/getFilters";
import getSortBy from "utils/db/getSortBy";
import getSortOrder from "utils/db/getSortOrder";
import GuitarModel from "../Guitar.model";
import { Context } from "context";

const getGuitarsQueryResolver = async <DataType>(
  parent: object,
  args: RequireFields<QueryGetGuitarsArgs, "sort">,
  context: Context,
  info: GraphQLResolveInfo,
  mode?: "populated" | "dataLoader"
) => {
  const { limit = 5, offset = 0, sort, filters } = args;

  const sortBy = getSortBy(sort.sortBy);
  const sortOrder = getSortOrder(sort.sortOrder);

  const filtersToUse = getFilters(filters);

  let guitarList = [];
  let totalGuitarsNumber = 0;

  if (mode === "populated") {
    const [data, totalItems] = await Promise.all([
      GuitarModel.find({
        ...filtersToUse,
      })
        .populate("availability") // add this if you want to get availablity filter instead of just its id
        .populate("bodyWood")
        .populate("bridge")
        .populate("fingerboardWood")
        .populate("guitarType")
        .populate("pickupsSet")
        .populate("producer")
        .populate("shape")
        .skip(offset as number)
        .limit(limit as number)
        .sort({ [sortBy]: sortOrder }), // 1 for asc, -1 for desc
      GuitarModel.countDocuments({ ...filtersToUse }),
    ]);

    guitarList = data;
    totalGuitarsNumber = totalItems;
  } else {
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
    guitarList = data;
    totalGuitarsNumber = totalItems;
  }

  if (!guitarList) {
    throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
  }
  // eslint-disable-next-line no-console
  console.log("- - - - - - - - - - - - - -");

  const modeToDisplay =
    mode === "dataLoader"
      ? "(with DataLoader) "
      : mode === "populated"
      ? "(with populated fields) "
      : "";

  // eslint-disable-next-line no-console
  console.log(
    `\x1b[33mSELECT ${totalGuitarsNumber} Guitars ${modeToDisplay}in list, with limit: ${limit}, offset: ${offset} \x1b[0m`
  );

  return {
    data: guitarList as unknown as DataType[], // data as unknown as Guitar[],
    totalItems: totalGuitarsNumber || 0,
  };
};

export default getGuitarsQueryResolver;
