import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MMM-YYYY HH:mm:ss',
    }),
    winston.format.printf(
      info =>
        `{"datetime":${[info.timestamp]}, "level": ${info.level}, "message": ${
          info.message
        }}`,
    ),
  ),
  transports: [
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

export default logger;
