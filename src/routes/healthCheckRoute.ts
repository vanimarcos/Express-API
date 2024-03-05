import { Router } from 'express';
import { HTTP_STATUS_CODE } from '../utils/httpsCodes';

const heathCheckRoutes = Router();

const HEALTH_CHECK_ROUTE = '/health';

heathCheckRoutes.get(HEALTH_CHECK_ROUTE, (req, res) => {
  res.status(HTTP_STATUS_CODE.OK).json({ status: 'UP' });
});

export default heathCheckRoutes;
