import { Router } from 'express';

import TestLimiter from './limiters/TestLimiter';
import { HTTP_STATUS_CODE } from '../utils/httpsCodes';
const testRoutes = Router();

const TEST_ROUTE = '/test';

testRoutes.get(TEST_ROUTE, TestLimiter, (req, res) => {
  res.status(HTTP_STATUS_CODE.OK).json(`Hello from ${TEST_ROUTE} route`);
});

export default testRoutes;
