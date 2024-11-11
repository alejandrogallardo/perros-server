import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  SERVER_PORT: number;
  API_PREFIX: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  STAGE: string;
}

const envsSchema = joi
  .object({
    SERVER_PORT: joi.number().required(),
    API_PREFIX: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    STAGE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  serverPort: envVars.SERVER_PORT,
  apiPrefix: envVars.API_PREFIX,
  dbUser: envVars.DB_USER,
  dbPass: envVars.DB_PASS,
  dbName: envVars.DB_NAME,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  stage: envVars.STAGE,
};
