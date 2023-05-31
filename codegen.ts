import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "http://localhost:4000", // it will work of course
  // schema: "./src/features/auth/auth.schema.graphql", // use if you want to have whole schema in one single file
  schema: [
    "./src/common/schema.common.graphql",
    "./src/features/auth/auth.schema.graphql",
    "./src/features/guitars/filters/guitarFilters.schema.graphql",
    "./src/features/guitars/guitar.schema.graphql",
  ],
  // schema: "./src/schema-graphql.ts", // it does not work?
  // schema: [
  //   "./src/common.graphql",
  //   "./src/mutation.graphql",
  //   "./src/query.graphql",
  //
  //   "./src/feature1.graphql",
  //   "./src/feature2.graphql",
  //   "./src/feature3.graphql",
  // ], // it works
  // documents: "./src/schema-graphql.ts", // it does not work?
  // documents: "./schema.importer.ts", // // it does not work?

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
