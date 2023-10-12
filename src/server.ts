import 'reflect-metadata';
import http, { Server } from 'http';
import https from 'https';
import app from './appBootstrapped';
import port from './port';
import certs from './utils/certs';
import { PRODUCTION } from './envNames';
import logger from './utils/logger';
import { loggerDesc } from './utils/loggerDesc';
import terminate from './terminate';

const httpServer: Server =
  process.env.NODE_ENV === PRODUCTION
    ? https.createServer(certs, app)
    : http.createServer(app);

httpServer.listen(port, () => {
  logger.info({
    label: loggerDesc.info.default,
    message: `The Sample API is running in port ${port} in ${process.env.NODE_ENV} mode!`,
  });
});

const exitHandler = terminate(httpServer, {
  coredump: false,
  timeout: 500,
});

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

export default httpServer;
