import { GraphQLError } from "graphql";
import {
  Resolvers,
  Guitar,
  GuitarWithDataLoader,
  GuitarPopulated,
} from "types/graphql.types";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import checkAuthentication from "utils/auth/checkAuthentication";
import allowOnlyAdmin from "utils/auth/allowOnlyAdmin";
import GuitarModel from "./Guitar.model";
import getErrorMessage from "utils/getErrorMessage";
import getGuitarModelFieldForResolver from "./utils/getGuitarModelFieldForResolver";

import GraphQLUpload from "lib/graphql-upload/GraphQLUpload";
import storeFile from "utils/db/storeFile";
import PhotoFileModel from "common/models/PhotoFile.model";
import PhotoChunkModel from "common/models/PhotoChunk.model";
import mongoose from "mongoose";
import getGuitarFiltersFromDataLoader from "./utils/getGuitarFiltersFromDataLoader";
import getGuitarsQueryResolver from "./utils/getGuitarsQueryResolver";

const guitarResolvers: Resolvers = {
  Upload: GraphQLUpload,

  GuitarWithDataLoader: {
    availability: async (parent, args, context) => {
      const id = (
        parent.availability as unknown as mongoose.Types.ObjectId
      ).toHexString(); // get _id string value instead of New ObjectId("...")

      return await context.loaders.availabilityLoader.load(id);
    },
    bodyWood: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "bodyWoodLoader"),

    bridge: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "bridgeLoader"),

    fingerboardWood: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "fingerboardWoodLoader"),

    guitarType: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "guitarTypeLoader"),

    pickupsSet: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "pickupsSetLoader"),

    producer: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "producerLoader"),

    shape: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "shapeLoaderLoader"),
  },
  Guitar: {
    availability: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "availability");
    },
    bodyWood: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "bodyWood");
    },
    bridge: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "bridge");
    },
    fingerboardWood: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "fingerboardWood");
    },
    guitarType: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "guitarType");
    },
    pickupsSet: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "pickupsSet");
    },
    producer: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "producer");
    },
    shape: async (parent) => {
      return await getGuitarModelFieldForResolver(parent, "shape");
    },
  },
  Query: {
    getGuitarsPopulated: async (parent, args, context, info) =>
      getGuitarsQueryResolver<GuitarPopulated>(
        parent,
        args,
        context,
        info,
        "populated"
      ),

    getGuitarsWithDataLoader: async (parent, args, context, info) =>
      getGuitarsQueryResolver<GuitarWithDataLoader>(
        parent,
        args,
        context,
        info,
        "dataLoader"
      ),

    getGuitars: async (parent, args, context, info) =>
      getGuitarsQueryResolver<Guitar>(parent, args, context, info),

    getGuitar: async (parent, args) => {
      const { id } = args;

      const guitar = await GuitarModel.findOne({
        _id: id,
      }).exec();

      if (!guitar) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }

      return guitar as unknown as Guitar; // in fact this field will return keys from model kept in db like `producer` which is prodicer filter id but the type Guitar wants me to return real Filter (whic is returned in guitar.producer resolver) so I have to cast it as unknown and then as Guitar to let the typescript accept it
    },
  },

  Mutation: {
    updateGuitarImage: async (parent, { image, guitarId }, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const guitar = await GuitarModel.findOne({ _id: guitarId }).exec();

      if (!guitar) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }

      const imageId = await storeFile(image).then((result) => result);

      if (guitar.imageId) {
        const prevImage = await PhotoFileModel.findOne({ _id: guitar.imageId });

        await PhotoChunkModel.deleteMany({ files_id: prevImage?._id }); // deletes chunks (photos.chunks model) of file
        await prevImage?.deleteOne(); // deletes the file itself (photos.files model)
      }

      await guitar.updateOne({ imageId });

      return imageId as unknown as string;
    },

    removeGuitarImage: async (parent, { guitarId }, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const guitar = await GuitarModel.findOne({ _id: guitarId }).exec();

      if (!guitar) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }

      if (guitar.imageId) {
        const prevImage = await PhotoFileModel.findOne({ _id: guitar.imageId });

        await PhotoChunkModel.deleteMany({ files_id: prevImage?._id }); // deletes chunks (photos.chunks model) of file
        await prevImage?.deleteOne(); // deletes the file itself (photos.files model)
      }

      await guitar.updateOne({ $unset: { imageId: 1 } }); // removes totally `imageId` field

      return { message: COMMON_MESSAGES.SUCCESSFULLY_REMOVED };
    },

    addGuitar: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const {
        name,
        availabilityId,
        bodyWoodId,
        bridgeId,
        fingerboardWoodId,
        guitarTypeId,
        pickupsSetId,
        producerId,
        shapeId,
        ...rest
      } = args.newGuitar;

      const guitar = await GuitarModel.findOne({
        name,
      }).exec();

      if (guitar) {
        throw new GraphQLError(
          COMMON_MESSAGES.ITEM_WITH_NAME_ALREADY_EXIST_FN("gitara")
        );
      }

      try {
        await new GuitarModel({
          name,
          ...rest,
          availability: availabilityId,
          bodyWood: bodyWoodId,
          bridge: bridgeId,
          fingerboardWood: fingerboardWoodId,
          guitarType: guitarTypeId,
          pickupsSet: pickupsSetId,
          producer: producerId,
          shape: shapeId,
        }).save();

        return {
          message: COMMON_MESSAGES.ITEM_WITH_NAME_CREATED_FN("gitarę"),
        };
      } catch (err) {
        throw new GraphQLError(getErrorMessage(err));
      }
    },

    updateGuitar: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const {
        id,
        name,
        availabilityId,
        bodyWoodId,
        bridgeId,
        fingerboardWoodId,
        guitarTypeId,
        pickupsSetId,
        producerId,
        shapeId,
        ...rest
      } = args.guitar;

      const guitar = await GuitarModel.findOne({
        _id: id,
      }).exec();

      if (!guitar) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND);
      }
      try {
        await guitar
          .updateOne({
            name,
            ...rest,
            availability: availabilityId,
            bodyWood: bodyWoodId,
            bridge: bridgeId,
            fingerboardWood: fingerboardWoodId,
            guitarType: guitarTypeId,
            pickupsSet: pickupsSetId,
            producer: producerId,
            shape: shapeId,
          })
          .exec();

        return {
          message: COMMON_MESSAGES.SUCCESSFULLY_UPDATED,
        };
      } catch (err) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },

    removeGuitar: async (parent, args, context) => {
      checkAuthentication(context.user);
      allowOnlyAdmin(context.user);

      const result = await GuitarModel.findOne({
        _id: args.id,
      }).exec();

      if (!result) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND_FN("gitary"));
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

export default guitarResolvers;
