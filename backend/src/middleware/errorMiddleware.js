import { AppError } from '../utils/errorHandler.js';
import { Logger } from '../utils/logger.js';

export function errorMiddleware(err, req, res, next) {
  Logger.log(err.statusCode + err.message)
  if (err instanceof AppError) {
    return res.status(Number(err.statusCode)).json({
      status: 'error',
      message: err.message
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred'
  });
}
