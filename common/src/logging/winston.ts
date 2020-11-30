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

const winston = createLogger({
  format: combine(timestamp(), prettyPrint(), myFormat),
  transports: [new transports.Console(winstonConfig.console)],
});

export class LoggerStream {
  write(message: string) {
    winston.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

export class Winston {
  error(msg: any) {
    winston.error(JSON.stringify(msg));
  }

  warn(msg: any) {
    winston.warn(JSON.stringify(msg));
  }

  info(msg: any) {
    winston.info(JSON.stringify(msg));
  }

  http(msg: any) {
    winston.http(JSON.stringify(msg));
  }

  verbose(msg: any) {
    winston.verbose(JSON.stringify(msg));
  }

  debug(msg: any) {
    winston.debug(JSON.stringify(msg));
  }
}
