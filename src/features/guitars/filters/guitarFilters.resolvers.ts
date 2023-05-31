import { GraphQLError } from "graphql";
import { GuitarFilter, Resolvers } from "types/graphql.types";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import checkAuthentication from "utils/auth/checkAuthentication";
import allowOnlyAdmin from "utils/auth/allowOnlyAdmin";
import GuitarFilterModel from "./GuitarFilter.model";

import getGuitarFilterById from "./utils/getGuitarFilterById";

const guitarFiltersResolvers: Resolvers = {
  Query: {
    getGuitarFilters: async (parent, args) => {
      const { limit = 5, offset = 0, type } = args;

      const [data, totalItems] = await Promise.all([
        GuitarFilterModel.find({ type })
          .skip(offset as number)
          .limit(limit as number)
          .sort({ name: 1 }), // 1 for asc, -1 for desc
        GuitarFilterModel.countDocuments({ type }),
      ]);

      if (!data) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }

      return {
        data: data as GuitarFilter[],
        totalItems: totalItems || 0,
      };
    },

    getGuitarFilter: async (parent, args) => {
      const { id } = args;
      const result = await getGuitarFilterById(id);

      return result;
    },
  },

  Mutation: {
    addGuitarFilter: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name, description, type } = args.newGuitarFilter;

      const guitarFilter = await GuitarFilterModel.findOne({
        name,
      }).exec();

      if (guitarFilter) {
        throw new GraphQLError(
          COMMON_MESSAGES.ITEM_WITH_NAME_ALREADY_EXIST_FN("Filter gitary")
        );
      }

      try {
        await new GuitarFilterModel({
          name,
          ...(description && { description }),
          type,
        }).save();

        return {
          message: COMMON_MESSAGES.ITEM_WITH_NAME_CREATED_FN("Filter gitary"),
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    updateGuitarFilter: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name, description, id, type } = args.guitarFilter;

      const guitarFilter = await GuitarFilterModel.findOne({
        _id: id,
      }).exec();

      if (!guitarFilter) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      try {
        await guitarFilter.updateOne({ name, description, type }).exec();

        return {
          message: COMMON_MESSAGES.SUCCESSFULLY_UPDATED,
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    removeGuitarFilter: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const result = await GuitarFilterModel.findOne({
        _id: args.id,
      }).exec();

      if (!result) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND_FN("filtru gitary"));
      }
      try {
        await result.deleteOne();
        return { message: COMMON_MESSAGES.SUCCESSFULLY_REMOVED };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
  },
};

export default guitarFiltersResolvers;
