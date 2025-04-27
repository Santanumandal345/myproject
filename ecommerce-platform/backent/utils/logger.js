import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, align } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${message} ${stack || ''}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    align(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat)
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      level: 'error',
      maxFiles: '30d'
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      maxFiles: '30d'
    })
  ]
});

// Morgan stream configuration
const morganStream = {
  write: (message) => logger.info(message.trim())
};

export { logger, morganStream };  // Make sure both are exported