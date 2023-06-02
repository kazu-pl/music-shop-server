# How to send file to mongoDB obtained in graphQL Server in mutation:

`1` - set ability to uploading files to graphql server. To do so, follow `How to upload files via graphQL to graphQL Server` title
`2` - if you want to, you can modify mutation to send not only file but also id of some entity in mongoDB that should obrain file:

```graphql
type Mutation {
  # send image and pass id of a guitar which should return in its data url to newly uplaoded image of the guitar
  singleUpload(file: Upload!, guitarId: ID!): File!
}
```

`3` - follow the instruction from [this](https://stackoverflow.com/questions/63420141/uploading-files-with-graphql-to-mongodb-with-mongoose) so in another words:

- create `storeFile` function that handles the actall sending file to mongoDB:

```ts
// src/utils/storeFile.ts

import mongoose from "mongoose";
import { File } from "types/file";

export interface File {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: any;
}

const storeFile = async (file: Promise<File>) => {
  const { filename, createReadStream, mimetype } = await file.then(
    (result: File) => result
  );

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "photos",
  });

  // uploadStream contains for example `filename` of the passed file and its `id` in mongoDB database
  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimetype,
  });
  return new Promise<mongoose.mongo.BSON.ObjectId>((resolve, reject) => {
    createReadStream()
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        resolve(uploadStream.id);
      });
  });
};

export default storeFile;
```

- update resolvers map:

```ts
const resolvers = {
  Mutation: {
    singleUpload: async (parent, { file, guitarId }) => {
      const fileId = await storeFile(file).then((result) => result);

      GuitarModel.updateOne({ imageId: guitarId }).exec();

      return { fileId };
    },
  },
};
```

# How to upload files via graphQL to graphQL Server:

There are multiple ways how to handle uploading files via graphQL server. First is to use `graphql-upload`:

`1` - install the package with `yarn add graphql-upload`, info about package [here](https://www.npmjs.com/package/graphql-upload)
`2` - install package types with `yarn add @types/graphql-upload -D`
`3` - add new scalar `Upload` to your schema and mutation that handles it:

```graphql
# The implementation for this scalar is provided by the
# 'GraphQLUpload' export from the 'graphql-upload' package
# in the resolver map below.
scalar Upload

type File {
  filename: String!
  mimetype: String!
  encoding: String!
}

type Mutation {
  # Multiple uploads are supported. See graphql-upload docs for details.
  singleUpload(file: Upload!): File!
}
```

`4` - generate your schema with `yarn codegen` command. When it's done it will create Upload scalar as any in the generated file with graphql files:

```ts
// the-file-in-wich-you-generate-types-based-on-graphql-schema.ts

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any; // new scalar of type any
};
```

`5` - use `graphqlUploadExpress` in `index.ts` and set `csrfPrevention` option to `false`:

```ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.mjs"); //  you have to require this because its *.mjs

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: false, // set this to false - it disposes your server to scrf attack but this is the only way to allow uploading files via graphql.
  //  csrfPrevention: true ,// AS AN ALTERNATIVE: you can leave csrfPrevention set to true but on client frontend app use `graphql-upload-client` package and add header Apollo-Require-Preflight': 'true' to createUploadLink in apollo client. Foire info [here](https://www.apollographql.com/docs/apollo-server/security/cors/#graphql-upload)
});

app.use(graphqlUploadExpress()); // use it here - BEFORE server.start() function

server
  .start()
  .then(() => {
    app.use(
      "/",
      cors<cors.CorsRequest>({
        origin: "*",
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
        httpServer.listen({ port: +PORT }, () => {
          console.log(`Server ready at: http://localhost:${+PORT}`);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((error) => {
    console.log("error: ", error);
  });
```

`6` - add resolver for your custom Upload scalar:

Normally you would require this resolver and put it in your resolver map like so:

```ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLUpload = require("graphql-upload/GraphQLUpload.mjs"); // you have to require this becuase its *.mjs file

const guitarResolvers: Resolvers = {
  Upload: GraphQLUpload, // add resolver for custom scalar: Upload
};
```

`7` - add resolver for uploading mutation:

```ts
import fs from "fs";
import { finished } from "stream";

const guitarResolvers: Resolvers = {
  Mutation: {
    // @ts-ignore
    singleUpload: async (parent, { file }) => {
      console.log({ singleUpload_file: file });
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.

      // See https://nodejs.org/api/stream.html#stream_readable_streams

      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the

      // local-file-output.txt in the current working directory on EACH upload.

      const out = fs.createWriteStream("local-file-output.txt"); // it will CREATE *.txt FILE WITH local-file-output NAME AND PUT INTO IT THE CONTENT TOF THE PASSED FILE

      stream.pipe(out);

      await finished(out, (e) => {
        console.log({ e });
      });

      return { filename, mimetype, encoding };
    },
  },
};
```

`8` - handle error with `GraphQLUpload`

But when you run the server wia `yarn dev` you will see an error:

```powershell
$ yarn dev
yarn run v1.22.4
$ ts-node-dev -r tsconfig-paths/register src/index.ts
[INFO] 15:48:45 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 5.0.4)
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: D:\folder-for-my-projekt\node_modules\graphql-upload\GraphQLUpload.mjs
    at new NodeError (internal/errors.js:322:7)
    at Module.load (internal/modules/cjs/loader.js:948:11)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:101:18)
    at Object.<anonymous> (D:\folder-for-my-projekt\src\features\guitars\guitar.resolvers.ts:16:23)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Module._compile (D:\folder-for-my-projekt\node_modules\source-map-support\source-map-support.js:568:25)
    at Module.m._compile (C:\Users\YourUserName\AppData\Local\Temp\ts-node-dev-hook-8011003150632023.js:69:33)
    at Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
[ERROR] 15:48:49 Error: Must use import to load ES Module: D:\folder-for-my-projekt\node_modules\graphql-upload\GraphQLUpload.mjs

```

To overcome this, copy all files (`GrpahQLUpload.mjs`, also `Upload.mjs` together with `processRequest.mjs`, `ignoreStream.mjs`, `GRAPHQL_MULTIPART_REQUEST_SPEC_URL.mjs` and `GraphqlUploadExpress.mjs` becasue GrpahQLUpload imports them) from the installed package `graphql-upload` and paste them in your project into some folder like `src/upload` or `src/lib/graphql-upload`, change the newly copied files to `*.ts` files and resolves problems with any types.

When done, use GraphlQlUpload.ts in resolver map:

```ts
import GraphQLUploadTS from "lib/graphql-upload/GraphQLUpload";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const GraphQLUpload = require("graphql-upload/GraphQLUpload.mjs");

const guitarResolvers: Resolvers = {
  Upload: GraphQLUploadTS, // add resolver for custom scalar: Upload
  // Upload: GraphQLUpload,
};
```

now when you run the project you will get error:

```powershell
$ yarn dev
yarn run v1.22.4
$ ts-node-dev -r tsconfig-paths/register src/index.ts
[INFO] 16:33:59 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 5.0.4)
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: D:\folder-for-my-projekt\node_modules\graphql-upload\graphqlUploadExpress.mjs

    at new NodeError (internal/errors.js:322:7)
    at Module.load (internal/modules/cjs/loader.js:948:11)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:101:18)
    at Object.<anonymous> (D:\folder-for-my-projekt\src\index.ts:18:30)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Module._compile (D:\folder-for-my-projekt\node_modules\source-map-support\source-map-support.js:568:25)
    at Module.m._compile (C:\Users\YourUserName\AppData\Local\Temp\ts-node-dev-hook-5057839896387752.js:69:33)
    at Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
[ERROR] 16:34:04 Error: Must use import to load ES Module: D:\folder-for-my-projekt\node_modules\graphql-upload\graphqlUploadExpress.mjs

```

`9` - handle error with `graphqlUploadExpress`:

instead of using `graphqlUploadExpress` from package `graphql-upload` you can use your newly created ts file in index.ts:

```ts
// index.ts

import graphqlUploadExpressTS from "lib/graphql-upload/graphqlUploadExpress";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.mjs");

app.use(graphqlUploadExpressTS());
// app.use(graphqlUploadExpress());
```

`10` - resolve error with `fs-capacitor`:

if you now run application you will get error:

```powershell

$ yarn dev
yarn run v1.22.4
$ ts-node-dev -r tsconfig-paths/register src/index.ts
[INFO] 16:37:42 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 5.0.4)
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: D:\folder-for-my-projekt\node_modules\fs-capacitor\dist\index.js
require() of ES modules is not supported.
require() of D:\folder-for-my-projekt\node_modules\fs-capacitor\dist\index.js from D:\folder-for-my-projekt\src\lib\graphql-upload\proce
ssRequest.ts is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that
package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from D:\MY-GRAPHQL-SHOP-MAGISTERKA\serve
r2\node_modules\fs-capacitor\package.json.

    at new NodeError (internal/errors.js:322:7)
    at Module._extensions..js (internal/modules/cjs/loader.js:1102:13)
    at require.extensions..jsx.require.extensions..js (C:\Users\YourUserName\AppData\Local\Temp\ts-node-dev-hook-8840467670303365.js:114:20)
    at Object.nodeDevHook [as .js] (D:\folder-for-my-projekt\node_modules\ts-node-dev\lib\hook.js:63:13)
    at Module.load (internal/modules/cjs/loader.js:950:32)
    at Function.Module._load (internal/modules/cjs/loader.js:790:12)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:101:18)
    at Object.<anonymous> (D:\folder-for-my-projekt\src\lib\graphql-upload\processRequest.ts:4:1)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
[ERROR] 16:37:48 Error: Must use import to load ES Module: D:\folder-for-my-projekt\node_modules\fs-capacitor\dist\index.js
require() of ES modules is not supported.
require() of D:\folder-for-my-projekt\node_modules\fs-capacitor\dist\index.js from D:\folder-for-my-projekt\src\lib\graphql-upload\proce

ssRequest.ts is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that
package scope as ES modules.
Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from D:\MY-GRAPHQL-SHOP-MAGISTERKA\serve

r2\node_modules\fs-capacitor\package.json.


```

so to overcome this:

- copy the package `fs-capacitor` from `node_modules` into some folder in your project like `src/upload` or `src/lib`,
- update import to this package in `src/lib/graphql-upload/processRequest.ts` file as it uses the original package, instead use the newly copied one
- in this newly copied `fs-capacitor` package replace value for `type` in its `package.json` file to the same type as your project has, for example to `"type": "commonjs"`

It should work at this point.

> At this point you've copied all files form `graphql-upload` library so there's no longer need to have it in dependencies so you can remove it. If you do so, add `object-path` package beacuse it was not copied by you and the `processRequest.ts` file uses it so without adding object-path as yur dependency you would see an error:

```powershell

Error: Cannot find module 'object-path'
Require stack:
- D:\folder-for-my-projekt\src\lib\graphql-upload\processRequest.ts
- D:\folder-for-my-projekt\src\lib\graphql-upload\graphqlUploadExpress.ts
- D:\folder-for-my-projekt\src\index.ts
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:902:15)
    at Function.Module._resolveFilename (D:\folder-for-my-projekt\node_modules\tsconfig-paths\src\register.ts:90:36)
    at Function.Module._load (internal/modules/cjs/loader.js:746:27)
    at Module.require (internal/modules/cjs/loader.js:974:19)
    at require (internal/modules/cjs/helpers.js:101:18)
    at Object.<anonymous> (D:\folder-for-my-projekt\src\lib\graphql-upload\processRequest.ts:7:1)
    at Module._compile (internal/modules/cjs/loader.js:1085:14)
    at Module._compile (D:\folder-for-my-projekt\node_modules\source-map-support\source-map-support.js:568:25)
    at Module.m._compile (C:\Users\YourUserName\AppData\Local\Temp\ts-node-dev-hook-03864754668477555.js:69:33)
    at Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
[ERROR] 17:28:02 Error: Cannot find module 'object-path'
```

If you want, you can also change the copied `fs-capacitor` library into TypeScript. If you do so, then add `@ts-nocheck` comment at the top of its `index.ts` file and also in `processRequest.ts` update the import for `WriteStream` to `import { WriteStream } from "./fs-capacitor/dist";`

_below code is optional to do and probably you don't have to do it_

Now you can run the server and according to the schema described in `3` you can run add `singleUplaod` mutation and add file by clicking `+ Add files` button and select file but when hit button to fire the mutation you MAY (but may not) see the following error:

```json
{
  "data": {},
  "errors": [
    {
      "message": "Variable \"$file\" of required type \"Upload!\" was not provided."
    }
  ]
}
```

It probably is because in your mutation in grpahql studio/playground you forgot the `!` sign in the mutation but if the error persists you can to remove `!` sign in schema to indicate that `file` is optional (in fact you will upload the file but just the file will be trated differently when passing is as file and when passing some regular data under they key `file`):

```graphql
type Mutation {
  singleUpload(file: Upload): File! # just change `file: Upload!` to `file: Upload`
}
```

now you can regenerate types and it will work and you can get that file in the following way:

```ts
const fileToUse = await file;
console.log({ awaiteed_file: fileToUse });

const resolvers = {
  Mutation: {
    singleUpload: async (parent, args) => {
      const fileToUse = await args.file; // await for file to get its data
      console.log({ awaiteed_file: fileToUse });
    },
  },
};
```

---

**Multiple files**

If you want to pass multiple files you can update the mutation to:

```graphql
type Mutation {
  singleUpload(file: [Upload]!): File!
}
```

run `codegen` script to generate typescript types and then in resolver `file` will be in fact an array of files:

```ts
const resolvers = {
  Mutation: {
    Mutation: {
      // @ts-ignore
      singleUpload: async (parent, args) => {
        const files = args.file; // file will be an array of files

        const fileToUse = await files;
        console.log({ awaiteed_file: fileToUse }); // it will await for 1st item and will console: { awaiteed_file: [ Promise { [Object] }, Promise { <pending> } ] }

        const { createReadStream, filename, mimetype, encoding } =
          await files[0]; // also await just for 1st file

        const allFiles = await Promise.all([...files]); // await for all files, it will console the fllowing:
        // {
        //   allFiles: [
        //   {
        //     filename: 'Przechwytywanie.JPG',
        //     mimetype: 'application/octet-stream',
        //     encoding: '7bit',
        //     createReadStream: [Function: createReadStream]
        //   },
        //   {
        //     filename: 'BezTytulu.JPG',
        //     mimetype: 'application/octet-stream',
        //     encoding: '7bit',
        //     createReadStream: [Function: createReadStream]
        //    }
        //   ]
        // }

        // you can for example return joined file names under the `filename` key or just create `names` key
        return {
          filename: allFiles.reduce(
            (acc, curr) =>
              acc === "" ? `${curr.filename}` : `${acc}, ${curr.filename}`,
            ""
          ),
          mimetype,
          encoding,
        };
      },
    },
  },
};
```

# FileUpload via `graphql-upload-minimal`:

You can use different library called `graphql-upload-minimal` which is based on the `graphql-upload` one but has some improvements, more [here](https://www.npmjs.com/package/graphql-upload-minimal)

`1` - install the package via `yarn add graphql-upload-minimal`

`2` - create schema:

```graphql
scalar Upload
input DocumentUploadInput {
  docType: String!
  file: Upload!
}

type SuccessResult {
  success: Boolean!
  message: String
}
type Mutations {
  uploadDocuments(docs: [DocumentUploadInput!]!): SuccessResult
}
```

Then follow the instruction, you may also need to copy the library folder and tranform it into `*.ts` files. I tried to use this library but I couldn't make it work.
