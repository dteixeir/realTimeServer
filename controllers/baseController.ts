import { readData, readDataById } from '../library';

export class BaseController {
  constructor(app: any, endpoint: string, dataPath: string) {
    
    // actual end point (defaulting to only including get)
    app.get(`/${endpoint}`, async (req, res, next) => {
      const data = await readData(dataPath);
      res.status(200).send(data);
    });

    app.get(`/${endpoint}/:id`, async (req, res, next) => {
      const data = await readDataById(dataPath, req.params.id);
      res.status(200).send(data);
    });

    //Return middleware.
    return (req, res, next) => {
      next();
    };
  }
}
