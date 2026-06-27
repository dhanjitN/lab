import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const env = {
  DB_NAME: process.env.DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
  ADMIN_SECRET: process.env.ADMIN_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  DOMAIN_URL: process.env.DOMAIN_URL,
  PROJECT_URL: process.env.PROJECT_URL,
};

export default env;
