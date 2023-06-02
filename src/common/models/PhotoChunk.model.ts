import mongoose, { Schema, Document } from "mongoose";
import PHOTOS_BUCKET_NAME from "constants/PHOTOS_BUCKET_NAME";

interface PhotoChunk extends Document {
  files_id: string;
  n: number;
  data: string;
}

const PhotoChunkSchema: Schema = new Schema({
  files_id: { type: Schema.Types.ObjectId, required: true },
  n: { type: Number, required: true },
  data: { type: Buffer, required: true },
});

export default mongoose.model<PhotoChunk>(
  `${PHOTOS_BUCKET_NAME}.chunk`,
  PhotoChunkSchema
);
