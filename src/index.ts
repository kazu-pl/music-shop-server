import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mongoose from "mongoose";
import { MONGO_DB_URI, PORT } from "constants/env";

import { Context } from "./context";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
});

startStandaloneServer(server, {
  listen: { port: +PORT },
})
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀  Server ready at: ${url}`);

    mongoose
      .connect(MONGO_DB_URI, {
        retryWrites: true,
        w: "majority",
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`Connected to MongoDB!`);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log("error: ", error);
  });
