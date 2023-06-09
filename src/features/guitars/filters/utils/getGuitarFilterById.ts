import GuitarFilterModel from "../GuitarFilter.model";
import getEntityById from "utils/db/getEntityById";

const getGuitarFilterById = (id: string) =>
  getEntityById(id, GuitarFilterModel, "filtru gitary");

export default getGuitarFilterById;
