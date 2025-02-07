import express from 'express';
import { AppEnvs } from '@Shared/infrastructure/environments/system-environments.config';

const main = async () => {
  const app = express();
  app.get('/work');
  app.listen(AppEnvs.REST_PORT, () => {
    console.log(`Listening on port ${AppEnvs.REST_PORT}`);
  });
};

main().then();
