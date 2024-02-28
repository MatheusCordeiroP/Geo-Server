import mongoose, { Schema } from 'mongoose';
import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  address: string;
  coordinates: Array<number>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { type: Array<number>, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
