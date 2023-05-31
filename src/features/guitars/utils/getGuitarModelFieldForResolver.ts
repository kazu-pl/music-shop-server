import { Guitar } from "types/graphql.types";
import getGuitarFilterById from "../filters/utils/getGuitarFilterById";

const getGuitarModelFieldForResolver = async (
  parent: Guitar,
  keyToConsole: keyof Guitar
) => {
  // eslint-disable-next-line no-console
  console.log(
    `SELECT "${keyToConsole}" field as filter for Guitar of Id: ${parent._id}`
  );

  const id = parent[keyToConsole] as unknown as string; // this field, for example `availability` will be the id of the real filter because in getGuitars resolver I return `availability` field from result that is in fact availability id kept in Guitar DB model
  const result = await getGuitarFilterById(id);

  return result;
};

export default getGuitarModelFieldForResolver;
