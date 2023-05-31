import { FilterQuery, Document } from "mongoose";

type FiltersStructure = Record<
  string,
  string | number | { from: number; to: number } | null
>;

const getFilters = (filters?: FiltersStructure | null) => {
  if (!filters) return {};

  /**
   * @example
   * [
   *  [ 'tiger', "some-string-value" ],
   *  [ 'cat', { from: 1, to: 5 } ],
   * ]
   */
  const keys = Object.entries(filters);

  const filtersToApply: FilterQuery<Document> = keys.reduce((acc, curr) => {
    if (curr[1] === null) return acc;

    return {
      ...acc,
      [curr[0]]:
        typeof curr[1] === "string" || typeof curr[1] === "number"
          ? curr[1]
          : {
              $gte: curr[1].from,
              $lte: curr[1].to,
            },
    } as FilterQuery<Document>;
  }, {});

  return filtersToApply;
};

export default getFilters;
