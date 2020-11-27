/** @format */

import { createLogger, transports, format } from 'winston';
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;

const winstonConfig = {
  file: {
    level: 'info',
    filename: `${process.env.appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxSize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `{"${timestamp}": [${label}] ${level}: ${message}}`;
});

const winston = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    prettyPrint(),
    colorize(),
    myFormat,
  ),
  transports: [
    new transports.File(winstonConfig.file),
    new transports.Console(winstonConfig.console),
  ],
});

export class LoggerStream {
  write(message: string) {
    winston.info(message.substring(0, message.lastIndexOf('\n')));
  }
}
