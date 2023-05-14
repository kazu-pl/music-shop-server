import { ApolloServerErrorCode } from "@apollo/server/errors";
import userModel from "features/auth/User.model";
import { GraphQLError } from "graphql";
import bcryptjs from "bcryptjs";
import { Resolvers } from "types/graphql.types";
import AUTH_MESSAGES from "./AUTH_MESSAGES";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";

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

const authResolvers: Resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    login: (parent, args) => {
      if (!args.loginCredentials.email.includes("@")) {
        throw new GraphQLError(AUTH_MESSAGES.INVALID_EMAIL, {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
          },
        });
      }

      return {
        accessToken: "asd",
        refreshToken: "asdss",
      };
    },
    register: async (parent, args) => {
      const { password, email, name, surname } = args.registerCredentials;

      try {
        const results = await userModel
          .find()
          .where("data.email")
          .in([email])
          .exec();

        if (results.length && results[0].data.email === email) {
          // here I RETURN new error, not THROW. If I throw new error then I could catch it in catch() and it would be of type GraphQLError so under error.message I could find AUTH_MESSAGES.ACCOUND_ALREADY_EXISTS message
          return new GraphQLError(AUTH_MESSAGES.ACCOUND_ALREADY_EXISTS, {
            extensions: {
              code: ApolloServerErrorCode.BAD_USER_INPUT,
            },
          });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new userModel({
          password: hashedPassword,

          data: {
            email,
            name,
            surname,
          },
        });

        await newUser.save();
      } catch (error) {
        throw new GraphQLError(COMMON_MESSAGES.AN_ERROR_OCCURED);
      }

      return {
        message: AUTH_MESSAGES.ACCOUNT_CREATED,
      };
    },
  },
};

export default authResolvers;
