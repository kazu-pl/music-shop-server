import { ApolloServerErrorCode } from "@apollo/server/errors";
import UserModel from "features/auth/User.model";
import { GraphQLError } from "graphql";
import bcryptjs from "bcryptjs";
import { Resolvers } from "types/graphql.types";
import AUTH_MESSAGES from "./AUTH_MESSAGES";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import { string } from "yup";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRETIME_IN_SECONDS,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRETIME_IN_SECONDS,
  REFRESH_TOKEN_SECRET,
} from "constants/env";
import { DecodedUser } from "types/jwt.types";
import checkAuthentication from "./utils/checkAuthentication";

const emailSchema = string().email();

const authResolvers: Resolvers = {
  Query: {
    getUserData: async (parent, args, context) => {
      checkAuthentication(context.user);

      const result = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!result) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND_FN("użytkownika"));
      }

      return result.data;
    },
    removeUser: async (parent, args, context) => {
      checkAuthentication(context.user);

      const result = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!result) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND_FN("użytkownika"));
      }
      try {
        await result.deleteOne();
        return { message: AUTH_MESSAGES.ACCOUNT_REMOVED };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
  },

  Mutation: {
    login: async (parent, args) => {
      const { email, password } = args.loginCredentials;

      const isEmailOk = emailSchema.isValidSync(args.loginCredentials.email);

      if (!args.loginCredentials.email || !isEmailOk) {
        throw new GraphQLError(AUTH_MESSAGES.INVALID_EMAIL);
      }

      const users = await UserModel.find()
        .where("data.email")
        .in([email])
        .exec();

      if (!users.length) {
        throw new GraphQLError(AUTH_MESSAGES.ACCOUNT_DOESNT_EXIST);
      }

      const user = users[0];

      const isMatching = bcryptjs.compareSync(password, user.password);

      if (!isMatching) {
        throw new GraphQLError(AUTH_MESSAGES.WRONG_PASSWORD);
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_EXPIRETIME_IN_SECONDS,
        }
      );

      const refreshToken = jwt.sign(
        {
          _id: user._id,
        },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: REFRESH_TOKEN_EXPIRETIME_IN_SECONDS,
        }
      );

      return {
        accessToken,
        refreshToken,
      };
    },
    register: async (parent, args) => {
      const {
        password,
        data: {
          name,
          surname,
          email,
          phone,
          street,
          streetNumber,
          postalCode,
          city,
        },
      } = args.registerCredentials;

      const isEmailOk = emailSchema.isValidSync(
        args.registerCredentials.data.email
      );

      if (!args.registerCredentials.data.email || !isEmailOk) {
        // returnning here new error works only becasue GraphQLError has a field `message` and at the same time `SuccessfulReqMsg` type also has `message` member
        return new GraphQLError(AUTH_MESSAGES.INVALID_EMAIL, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
          },
        });
      }

      try {
        const results = await UserModel.find()
          .where("data.email")
          .in([email])
          .exec();

        if (results.length && results[0].data.email === email) {
          // here I RETURN new error, not THROW. If I throw new error then I could catch it in catch() and it would be of type GraphQLError so under error.message I could find AUTH_MESSAGES.ACCOUND_ALREADY_EXISTS message
          return new GraphQLError(AUTH_MESSAGES.ACCOUNT_ALREADY_EXISTS, {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
            },
          });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new UserModel({
          password: hashedPassword,

          data: {
            name,
            surname,
            email,
            phone,
            street,
            streetNumber,
            postalCode,
            city,
          },
        });

        await newUser.save();

        return {
          message: AUTH_MESSAGES.ACCOUNT_CREATED,
        };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    renewAccessToken: async (parent, args) => {
      const { refreshToken } = args.refreshCredentials;

      // TODO?: here I could also pass old accessToken and check if it expired - if no, then throw error saying that user shouldn't refresh accessToken when the old one is still active

      try {
        const data = jwt.verify(
          refreshToken,
          REFRESH_TOKEN_SECRET
        ) as DecodedUser;

        const newAccessToken = jwt.sign(
          {
            _id: data._id,
          },
          ACCESS_TOKEN_SECRET,
          { expiresIn: ACCESS_TOKEN_EXPIRETIME_IN_SECONDS }
        );

        return {
          accessToken: newAccessToken,
        };
      } catch (err) {
        const error = err as TokenExpiredError;
        if (error.message === "jwt expired") {
          throw new GraphQLError(AUTH_MESSAGES.SESSION_ENDED);
        } else {
          throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
        }
      }
    },
    updateUserData: async (parent, args, context) => {
      checkAuthentication(context.user);

      const result = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!result) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND_FN("użytkownika"));
      }

      try {
        await result
          .updateOne({
            data: {
              ...result.data,
              ...args.data,
            },
          })
          .exec();

        return {
          message: AUTH_MESSAGES.ACCOUNT_UPDATED,
        };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
    updateUserPassword: async (parent, args, context) => {
      checkAuthentication(context.user);

      const { newPassword, oldPassword } = args.newPasswordInput;

      const result = await UserModel.findOne({
        _id: context.user?._id,
      }).exec();

      if (!result) {
        throw new GraphQLError(COMMON_MESSAGES.NOT_FOUND_FN("użytkownika"));
      }
      const isMatching = bcryptjs.compareSync(oldPassword, result.password);

      if (!isMatching) {
        throw new GraphQLError(AUTH_MESSAGES.WRONG_OLD_PASSWORD);
      }

      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      try {
        await result
          .updateOne({
            password: hashedPassword,
          })
          .exec();

        return {
          message: AUTH_MESSAGES.ACCOUNT_UPDATED,
        };
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }
    },
  },
};

export default authResolvers;
