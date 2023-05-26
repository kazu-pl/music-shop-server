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

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const emailSchema = string().email();

const authResolvers: Resolvers = {
  Query: {
    books: () => books,
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
      const { password, email, name, surname } = args.registerCredentials;

      const isEmailOk = emailSchema.isValidSync(args.registerCredentials.email);

      if (!args.registerCredentials.email || !isEmailOk) {
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
            email,
            name,
            surname,
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
    someProtectedMutation(parent, args, context, info) {
      const { age } = args.data;
      console.log({ someProtectedMutation_context: context });

      checkAuthentication(context.user);

      return {
        message: `lat: ${age}`,
      };
    },
  },
};

export default authResolvers;
