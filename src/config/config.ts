import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGODB_USER || '';
const MONGO_PASSWORD = process.env.MONGODB_PASSWORD || '';
const MONGO_HOST = process.env.MONGODB_HOST || '';
const MONGO_PORT = process.env.MONGODB_PORT || '';
const MONGO_DB = process.env.MONGODB_DB || '';

export const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
