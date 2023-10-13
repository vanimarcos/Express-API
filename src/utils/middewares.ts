import { Request, Response, NextFunction } from 'express';
import toobusy from 'toobusy-js';
import compression from 'compression';
import HTTP_STATUS_CODE from './httpsCodes';

const ResetXPoweredBy = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Powered-By', '');
  next();
};

const Logs = (req: Request, res: Response, next: NextFunction) => {
  // Write your log code here...
  next();
};

/** The toobusy-js module allows you to monitor the event loop. */
const ServerBusyness = (req: Request, res: Response, next: NextFunction) => {
  if (toobusy()) {
    res.status(HTTP_STATUS_CODE.ServiceUnavailable).send('Server is Too Busy');
  } else {
    next();
  }
};

const Compression = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};

const RequestTimeout = (req: Request, res: Response, next: NextFunction) => {
  if (!req.timedout) return next();
  res.status(408).send('Request Timeout');
};

export { ResetXPoweredBy, Logs, ServerBusyness, Compression };
