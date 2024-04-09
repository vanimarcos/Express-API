import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './cors';
import routes from './routes';
import app from './app';
import { RequestTimeout } from './utils/middewares';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const timeout = require('connect-timeout');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hpp = require('hpp');

/** Bootstrap application */
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(RequestTimeout);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

/** Added CORS */
app.use(cors(corsOptions));

app.use(hpp());

/** Define a request timeout for all routes */
app.use(timeout('15s')); // Set it to 15 seconds

app.use(routes);
export default app;
