import express from 'express';
import router from '../routes';

import mongoose from 'mongoose';
import { url } from '../config/config';

const server = express();

mongoose
  .connect(url, {})
  .then(result => {
    console.log('Connection to MongoDB!');
  })
  .catch(error => {
    console.log('Error on connecting MongoDB::', error.message, error);
  });

server.use(express.json());
server.use(router);

export { server };
