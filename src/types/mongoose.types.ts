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
