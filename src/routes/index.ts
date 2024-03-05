import { Router, Request, Response } from 'express';
import testRoutes from './testRoute';
import { HTTP_STATUS_CODE } from '../utils/httpsCodes';
import heathCheckRoutes from './healthCheckRoute';

const routes = Router();

const BASE_ROUTE = '/';

routes.get(BASE_ROUTE, (req: Request, res: Response) =>
  res.status(HTTP_STATUS_CODE.OK).json('Hello from the API'),
);

routes.use(testRoutes);
routes.use(heathCheckRoutes);

export default routes;
export { BASE_ROUTE };
