import { Document } from "mongoose";

export interface MongooseAddons {
  /**
   * @example 0
   */
  __v: number;
}

export interface MongooseAddonsWithTimestamps extends MongooseAddons {
  /**
   * @example 2023-05-30T11:38:05.919Z
   */
  createdAt: Date;
  /**
   * @example 2023-05-30T11:38:05.919Z
   */
  updatedAt: Date;
}

/**
 * Interface you can use together with any model interface to force _id to be required.
 * @example return data as M & MWithId
 */
export interface MWithId {
  _id: Exclude<Document["_id"], undefined>;
}
