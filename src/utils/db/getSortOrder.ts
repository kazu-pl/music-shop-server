import { SortOrder } from "types/graphql.types";

const getSortOrder = (order?: string | null): 1 | -1 => {
  if (order) {
    return order === SortOrder.Asc ? 1 : -1;
  }

  return 1;
};

export default getSortOrder;
