import { readData, readDataById } from '../library';
import { Router, Request, Response } from 'express';

export class DataRoute {
  router: Router;

  constructor(
    dataPath: string
  ) {
    this.router = Router();
    const endpoint = dataPath.replace('.json', '');
    
    // actual end point (defaulting to only including get)
    this.router.get(`/${endpoint}`, async (req: Request, res: Response) => {
      const data = await readData(dataPath);
      res.status(200).send(data);
    });

    this.router.get(`/${endpoint}/:id`, async (req: Request, res: Response) => {
      const data = await readDataById(dataPath, req.params.id);
      res.status(200).send(data);
    });
  }
}
