import UserModel, { User } from "features/auth/models/User.model";
import mongoose from "mongoose";

UserModel;
type UserInput =
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (mongoose.Document<unknown, {}, User> &
      Omit<
        User & {
          _id: mongoose.Types.ObjectId;
        },
        never
      >)
  | null;

/**
 * @returns index of the item or -1 if there's no any item with that `id` on the `user` model in checkout
 */
const findItemIndexOnCheckoutList = (id: string, user: UserInput) => {
  if (!user) return -1;
  if (!user.data) return -1;
  return (user.data.checkout || []).findIndex(
    (itemInCheckout) => itemInCheckout.id === id
  );
};

export default findItemIndexOnCheckoutList;
