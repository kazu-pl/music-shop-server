import { DecodedUser } from "types/jwt.types";
import { GraphQLError } from "graphql";
import AUTH_MESSAGES from "constants/AUTH_MESSAGES";
import { ADMIN_ACCOUNT_ID } from "constants/env";

const allowOnlyAdmin = (user: DecodedUser | null) => {
  if (user && user._id !== ADMIN_ACCOUNT_ID) {
    throw new GraphQLError(AUTH_MESSAGES.ONLY_ADMIN_ALLOWED, {
      extensions: {
        code: AUTH_MESSAGES.ONLY_ADMIN_ALLOWED,
        // http: { status: 401 }, // if you set status: 401 here it will be the status of HTTP response and client when facing that code will thrown an unexpected error so do not set 401 here
      },
    });
  }
};

export default allowOnlyAdmin;
