import PHOTOS_BUCKET_NAME from "constants/PHOTOS_BUCKET_NAME";
import mongoose from "mongoose";
import { File } from "types/file";

const storeFile = async (file: Promise<File>, bucketName?: string) => {
  const { filename, createReadStream, mimetype } = await file.then(
    (result: File) => result
  );

  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: bucketName || PHOTOS_BUCKET_NAME,
  });

  const uploadStream = bucket.openUploadStream(filename, {
    contentType: mimetype,
  });

  return new Promise<mongoose.mongo.BSON.ObjectId>((resolve, reject) => {
    createReadStream()
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        // uploadStream has not only `id` field but also `filename` of the uploaded file: uploadStream.filename
        resolve(uploadStream.id);
      });
  });
};

export default storeFile;
