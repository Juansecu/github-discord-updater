import { config, createLogger, format, Logger, transports } from 'winston';

const { colorize, combine, errors, label, printf, timestamp } = format;
const customFormat = printf(
  ({ level, message, label, timestamp }): string =>
    `${timestamp}     ${level} [${label}] ${message}`
);

export class ConsoleLogger {
  private constructor() {}

  public static getLogger(context: string): Logger {
    return createLogger({
      format: combine(
        colorize({
          all: true
        }),
        errors({ stack: false }),
        label({ label: context }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
      ),
      levels: config.cli.levels,
      transports: [new transports.Console()]
    });
  }
}
