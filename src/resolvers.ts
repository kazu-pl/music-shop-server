import { Resolvers } from "types/graphql.types";
import authResolvers from "features/auth/auth.resolvers";
import guitarFiltersResolvers from "features/guitars/filters/guitarFilters.resolvers";
import guitarResolvers from "features/guitars/guitar.resolvers";

const resolvers: Resolvers = {
  ...authResolvers,
  ...guitarFiltersResolvers,
  ...guitarResolvers,
  Query: {
    ...authResolvers.Query,
    ...guitarFiltersResolvers.Query,
    ...guitarResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...guitarFiltersResolvers.Mutation,
    ...guitarResolvers.Mutation,
  },
};

export default resolvers;
