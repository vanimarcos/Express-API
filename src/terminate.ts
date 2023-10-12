import { Server } from 'http';
import logger from './utils/logger';
import { loggerDesc } from './utils/loggerDesc';

function terminate(
  server: Server,
  options = { coredump: false, timeout: 500 },
) {
  const exit = (code: any) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string) => (err: Error) => {
    logger.error({
      label: loggerDesc.error.default,
      message: `${code}: ${reason}: ${err}`,
    });

    if (err && err instanceof Error) {
      logger.error({
        label: loggerDesc.error.process,
        message: ` ${code}: ${err.message}: ${reason}`,
      });
    }

    server.close(exit);
    setTimeout(exit, options.timeout).unref();
  };
}

export default terminate;
