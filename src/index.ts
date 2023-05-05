import { ApolloServer } from "@apollo/server";
import renderText from "something/renderText";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  type Tokens {
    """
    Description for field
    Supports **multi-line** description for your [API](http://example.com)!
    """
    accessToken: String!
    "Description for argument"
    refreshToken: String!
  }

  input LoginCredentialsInput {
    email: String!
    password: String!
  }


  type Query {
    books: [Book]
  }

  type Mutation {
    "use this mutation to send email and password and get JWT tokens"
    login(loginCredentials: LoginCredentialsInput!): Tokens!
    something(loginCredentials: LoginCredentialsInput!): Tokens!
  }

`;
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
//// Resolvers define how to fetch the types defined in your schema.

//// This resolver retrieves books from the "books" array above.
type Context = any;
const resolvers: IExecutableSchemaDefinition<Context>["resolvers"] = {
  Query: {
    books: () => books,
  },
  Mutation: {
    login: (
      parent: any,
      args: { loginCredentials: { email: string; password: string } },
      context,
      info
    ) => {
      console.log({ parent, args, context });

      if (!args.loginCredentials.email.includes("@")) {
        throw new GraphQLError("Email is invalid, shoudl contain @ character", {
          extensions: {
            code: ApolloServerErrorCode.BAD_USER_INPUT,
            myCustomDetailsForFront: "asdsad",
          },
        });
      }

      return {
        accessToken: "asd",
        refreshToken: "asdss",
      };
    },
  },
};

renderText(3);
//// The ApolloServer constructor requires two parameters: your schema

//// definition and your set of resolvers.

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
});

//// Passing an ApolloServer instance to the `startStandaloneServer` function:

////  1. creates an Express app

////  2. installs your ApolloServer instance as middleware

////  3. prepares your app to handle incoming requests

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log("error: ", error);
  });
