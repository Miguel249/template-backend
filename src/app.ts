import 'dotenv/config';
import { ServerConfig } from '@Config/server/server.config';

const main = async () => {
  new ServerConfig().initServer();
};

main().then();
