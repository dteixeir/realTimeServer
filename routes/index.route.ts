import { Router, Request, Response } from 'express';
import { GLOBALS } from '../globals';

const indexRouter: Router = Router();

indexRouter.get(`/`, async (req: Request, res: Response) => {
  res.sendFile(GLOBALS.__basedir + '/index.html');
});

export { indexRouter };
