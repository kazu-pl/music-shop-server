import { GraphQLError } from "graphql";
import { Resolvers } from "types/graphql.types";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import checkAuthentication from "utils/checkAuthentication";
import allowOnlyAdmin from "utils/allowOnlyAdmin";
import GuitarProducentFilterModel from "./models/GuitarProducentFilter.model";
import GuitarShapeFilterModel from "./models/GuitarShapeFilter.model";

const authResolvers: Resolvers = {
  Query: {
    getGuitarProducents: async (parent, args) => {
      const { limit = 5, offset = 0 } = args;

      const [data, totalItems] = await Promise.all([
        GuitarProducentFilterModel.find()
          .skip(offset as number)
          .limit(limit as number)
          .sort({ name: 1 }),
        GuitarProducentFilterModel.count(),
      ]);

      // const data = await GuitarProducentFilterModel.find()
      //   .skip(offset as number)
      //   .limit(limit as number)
      //   .sort({ name: 1 })
      //   .exec();

      if (!data) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }

      // const totalItems = await GuitarProducentFilterModel.count();

      return {
        data: data.map(({ _id, name, description }) => ({
          id: _id,
          name,
          description,
        })),
        totalItems: totalItems || 0,
      };
    },

    getGuitarProducent: async (parent, args) => {
      const { id } = args;

      const guitarProducent = await GuitarProducentFilterModel.findOne({
        _id: id,
      }).exec();
      if (!guitarProducent) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      return {
        description: guitarProducent.description,
        id: guitarProducent._id,
        name: guitarProducent.name,
      };
    },
    removeGuitarProducent: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const result = await GuitarProducentFilterModel.findOne({
        _id: args.id,
      }).exec();

      if (!result) {
        throw new GraphQLError(
          COMMON_MESSAGES.NOT_FOUND_FN("producenta gitar")
        );
      }
      try {
        await result.deleteOne();
        return { message: COMMON_MESSAGES.SUCCESSFULLY_REMOVED };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    //  ========= GuitarShape =============
    getGuitarShapes: async (parent, args) => {
      const { limit = 5, offset = 0 } = args;

      const [data, totalItems] = await Promise.all([
        GuitarShapeFilterModel.find()
          .skip(offset as number)
          .limit(limit as number)
          .sort({ name: 1 }),
        GuitarShapeFilterModel.count(),
      ]);

      // const data = await GuitarShapeFilterModel.find()
      //   .skip(offset as number)
      //   .limit(limit as number)
      //   .sort({ name: 1 })
      //   .exec();

      if (!data) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }

      // const totalItems = await GuitarShapeFilterModel.count();

      return {
        data: data.map(({ _id, name }) => ({
          id: _id,
          name,
        })),
        totalItems: totalItems || 0,
      };
    },
    getGuitarShape: async (parent, args) => {
      const { id } = args;

      const guitarShape = await GuitarShapeFilterModel.findOne({
        _id: id,
      }).exec();
      if (!guitarShape) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      return {
        id: guitarShape._id,
        name: guitarShape.name,
      };
    },

    removeGuitarShape: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const result = await GuitarShapeFilterModel.findOne({
        _id: args.id,
      }).exec();

      if (!result) {
        throw new GraphQLError(
          COMMON_MESSAGES.NOT_FOUND_FN("producenta gitar")
        );
      }
      try {
        await result.deleteOne();
        return { message: COMMON_MESSAGES.SUCCESSFULLY_REMOVED };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
  },

  Mutation: {
    //  ========= GuitarProducent =============
    addGuitarProducent: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name, description } = args.producentData;

      const guitarProducent = await GuitarProducentFilterModel.findOne({
        name,
      }).exec();

      if (guitarProducent) {
        throw new GraphQLError(
          COMMON_MESSAGES.ITEM_WITH_NAME_ALREADY_EXIST_FN("Producent gitary")
        );
      }

      try {
        await new GuitarProducentFilterModel({
          name,
          description,
        }).save();

        return {
          message:
            COMMON_MESSAGES.ITEM_WITH_NAME_CREATED_FN("producenta gitary"),
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    updateGuitarProducent: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name, description, id } = args.producentData;

      const guitarProducent = await GuitarProducentFilterModel.findOne({
        _id: id,
      }).exec();

      if (!guitarProducent) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      try {
        await guitarProducent.updateOne({ name, description }).exec();

        return {
          message: COMMON_MESSAGES.SUCCESSFULLY_UPDATED,
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    //  ========= GuitarShape =============
    addGuitarShape: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name } = args.newGuitarShape;

      const guitarShape = await GuitarShapeFilterModel.findOne({
        name,
      }).exec();

      if (guitarShape) {
        throw new GraphQLError(
          COMMON_MESSAGES.ITEM_WITH_NAME_ALREADY_EXIST_FN("kształt gitary")
        );
      }

      try {
        await new GuitarShapeFilterModel({
          name,
        }).save();

        return {
          message: COMMON_MESSAGES.ITEM_WITH_NAME_CREATED_FN("kształt gitary"),
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    updateGuitarShape: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const { name, id } = args.guitarShapeData;

      const guitarShape = await GuitarShapeFilterModel.findOne({
        _id: id,
      }).exec();

      if (!guitarShape) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      try {
        await guitarShape.updateOne({ name }).exec();

        return {
          message: COMMON_MESSAGES.SUCCESSFULLY_UPDATED,
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
  },
};

export default authResolvers;
// TODO: przetestowałem GuitarProducent endpoinsts i działąją, teraz tylko sprawdzić czy GuitarShape działa i można dodawać commitować to co już mam oraz dodawać nowe
