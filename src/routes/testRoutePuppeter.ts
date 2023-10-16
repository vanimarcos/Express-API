import { Router } from 'express';
import puppeteer from 'puppeteer';
// import TestService from '../services/TestService';
// import TestController from '../controllers/TestController';
// import { REQUEST_COUNT, REQUEST_INTERVAL } from './limiters/limiters';
import TestLimiter from './limiters/TestLimiter';
import { HTTP_STATUS_CODE, HTTP_STATUS_MSG } from '../utils/httpsCodes';

// const testService: TestService = new TestService();
// const testController: TestController = new TestController(testService);

const testRoutePuppeter = Router();

const TEST_PUPPETEER = '/test_puppeteer';

testRoutePuppeter.get(TEST_PUPPETEER, (req, res) => {
  try {
    (async () => {
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle2',
      });
      // page.pdf() is currently supported only in headless mode.
      // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
      await page.pdf({
        path: `${process.env.STORAGE_DOCS}/hn.pdf`,
        format: 'letter',
      });

      await browser.close();
    })();
    res
      .status(HTTP_STATUS_CODE.OK)
      .json({ message: HTTP_STATUS_MSG[HTTP_STATUS_CODE.OK] });
  } catch (error) {
    res
      .status(HTTP_STATUS_CODE.InternalServerError)
      .json({ message: HTTP_STATUS_MSG[HTTP_STATUS_CODE.InternalServerError] });
  }
});
// testRoutes.get(
//   `${TEST_ROUTE}/:id`,
//   testController.getByID.bind(testController),
// );
// testRoutes.post(TEST_ROUTE, testController.create.bind(testController));
// testRoutes.put(TEST_ROUTE, testController.update.bind(testController));
// testRoutes.delete(TEST_ROUTE, testController.delete.bind(testController));

export default testRoutePuppeter;
