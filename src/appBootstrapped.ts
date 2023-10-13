import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import timeout from 'connect-timeout';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hpp = require('hpp');
import cors from 'cors';
import { corsOptions } from './cors';
import routes from './routes';
import app from './app';
import { ServerBusyness } from './utils/middewares';

/** Bootstrap application */
app.use(helmet());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

/** Added CORS */
app.use(cors(corsOptions));

app.use(hpp());
app.use(ServerBusyness);
// app.use(Compression);

/** Define a request timeout for all routes */
app.use(timeout('15s')); // Set it to 15 seconds
app.use(routes);
export default app;
