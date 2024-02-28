import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';
import { GeoJSON } from 'geojson';
import User from './users';

interface IRegion extends Document {
  name: string;
  region: GeoJSON;
  created_by: Schema.Types.ObjectId;
}

const RegionSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    region: { type: Object, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: User, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRegion>('Region', RegionSchema);
