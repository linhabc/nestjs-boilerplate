import { config } from 'dotenv';
config({ path: `./environment/.${process.env.NODE_ENV}.env` });

export default () => ({
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});
