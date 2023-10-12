import { rateLimit } from 'express-rate-limit';
import { REQUEST_COUNT } from './limiters';

const TestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: REQUEST_COUNT.HIGH,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

export default TestLimiter;
