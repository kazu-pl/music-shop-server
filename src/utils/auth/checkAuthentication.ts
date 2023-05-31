import { DecodedUser } from "types/jwt.types";
import { GraphQLError } from "graphql";
import AUTH_MESSAGES from "constants/AUTH_MESSAGES";

const checkAuthentication = (
  user: DecodedUser | null
  // /**
  //  * NOT IMPLEMENTED YET
  //  */
  // throwWhenUserIs?: "authenticated" | "unauthenticated"
) => {
  if (!user) {
    throw new GraphQLError(AUTH_MESSAGES.UNAUTHENTICATED, {
      extensions: {
        code: AUTH_MESSAGES.UNAUTHENTICATED,
        // http: { status: 401 }, // if you set status: 401 here it will be the status of HTTP response and client when facing that code will thrown an unexpected error so do not set 401 here
      },
    });
  }
};

export default checkAuthentication;
