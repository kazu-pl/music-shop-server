import dotenv from "dotenv";
dotenv.config();

export const MONGO_DB_URI = process.env.MONGO_DB_CONNECTION_STRING || "";

export const PORT = process.env.PORT || 4000;

export const ACCESS_TOKEN_EXPIRETIME_IN_SECONDS =
  Number(process.env.ACCESS_TOKEN_EXPIRETIME_IN_SECONDS) || 25;
export const REFRESH_TOKEN_EXPIRETIME_IN_SECONDS =
  Number(process.env.REFRESH_TOKEN_EXPIRETIME_IN_SECONDS) || 2592000;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const ADMIN_ACCOUNT_ID = process.env.ADMIN_ACCOUNT_ID || "";

export const ENABLE_GRAPHQL_STUDIO_FOR_SHOWCASE_IN_PROD =
  process.env.ENABLE_GRAPHQL_STUDIO_FOR_SHOWCASE_IN_PROD;
