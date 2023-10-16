import { Router, Request, Response } from 'express';
import testRoutes from './testRoute';

const routes = Router();

const BASE_ROUTE = '/';
routes.get(BASE_ROUTE, (req: Request, res: Response) =>
  res.send('Hello from the API'),
);

routes.use(testRoutes);

export default routes;
export { BASE_ROUTE };
