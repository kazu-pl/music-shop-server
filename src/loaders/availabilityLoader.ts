import DataLoader from "dataloader";
import GuitarFilterModel from "features/guitars/filters/GuitarFilter.model";
import { GuitarFilter } from "types/graphql.types";

const availabilityLoader = new DataLoader<string, GuitarFilter>(async (ids) => {
  const availabilities = await GuitarFilterModel.where("_id")
    .in([...ids])
    .exec();

  // eslint-disable-next-line no-console
  console.log(`SELECT different availabilities of ids: [${ids}] for guitars`);

  return availabilities;
});

export default availabilityLoader;
