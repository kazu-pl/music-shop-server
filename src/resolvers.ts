import { Resolvers } from "types/graphql.types";
import authResolvers from "features/auth/auth.resolvers";

const resolvers: Resolvers = {
  ...authResolvers,

  Query: {
    ...authResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
  },
};

export default resolvers;
