/***************Import Winston */
import * as winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  format: winston.format.json({
    space: 4,
  }),
  transports: [
    new winston.transports.File({
      filename: 'logs/all.log', //logs folder and all.log filename
    }),
    new winston.transports.File({
      filename: 'logs/error.log', //logs folder and error.log filename
      level: 'error',
    }),
  ],
});

if (process.env.NODE_ENV != 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
