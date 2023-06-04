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
import PhotoFileModel from "common/models/PhotoFile.model";
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";
import { GridFSBucket } from "mongodb";
import PHOTOS_BUCKET_NAME from "constants/PHOTOS_BUCKET_NAME";

export let gridFSBucket: GridFSBucket;

const conn = mongoose.connection;
conn.once("open", () => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: PHOTOS_BUCKET_NAME,
  });
});

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

app.use(
  cors<cors.CorsRequest>({
    origin: "*", // you can put "*" or ["http://localhost:3000"] but ["*"] won't work and front will receive `NetworkError when attempting to fetch resource.` error
  })
);
app.use(json());

server
  .start()
  .then(() => {
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context,
      })
    );

    app.get("/", (req, res) =>
      res.status(200).json({
        message: `Witamy na serverze. Przejdź pod "/graphql", aby sprawdzić dostępne query i mutacje lub przejdź pod "/files/<id>", aby otrzymać zdjęcie`,
      })
    );

    app.get("/files/:id", (req, res) => {
      // this endpoint will produce error if it is applied onto Router and not directly here
      PhotoFileModel.findOne({ _id: req.params.id })
        .exec()
        .then((file) => {
          if (file === undefined || file === null) {
            return res.status(404).json({
              message: COMMON_MESSAGES.NOT_FOUND_FN("pliku"),
            });
          }

          //  below line produces an error when you build server via `yarn build` and run via `yarn start`.
          const readStream = gridFSBucket.openDownloadStream(file._id);
          readStream.pipe(res);
        })
        .catch((error) => {
          res.status(500).json({
            message: COMMON_MESSAGES.AN_ERROR_OCCURED,
            error,
          });
        });
    });

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
          console.log(`Server ready at: http://localhost:${+PORT}/graphql`);
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
