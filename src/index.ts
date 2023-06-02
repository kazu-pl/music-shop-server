import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { json } from "body-parser";
import cors from "cors";

import { ApolloServer } from "@apollo/server";

import mongoose from "mongoose";
import { MONGO_DB_URI, PORT } from "constants/env";

import context, { Context } from "./context";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

import graphqlUploadExpress from "lib/graphql-upload/graphqlUploadExpress";

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: false, // TODO: set this to true and header Apollo-Require-Preflight': 'true' in apollo--upload-client on frontend
});

app.use(graphqlUploadExpress());

server
  .start()
  .then(() => {
    app.use(
      "/",
      cors<cors.CorsRequest>({
        origin: "*", // you can put "*" or ["http://localhost:3000"] but ["*"] won't work and front will receive `NetworkError when attempting to fetch resource.` error
      }),
      json(),
      expressMiddleware(server, {
        context,
      })
    );

    mongoose
      .connect(MONGO_DB_URI, {
        retryWrites: true,
        w: "majority",
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`Connected to MongoDB!`);

        httpServer.listen({ port: +PORT }, () => {
          // eslint-disable-next-line no-console
          console.log(`Server ready at: http://localhost:${+PORT}`);
        });
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
