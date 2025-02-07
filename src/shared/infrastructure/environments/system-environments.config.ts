import 'dotenv/config';
import { get } from 'env-var';
import { ISystemEnv } from '@Shared/domain/models/environment.model';

class SystemEnvs extends ISystemEnv {
  NODE_ENV = get('NODE_ENV').required().asString();
  REST_PORT = get('REST_PORT').required().asIntPositive();
  SECRET_KEY = get('SECRET_KEY').required().asString();
  SECRET_KEY_TOKEN = get('SECRET_KEY_TOKEN').required().asString();
}

export const AppEnvs = new SystemEnvs();