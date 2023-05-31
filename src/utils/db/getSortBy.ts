import { SortByGeneral } from "types/graphql.types";

const getSortBy = (sortBy: string) => {
  return sortBy === SortByGeneral.Default || sortBy === SortByGeneral.Latest
    ? "createdAt"
    : sortBy.toLowerCase();
};

export default getSortBy;
