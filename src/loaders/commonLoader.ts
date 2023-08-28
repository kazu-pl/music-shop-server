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
      .in(ids as any[])
      // .in([...ids]) // it can be also make like this
      .exec();

    const fieldsToConsole = loadedItemsName || "availabilities";
    const parentsToConsole = parentsOfLoadedItems || "guitars";

    // eslint-disable-next-line no-console
    console.log(
      `SELECT different ${fieldsToConsole} of ids: [${ids}] for ${parentsToConsole}`
    );

    // return loadedItems as Return[]; // you can't just return loadedItems because API will probably return them in different order (the most efficient for the API) than the order of ids so you have to map the ids list and return the corresponding items like below

    return ids.map((id) =>
      loadedItems.find((loadedItem) => loadedItem._id.toHexString() === id)
    ) as Return[];
  });

export default commonLoader;
