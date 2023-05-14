import { join } from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

const authSchema = join(__dirname, "./features/auth/auth.schema.graphql");

const typeDefs = loadSchemaSync([authSchema], {
  loaders: [new GraphQLFileLoader()],
});

export default typeDefs;
