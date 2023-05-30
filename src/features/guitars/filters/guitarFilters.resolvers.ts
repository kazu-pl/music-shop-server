import { GraphQLError } from "graphql";
import { Resolvers } from "types/graphql.types";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import checkAuthentication from "utils/checkAuthentication";
import allowOnlyAdmin from "utils/allowOnlyAdmin";
import GuitarFilterModel from "./models/GuitarFilter.model";
import { GuitarFilterTypeEnum } from "types/graphql.types";

const authResolvers: Resolvers = {
  Query: {
    getGuitarFilters: async (parent, args) => {
      const { limit = 5, offset = 0, type } = args;

      const [data, totalItems] = await Promise.all([
        GuitarFilterModel.find({ type })
          .skip(offset as number)
          .limit(limit as number)
          .sort({ name: 1 }),
        GuitarFilterModel.countDocuments({ type }),
      ]);

      if (!data) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }

      return {
        data: data.map(({ _id, name, description, type }) => ({
          id: _id,
          name,
          ...(description && { description }),
          type: type as GuitarFilterTypeEnum,
        })),
        totalItems: totalItems || 0,
      };
    },

    getGuitarFilter: async (parent, args) => {
      const { id } = args;

      const guitarFilter = await GuitarFilterModel.findOne({
        _id: id,
      }).exec();
      if (!guitarFilter) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      return {
        ...(guitarFilter.description && {
          description: guitarFilter.description,
        }),
        id: guitarFilter._id,
        name: guitarFilter.name,
        type: guitarFilter.type as GuitarFilterTypeEnum,
      };
    },
  },

  Mutation: {
    addGuitarFilter: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name, description, type } = args.newGuitarFilter;

      const guitarProducent = await GuitarFilterModel.findOne({
        name,
      }).exec();

      if (guitarProducent) {
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

      const guitarProducent = await GuitarFilterModel.findOne({
        _id: id,
      }).exec();

      if (!guitarProducent) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      try {
        await guitarProducent.updateOne({ name, description, type }).exec();

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

export default authResolvers;
