/* eslint-disable @typescript-eslint/no-explicit-any */
import COMMON_MESSAGES from "constants/COMMON_MESSAGES";

const getErrorMessage = (err: unknown | any) => {
  const error = err as any;

  const message =
    `_message` in error
      ? error._message
      : "message" in error
      ? error.message
      : COMMON_MESSAGES.AN_ERROR_OCCURED;

  return message;
};

export default getErrorMessage;
