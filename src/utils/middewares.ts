import express, { Request, Response, NextFunction } from 'express';
import toobusy from 'toobusy-js';
import compression from 'compression';
import { HTTP_STATUS_CODE, HTTP_STATUS_MSG } from './httpsCodes';

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
    res
      .status(HTTP_STATUS_CODE.ServiceUnavailable)
      .send(HTTP_STATUS_MSG[HTTP_STATUS_CODE.ServiceUnavailable]);
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

const RequestTimeout = (
  req: Express.Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.timedout) return next();
  res
    .status(HTTP_STATUS_CODE.RequestTimeout)
    .send(HTTP_STATUS_MSG[HTTP_STATUS_CODE.RequestTimeout]);
};

export { ResetXPoweredBy, Logs, ServerBusyness, Compression, RequestTimeout };
