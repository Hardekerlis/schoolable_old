/** @format */
// @ts-nocheck
import { createLogger, format, transports, config } from 'winston';
const { combine, splat, timestamp, printf } = format;

const myFormat = printf((log) => {
  const { level, message, timestamp, ...metadata } = log;

  let msg = `${timestamp}[${level}]: ${message}`;

  if (metadata) {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const appRoot = process.cwd();

const winston = createLogger({
  level: config.syslog.levels,
  format: combine(format.colorize(), splat(), timestamp(), myFormat),
  transports: [
    new transports.Console({ level: 'debug' }),
    // new transports.File({
    //   filename: `${appRoot}/logs/app.log` /* config.get('app.logging.outputfile') */,
    //   level: 'debug',
    // }),
  ],
});

// winston.stream = {
//   write: (message, encoding) => {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     winston.info(message);
//   },
// };

export class LoggerStream {
  write(message: string) {
    winston.info(message.substring(0, message.lastIndexOf('\n')));
  }
}
