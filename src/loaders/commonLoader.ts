import DataLoader from "dataloader";
import { Model } from "mongoose";

const commonLoader = <Return>(
  model: Model<any>,
  loadedItemsName?: string,
  parentsOfLoadedItems?: string
) =>
  new DataLoader<string, Return>(async (ids) => {
    const loadedItems = await model
      .where("_id")
      .in([...ids])
      .exec();

    const fieldsToConsole = loadedItemsName || "availabilities";
    const parentsToConsole = parentsOfLoadedItems || "guitars";

    // eslint-disable-next-line no-console
    console.log(
      `SELECT different ${fieldsToConsole} of ids: [${ids}] for ${parentsToConsole}`
    );

    return loadedItems as Return[];
  });

export default commonLoader;
