# How to create `Anything` scalar in graphqL:

`1` - define scalar in graphql schema:

```graphql
# NOTE: The name here must match the name you specified in the `name` field of `GraphQLScalarType` constructor
scalar Anything

# the rest of your schema
```

`2` - create file like `GraphQLAnythingScalar.ts`:

```ts
// GraphQLAnythingScalar.ts

const { GraphQLScalarType, Kind } = require("graphql");

const Anything = new GraphQLScalarType({
  name: "Anything",
  description: "Any value.",
  parseValue: (value) => value,
  parseLiteral,
  serialize: (value) => value,
});

function parseLiteral(ast) {
  switch (ast.kind) {
    case Kind.BOOLEAN:
    case Kind.STRING:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return Number(ast.value);
    case Kind.LIST:
      return ast.values.map(parseLiteral);
    case Kind.OBJECT:
      return ast.fields.reduce((accumulator, field) => {
        accumulator[field.name.value] = parseLiteral(field.value);
        return accumulator;
      }, {});
    case Kind.NULL:
      return null;
    default:
      throw new Error(`Unexpected kind in parseLiteral: ${ast.kind}`);
  }
}

export default Anything;
```

`3` - generate graphql types via `yarn codegen` script and add resolver for `Anything` scalar:

```ts
import Anything from "./GraphQLAnythingScalar";

const resolvers = {
  ...// The property name here must match the name you specified in the constructor
  Anything,
};
```

`4` - now you can use it like this:

```graphql
type SomeResponse {
  data: Anything
}
```

# How to use `expressMiddleware` to enable custom `CORS` policy:

```ts
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

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  status400ForVariableCoercionErrors: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

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
```

Keep in mind that using `startStandaloneServer` won't allow you to customize CORS as it uses `*` by default as origin and the startup config looks like this:

```ts
startStandaloneServer(server, {
  listen: { port: +PORT },
  context,
})
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at: ${url}`);

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
```

# How to get rid of error `Do not use "@ts-ignore" because it alters compilation errors.` and be able to use `@ts-ignore` comment:

This error is related to the bellow comments:

```ts
// @ts-expect-error
// @ts-ignore
// @ts-nocheck
// @ts-check
```

and to allow to use it you can override it via:

```json
{
  "rules": {
    "@typescript-eslint/ban-ts-comment": "error"
  }
}
```

found [here](https://typescript-eslint.io/rules/ban-ts-comment/)

# Error `Cannot return null for non-nullable field Mutation.addGuitarProducent.`

If you have that error it means you used some mutation (you can use it because it exists in schema) but you forgot to add that its resolver to resolvers map.

```ts
// src/resolvers.ts
import { Resolvers } from "types/graphql.types";
import authResolvers from "features/auth/auth.resolvers";

const resolvers: Resolvers = {
  ...authResolvers,

  Query: {
    ...authResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    // ADD MISSING RESOLVERS HERE
  },
};

export default resolvers;
```

# How to make JWT auth and protect some actions and not all:

You can return context object in context and verify jwt token in try/catch so when something bad happens (like token was not provided or expired or is incorrect or whatever) the `jwt.verify()` function will thrown an error which can be catched in `catch` block and in that case you can return `null` as value of `user` key of context. Later on in every protected action you can check if the `user` object exists on context and if not - it means something bad happend and you can thrown an GraphQLError.

Example in context:

```ts
import { DecodedUser } from "types/jwt.types";
import { StartStandaloneServerOptions } from "@apollo/server/standalone";
import { ACCESS_TOKEN_SECRET } from "constants/env";
import jwt from "jsonwebtoken";
export interface Context {
  user: DecodedUser | null;
}

const context: Exclude<
  StartStandaloneServerOptions<Context>["context"],
  undefined
> = async ({
  req,
  // res,
}) => {
  try {
    const accessToken = (req.headers.authorization || "").split(" ")[1]; // Split into ["Bearer", "json.web.token"] and take the actuall token

    const user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as DecodedUser;

    return { user } as Context; // return correctly user because token exists, is valid, is NOT expired
  } catch (err) {
    // if token was not provided, expired, malformed, or has incorrect format then jwt.verify() will thrown an error which will be catched here in catch so catch will return null as `user` field so if any route is protected and does not receive any token it may throw an GraphQlError("UNAUTHENTICATED"); because no token means no token, token expired, invalid token etc
    return {
      user: null,
    } as Context;
  }
};

export default context;
```

And then in any protected mutation or query:

```ts

    someProtectedMutation(parent, args, context, info) {
      const { age } = args.data;
      console.log({ someProtectedMutation_context: context });

      if (!context.user) throw new GraphQLError(AUTH_MESSAGES.UNAUTHENTICATED); // if `user` does not exist on `contxt` it means that something bad happened and token does not exist, is invalid or something like that so return unauthorized

      return {
        message: "",
      };
    },
```

You can also add some info in schema that the action is protected like so:

```graphql
type Mutation {
  """
  **PROTECTED**
  """
  someProtectedMutation(data: ProtectedInput!): SuccessfulReqMsg!
}
```

# How to type Context when generating types:

Just use `contextType` property and point to a file with exported context type. This path has to be based on the destination place from which generated file will look for context type.

if using `yml` file:

```yml
schema: "./src/features/auth/auth.schema.graphql"

generates:
  ./src/types/graphql.types.ts:
    plugins:
      - "typescript"
      - "typescript-resolvers"
      - "typescript-document-nodes"

    config:
      useIndexSignature: true

      # Below link points to file context and exported interface Context AFTER BEING GENERATED (so it's path from the destination dir which is `src/types/graphql.types.ts`)
      contextType: "../context#Context"
```

If using `ts` file:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/features/auth/auth.schema.graphql",

  generates: {
    "src/types/graphql.types.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
      config: {
        contextType: "../context#Context",
      },
    },
  },
};

export default config;
```

and then poin to that file in script from `package.json` that generates types:

```json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.ts" // if using `yml` file it would be `codegen.yml` or `./src/codegen.yml` depending on its path
  }
}
```

# How to copy .graphql files when building project with `tsc` compilator

It's impossible to copy non-typescript files when buildng project with `tsc` compilator as it copies only ts files. To copy .graphql files we can use `copyfile` package

`1` - install package with `yarn add -D copyfiles`
`2` - add `copy-file` script to your `package.json` scripts:

```json
{
  "scripts": {
    "copy-files": "copyfiles -u 1 src/**/*.graphql build/src"
  }
}
```

`3` - add `&& yarn copy-files` script part to your `build` script:

```json
{
  "scripts": {
    "build": "rm -rf build && tsc && yarn copy-files" // added "&& yarn copy-files"
  }
}
```

copyfiles package with parameters will copy all files to another folder with the same path.

Found [here](https://vccolombo.github.io/blog/tsc-how-to-copy-non-typescript-files-when-building/#copyfiles)

# Error `Package subpath './dist/esm/errors' is not defined by "exports"`

if you have error like this:

```

$ yarn dev
yarn run v1.22.4
$ ts-node-dev -r tsconfig-paths/register src/index.ts
[INFO] 14:54:13 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 5.0.4)
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './dist/esm/errors' is not defined by "exports" in Some\path\on\my\computer\server — kopia jak juz nie dzial

alo\node_modules\@apollo\server\package.json
    at new NodeError (internal/errors.js:322:7)
    at throwExportsNotFound (internal/modules/esm/resolve.js:332:9)
    at packageExportsResolve (internal/modules/esm/resolve.js:565:3)
    at resolveExports (internal/modules/cjs/loader.js:478:36)
    at Function.Module._findPath (internal/modules/cjs/loader.js:518:31)
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:917:27)
    at Function.Module._resolveFilename (Some\path\on\my\computer\server — kopia jak juz nie dzialalo\node_modules\tsconfig-paths\src\register.ts:90:36)
    at Function.Module._load (internal/modules/cjs/loader.js:774:27)
    at Module.require (internal/modules/cjs/loader.js:1003:19)
    at require (internal/modules/cjs/helpers.js:107:18)
[ERROR] 14:54:17 Error: Package subpath './dist/esm/errors' is not defined by "exports" in Some\path\on\my\computer\server — kopia jak juz nie dzialalo\node_module
s\@apollo\server\package.json

```

then you probably import `ApolloServerErrorCode` from `@apollo/server/dist/esm/errors` but you SHOULD IMPORT IT FROM `@apollo/server/errors` so just change url and it will work

# How to add highlighing and autocompletion in graphql files:

`1` - install extension called `GraphQL: Language Feature Support`

<!-- next steps are taken from the GraphQL: Language Feature Support vsc extension doc so you can just open the extension and follow -->

`2` - create config file `.graphqlrc.yml`. Other available extensions [here](https://the-guild.dev/graphql/config/docs/user/usage)

`3` - paste below content:

```yml
schema: "./schema.graphql"
documents: "src/**/*.{graphql,gql,js,ts,jsx,tsx}"
```

or you can pass something like this:

```yml
# it will work for sure, just look for every graphQL file and be able to use types from them into each other

schema: "./src/**/*.{graphql,gql}"
```

And to check if it works you can look at the bottom-right corner of VSC and look for graphQL icon, click it and it will open `GraphQL Languageg Server` which, if work, will give an output like this:

```
13.05.2023, 15:41:09 [3] (pid: 16908) graphql-language-service-usage-logs: {"type":"usage","messageType":"initialize"}
```

```graphql


type Query {
  getBooks: [Book]
  getAnimals: [] # place cursor inside of [] or right after it, click CTRL + SPACE and it should start autocompleting for you
}


```

# Writing schema in _.graphql or in _.ts single file or multiple files and generating types based on that

You can write whole schema, queries and mutations in one single file or split it into chunks. If writting in one file you can write it in graphql file and then import it in `index.ts` to pass it to the Apollo Server. To do so, import it like this:

**Schema in single .graphql file**:

```ts
import { readFileSync } from "fs";

const typeDefsFromGraphQLFile = readFileSync(
  join(__dirname, "./schema.graphql"),
  {
    encoding: "utf8",
  }
);

const server = new ApolloServer<Context>({
  typeDefs: typeDefsFromGraphQLFile,
  resolvers,
});
```

and then in `codegen.ts`:

```ts
// codegen.ts

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.graphql",
  generates: {
    "src/types/graphql.types.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
  },
};

export default config;
```

**Schema in single ts file**:

You can write whole schema in single `*.ts` file like that:

<!-- // just use template literals and add "`#graphql" to get graphql sytax -->

```ts
const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  type Tokens {
    accessToken: String!
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
    login(loginCredentials: LoginCredentialsInput!): Tokens!
  }

`;
```

Then you can pass it to graphql client:

```ts
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});
```

For some reason passing `*.ts` file to `codegen.ts` won't work so to be able to generate types the best idea is to just run the server and pass it's url as schema url:

```ts
// codegen.ts

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000", // link to your server
};

export default config;
```

**Writting schema in multiple graphql files `(PREFFERED)`**

you can write types, inputs, interfaces, queries, mutations and so on in multiple files and then join it together and pass to apollo server and to `codegen.ts` file:

```ts
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

const commonSchema = join(__dirname, "./common.graphql");
const queryScheme = join(__dirname, "./query.graphql");
const mutationScheme = join(__dirname, "./mutation.graphql");

// you join graphQL files here, in *.ts file because it's probably not possible to load one graphQL file into another as this feature is not supported
const schemaJoined = loadSchemaSync(
  [commonSchema, queryScheme, mutationScheme],
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const server = new ApolloServer<Context>({
  typeDefs: schemaJoined,
  resolvers,
});
```

and in `codegen.ts`:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,

  // load the same multiple files AGAIN
  schema: [
    "./src/common.graphql",
    "./src/mutation.graphql",
    "./src/query.graphql",
  ],

  // schema: "http://localhost:4000", // OR - the simplest solution - just run server and pass its url

  // schema: "./src/schema.graphql", // if writting graphQL code in multiple files it's impossible to import then in another graphQL files because it's not suported so you have to join then in *.ts files (like shown above)

  generates: {
    "src/types/graphql.types.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
  },
};

export default config;
```

`PREFFERED:`
Because it's possible to split `Queries` and `Mutations` in graphQL like this:

```graphql
type Book {
  title: String
  author: String
}

type Query {
  books: [Book]
}

type Query {
  getBooks: [Book]
}

type Mutation {
  login(loginCredentials: LoginCredentialsInput!): Tokens!
}

type Mutation {
  register(registerCredentials: RegisterCredentialsInput!): SuccessfulReqMsg!
}
```

you can create seraparate graphql files for every feature (and that file can include types, queries, mutations) and then join it for Apollo Client via `loadSchemaSync` and either pass those multiple files into `codegen.ts` or pass server url like this:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,

  schema: [
    "./src/feature1.graphql",
    "./src/feature2.graphql",
    "./src/feature3.graphql",
  ],
  // schema: "http://localhost:4000", // OR - the simplest solution - just run server and pass its url
};

export default config;
```

**Writting schema in multiple ts files**

You can write your schema in multiple ts files and then join them together into one file:

```ts
import common from "common.graphqlTS";
import query from "query.graphqlTS";
import mutation from "mutation.graphqlTS";

export const schema = `#graphql
  ${common}
  ${query}
  ${mutation}
`;
```

You can then just pass it to apollo server like:

```ts
const server = new ApolloServer<Context>({
  typeDefs: schema,
  resolvers,
});
```

But whne trying to pass that `ts` file to `codegen.ts` lie this:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/schema-graphql.ts",
};

export default config;
```

it will thrown error:

```bash
$ yarn codegen
yarn run v1.22.4
$ graphql-codegen --config codegen.ts
✔ Parse Configuration
⚠ Generate outputs
  ❯ Generate to src/types/graphql.types.ts
    ✖
            Failed to load schema from ./src/schema-graphql.ts:

            Unable to load from file "Some\path\on\my\computer/server/src/schema-graphql.ts": D:…
    ◼ Load GraphQL documents
    ◼ Generate
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

```

so it's best to just run server and pass its url to `codegen.ts` like this:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000",
};

export default config;
```

# How to generate types for resolvers, queries other types for server:

`1` - install packages: `npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers`

`2` - generate file that will generate types by `npx graphql-code-generator init` and answer the questions. Some question will ask about file name, you can add its extension by typing `codegen.ts` or `codegen.yml`. Example of those files:

```ts
// codegen.ts

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000", // if generating types from running server (useful when writing schema in *ts file/files)

  // schema: "./src/schema.graphql", // if using graphQL file

  // schema: [ // if using multiple graphQL files
  //   "./src/common.graphql",
  //   "./src/mutation.graphql",
  //   "./src/query.graphql",
  // ],
  generates: {
    "src/types/graphql.types.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
      config: {
        // you can also read about it in the `How to type Context when generating types` section
        contextType: "../context#Context", // link to file with Context interface. This link is used AFTER code is generated to serch for Context type
      },
    },
  },
};

export default config;
```

OR

you can create it manually, for example create `codegen.yml` and paste:

```yml
# codegen.yml

# This configuration file tells Graphql Code Generator how
# to generate types based on our schema.
schema: "./schema.graphql"
generates:
  # Specify where our generated types should live.
  ./src/types/resolvers-types.ts:
    plugins:
      - "typescript"
      - "typescript-resolvers"
    config:
      useIndexSignature: true

      contextType: "../context#Context" # you can also read about it in the `How to type Context when generating types` section
```

`3` - add script to `package.json` that will run `codegen` file which will generate types:

```json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.yml"
  }
}
```

if you want to generate schema with every `yarn dev` you can modify `dev` script:

```json
{
  "scripts": {
    "dev": "npm run codegen && ....(rest of yarn dev script)"
  }
}
```

Now by running `yarn generate` you will generate types for resolvers, queries, mutations and so on.

`4` - adding types for resolvers:

```ts
import { Resolvers } from "./types/resolvers-types";

export const resolvers: Resolvers = {};
```

or you can even import types for queries resolvers:

```ts
import { QueryResolvers } from "types/resolvers-types";

const queries: QueryResolvers = {
  Query: {
    // ...queries
  },
};

export default queries;
```

and for mutations:

```ts
import { MutationResolvers } from "types/resolvers-types";

// Use the generated `MutationResolvers` type
// to type check our mutations!
const mutations: MutationResolvers = {
  Mutation: {
    // ...mutations
  },
};

export default mutations;
```

**Adding Context Type**

Write interface for context:

```ts
// src.index.ts

export interface MyContext {
  dataSources: {
    books: Book[];
  };
}
```

```yml
# ...

config:
  useIndexSignature: true

  # Providing our context's interface ensures our

  # context's type is set for all of our resolvers.

  # Note, this file path starts from the location of the

  # file where you generate types.

  # (i.e., `/src/types/resolvers-types.ts` above)

  contextType: "../index#MyContext" # link to file and exported MyContext interface
```

And when you will `yarn generate` then resolvers (via type `Resolvers`) will have typed context argument (the last one) for resolvers

found [here](https://www.apollographql.com/docs/apollo-server/workflow/generate-types/)

# Error when trying to install codegen:

If you get error like this:

```
$ yarn add -D @graphql-codegen/cli
yarn add v1.22.4
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@2.3.2: The platform "win32" is incompatible with this module.
info "fsevents@2.3.2" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning "@graphql-codegen/cli > @graphql-tools/github-loader > @graphql-tools/graphql-tag-pluck > @babel/plugin-syntax-import-assertions@7.20.0" has unmet
peer dependency "@babel/core@^7.0.0-0".
[4/4] Building fresh packages...
[-/2] ⠈ waiting...
error Some\path\on\my\computer\server\node_modules\@parcel\watcher: Command failed.
Exit code: 1
Command: node-gyp-build
Arguments:
Directory: Some\path\on\my\computer\server\node_modules\@parcel\watcher
Output:
Some\path\on\my\computer\server\node_modules\@parcel\watcher>if not defined npm_config_node_gyp (node "D:\Program Files\nodejs\node_modules\npm\bin\no
de-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "" rebuild )
gyp info it worked if it ends with ok
gyp info using node-gyp@5.1.0
gyp info using node@14.18.2 | win32 | ia32
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
gyp ERR! find Python checking if "python" can be used
gyp ERR! find Python - "python" is not in PATH or produced an error
gyp ERR! find Python checking if "python2" can be used
gyp ERR! find Python - "python2" is not in PATH or produced an error
gyp ERR! find Python checking if "python3" can be used
gyp ERR! find Python - "python3" is not in PATH or produced an error
gyp ERR! find Python checking if the py launcher can be used to find Python 2
gyp ERR! find Python - "py.exe" is not in PATH or produced an error
gyp ERR! find Python checking if Python is C:\Python27\python.exe
gyp ERR! find Python - "C:\Python27\python.exe" could not be run
gyp ERR! find Python checking if Python is C:\Python37\python.exe
gyp ERR! find Python - "C:\Python37\python.exe" could not be run
gyp ERR! find Python
gyp ERR! find Python **********************************************************
gyp ERR! find Python You need to install the latest version of Python.
gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
gyp ERR! find Python you can try one of the following options:
gyp ERR! find Python - Use the switch --python="C:\Path\To\python.exe"
gyp ERR! find Python   (accepted by both node-gyp and npm)
gyp ERR! find Python - Set the environment variable PYTHON
gyp ERR! find Python - Set the npm configuration variable python:
gyp ERR! find Python   npm config set python "C:\Path\To\python.exe"
gyp ERR! find Python For more information consult the documentation at:
gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
gyp ERR! find Python **********************************************************
gyp ERR! find Python
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Python installation to use
gyp ERR! stack     at PythonFinder.fail (D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:307:47)
gyp ERR! stack     at PythonFinder.runChecks (D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:136:21)
gyp ERR! stack     at PythonFinder.<anonymous> (D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:225:16)
gyp ERR! stack     at PythonFinder.execFileCallback (D:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\find-python.js:271:16)
gyp ERR! stack     at exithandler (child_process.js:390:5)
gyp ERR! stack     at ChildProcess.errorhandler (child_process.js:402:5)
gyp ERR! stack     at ChildProcess.emit (events.js:400:28)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:280:12)
gyp ERR! stack     at onErrorNT (internal/child_process.js:469:16)
gyp ERR! stack     at processTicksAndRejections (internal/process/task_queues.js:82:21)
gyp ERR! System Windows_NT 10.0.19044
gyp ERR! command "D:\\Program Files\\nodejs\\node.exe" "D:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd Some\path\on\my\computer\server\node_modules\@parcel\watcher
gyp ERR! node -v v14.18.2
gyp ERR! node-gyp -v v5.1.0
gyp ERR! not ok

```

then you have to visit the `https://github.com/nodejs/node-gyp#installation` link, install python `https://apps.microsoft.com/store/detail/python-310/9PJPW5LDXLZ5?hl=en-us&gl=us` and then add environmental variable to python.exe and call it PYTHON

# How I get this project building and running

options found [here](https://bobbyhadz.com/blog/typescript-uncaught-referenceerror-exports-is-not-defined#nodejs---referenceerror-exports-is-not-defined)
