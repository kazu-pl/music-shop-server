import { join } from "path";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

const commonSchema = join(__dirname, "./common/schema.common.graphql");
const authSchema = join(__dirname, "./features/auth/auth.schema.graphql");
const guitarFiltersSchema = join(
  __dirname,
  "./features/guitars/filters/guitarFilters.schema.graphql"
);

const typeDefs = loadSchemaSync(
  [commonSchema, authSchema, guitarFiltersSchema],
  {
    loaders: [new GraphQLFileLoader()],
  }
);

export default typeDefs;
