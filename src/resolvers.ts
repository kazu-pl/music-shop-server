import { Resolvers } from "types/graphql.types";
import authResolvers from "features/auth/auth.resolvers";
import guitarFiltersResolvers from "features/guitars/filters/guitarFilters.resolvers";

const resolvers: Resolvers = {
  ...authResolvers,
  ...guitarFiltersResolvers,
  Query: {
    ...authResolvers.Query,
    ...guitarFiltersResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...guitarFiltersResolvers.Mutation,
  },
};

export default resolvers;
