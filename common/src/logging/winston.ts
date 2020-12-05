/** @format */

import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf, prettyPrint } = format;

const winstonConfig = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: false,
  },
};

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}][${level}]: ${message}`;
});

const consoleTransport = new transports.Console(winstonConfig.console);

const logger = createLogger({
  format: combine(timestamp(), prettyPrint(), myFormat),
  transports: [consoleTransport],
});

export class LoggerStream {
  write(message: string) {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

class Winston {
  error(msg: any) {
    logger.error(JSON.stringify(msg));
  }

  warn(msg: any) {
    logger.warn(JSON.stringify(msg));
  }

  info(msg: any) {
    logger.info(JSON.stringify(msg));
  }

  http(msg: any) {
    logger.http(JSON.stringify(msg));
  }

  verbose(msg: any) {
    logger.verbose(JSON.stringify(msg));
  }

  debug(msg: any) {
    logger.debug(JSON.stringify(msg));
  }

  testSetup() {
    logger.transports.forEach((t) => (t.silent = true));
  }
}

export const winston = new Winston();
