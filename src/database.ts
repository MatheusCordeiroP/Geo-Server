import mongoose from 'mongoose';
import { url } from './config/config';

const init = async () => {
  return await mongoose.connect(url, {});
};

export default init();
