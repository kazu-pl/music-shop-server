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
import getSortBy from "utils/db/getSortBy";
import getFilters from "utils/db/getFilters";
import getSortOrder from "utils/db/getSortOrder";
import checkIfGivenMemberIsQuered from "../../utils/checkIfGivenMemberIsQuered";
import UserModel from "features/auth/models/User.model";
import AUTH_MESSAGES from "constants/AUTH_MESSAGES";

const guitarResolvers: Resolvers = {
  Upload: GraphQLUpload,

  GuitarWithDataLoader: {
    availability: async (parent, args, context) => {
      // here I could just return getGuitarFiltersFromDataLoader(parent, context, "availability"), but I just pasted its logic just to make it explicitly clear what it does
      const id = (
        parent.availability as unknown as mongoose.Types.ObjectId
      ).toHexString(); // get _id string value instead of New ObjectId("...")

      return await context.loaders.availability.load(id);
    },
    bodyWood: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "bodyWood"),

    bridge: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "bridge"),

    fingerboardWood: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "fingerboardWood"),

    guitarType: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "guitarType"),

    pickupsSet: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "pickupsSet"),

    producer: async (parent, args, context) => {
      return getGuitarFiltersFromDataLoader(parent, context, "producer");
    },

    shape: async (parent, args, context) =>
      getGuitarFiltersFromDataLoader(parent, context, "shape"),
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
    getGuitarsPopulatedOptionally: async (parent, args, context, info) => {
      const {
        limit = 5,
        offset = 0,
        sort,
        filters: { ids, fretsNumber, scaleLength, ...filters },
      } = args;

      const sortBy = getSortBy(sort.sortBy);
      const sortOrder = getSortOrder(sort.sortOrder);

      const filtersToUse = getFilters(filters);

      const isAvailabilityQuered = checkIfGivenMemberIsQuered(
        info,
        "availability"
      );
      const isBodyWoodQuered = checkIfGivenMemberIsQuered(info, "bodyWood");
      const isBridgeQuered = checkIfGivenMemberIsQuered(info, "bridge");
      const isFingerboardWoodQuered = checkIfGivenMemberIsQuered(
        info,
        "fingerboardWood"
      );
      const isGuitarTypeQuered = checkIfGivenMemberIsQuered(info, "guitarType");
      const isPickupsSetQuered = checkIfGivenMemberIsQuered(info, "pickupsSet");
      const isProducerQuered = checkIfGivenMemberIsQuered(info, "producer");
      const isShapeQuered = checkIfGivenMemberIsQuered(info, "shape");

      const promiseToGetData = GuitarModel.find({
        ...filtersToUse,
      });

      if (ids) {
        promiseToGetData.where("_id").in([...ids]);
      }

      if (isAvailabilityQuered) {
        promiseToGetData.populate("availability");
      }
      if (isBodyWoodQuered) {
        promiseToGetData.populate("bodyWood");
      }
      if (isBridgeQuered) {
        promiseToGetData.populate("bridge");
      }
      if (isFingerboardWoodQuered) {
        promiseToGetData.populate("fingerboardWood");
      }
      if (isGuitarTypeQuered) {
        promiseToGetData.populate("guitarType");
      }
      if (isPickupsSetQuered) {
        promiseToGetData.populate("pickupsSet");
      }
      if (isProducerQuered) {
        promiseToGetData.populate("producer");
      }
      if (isShapeQuered) {
        promiseToGetData.populate("shape");
      }

      if (fretsNumber) {
        promiseToGetData.where("fretsNumber").equals(fretsNumber);
      }

      if (scaleLength) {
        promiseToGetData.where("scaleLength").equals(scaleLength);
      }

      const [data, totalItems] = await Promise.all([
        promiseToGetData
          .skip(offset as number)
          .limit(limit as number)
          .sort({ [sortBy]: sortOrder }), // 1 for asc, -1 for desc
        ids
          ? GuitarModel.countDocuments({ ...filtersToUse })
              .where("_id")
              .in([...ids])
          : GuitarModel.countDocuments({ ...filtersToUse }),
      ]);

      if (!data) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
      // eslint-disable-next-line no-console
      console.log("- - - - - - - - - - - - - -");

      // eslint-disable-next-line no-console
      console.log(
        `\x1b[33mSELECT ${totalItems} Guitars (with optionally populated fields) in list, with limit: ${limit}, offset: ${offset} \x1b[0m`
      );

      return {
        data: data as unknown as GuitarPopulated[],
        totalItems: totalItems || 0,
      };
    },

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
      getGuitarsQueryResolver<Guitar>(parent, args, context, info, "default"),

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
    getGuitarsFromWishlist: async (parent, args, context) => {
      checkAuthentication(context.user);
      // mam w stashu zmiany dotyczące fretsNumber itd
      const user = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!user) {
        throw new GraphQLError(AUTH_MESSAGES.ACCOUNT_DOESNT_EXIST);
      }

      return {
        data: (user.data.wishlist as unknown as string[]) || [],
        totalItems: user.data.wishlist.length,
      };
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

    addItemToWishlist: async (parent, args, context) => {
      checkAuthentication(context.user);

      const id = args.id;

      const user = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!user) {
        throw new GraphQLError(AUTH_MESSAGES.ACCOUNT_DOESNT_EXIST);
      }

      if ((user.data.wishlist || []).includes(id)) {
        return {
          message: COMMON_MESSAGES.ALREADY_IN_WISHLIST,
        };
      }

      try {
        await user
          .updateOne({
            data: {
              ...user.data,
              wishlist: [...(user.data.wishlist || []), id],
            },
          })
          .exec();

        return {
          message: COMMON_MESSAGES.ADDED_TO_WISHLIST,
        };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },

    removeItemfromWishlist: async (parent, args, context) => {
      checkAuthentication(context.user);

      const id = args.id;

      const user = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!user) {
        throw new GraphQLError(AUTH_MESSAGES.ACCOUNT_DOESNT_EXIST);
      }

      try {
        await user
          .updateOne({
            data: {
              ...user.data,
              wishlist: (user.data.wishlist || []).filter(
                (prevItem) => prevItem !== id
              ),
            },
          })
          .exec();

        return {
          message: COMMON_MESSAGES.REMOVED_FROM_WISHLIST,
        };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
  },
};

export default guitarResolvers;
