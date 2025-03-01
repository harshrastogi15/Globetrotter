import {Logger} from '../utils/logger.js';

const requestLogger = (req, res, next) => {
  const { method, url, body, params, query } = req;
  const logMessage = `${method} ${url}
  Params: ${JSON.stringify(params)}
  Query: ${JSON.stringify(query)}
  Body: ${JSON.stringify(body)}`;

  Logger.log(logMessage);
  next();
};

export default requestLogger;
