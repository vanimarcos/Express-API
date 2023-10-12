import { Router } from 'express';
import testRoutes from './testRoute';

const routes = Router();

routes.use(testRoutes);

export default routes;
