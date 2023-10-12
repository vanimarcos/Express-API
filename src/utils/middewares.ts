import { Request, Response, NextFunction } from 'express';
import toobusy from 'toobusy-js';
const compression = require('compression');
const ExpressBrute = require('express-brute');
import HTTP_STATUS_CODE from './httpsCodes';

const ResetXPoweredBy = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Powered-By', '');
  next();
};

const Logs = (req: Request, res: Response, next: NextFunction) => {
  console.log('Log');
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

const store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
const BruteForce = new ExpressBrute(store);

export { ResetXPoweredBy, Logs, ServerBusyness, Compression, BruteForce };
