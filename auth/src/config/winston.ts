/** @format */

import { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf, prettyPrint, colorize } = format;

const winstonConfig = {
  console: {
    level: 'info',
    handleExceptions: true,
    json: true,
    colorize: false,
  },
};

const myFormat = printf(({ level, message, timestamp }) => {
  const tempObj = Object.assign({ timestamp: timestamp }, JSON.parse(message));

  const logObj = {
    [level]: tempObj,
  };

  return JSON.stringify(logObj);
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

interface Log {
  msg: string;
  statusCode: number;
}

export class Winston {
  error(msg: object) {
    winston.error(JSON.stringify(msg));
  }

  warn(msg: object) {
    winston.warn(JSON.stringify(msg));
  }

  info(msg: object) {
    winston.info(JSON.stringify(msg));
  }

  http(msg: object) {
    winston.http(JSON.stringify(msg));
  }

  verbose(msg: object) {
    winston.verbose(JSON.stringify(msg));
  }

  debug(msg: object) {
    winston.debug(JSON.stringify(msg));
  }
}
