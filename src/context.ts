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

    return { user } as Context;
  } catch (err) {
    // if token was not provided, expired, malformed, or has incorrect format then jwt.verify() will thrown an error which will be catched here in catch so catch will return null as `user` field so if any route is protected and does not receive any token it may throw an GraphQlError("UNAUTHENTICATED"); because no token means no token, token expired, invalid token etc
    return {
      user: null,
    } as Context;
  }
};

export default context;
