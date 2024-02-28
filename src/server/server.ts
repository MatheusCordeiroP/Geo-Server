import express from 'express';
import router from '../routes';
import init from '../database';

const server = express();

async () => {
  await init;
  console.log('Database connected.');
};

server.use(express.json());
server.use(router);

export { server };
