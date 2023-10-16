import { Router } from 'express';
// import TestService from '../services/TestService';
// import TestController from '../controllers/TestController';
// import { REQUEST_COUNT, REQUEST_INTERVAL } from './limiters/limiters';
import TestLimiter from './limiters/TestLimiter';

// const testService: TestService = new TestService();
// const testController: TestController = new TestController(testService);

const testRoutes = Router();

const TEST_ROUTE = '/test';

testRoutes.get(TEST_ROUTE, TestLimiter, (req, res) => {
  res.json(`Hello from ${TEST_ROUTE} route`);
});
// testRoutes.get(
//   `${TEST_ROUTE}/:id`,
//   testController.getByID.bind(testController),
// );
// testRoutes.post(TEST_ROUTE, testController.create.bind(testController));
// testRoutes.put(TEST_ROUTE, testController.update.bind(testController));
// testRoutes.delete(TEST_ROUTE, testController.delete.bind(testController));

export default testRoutes;
