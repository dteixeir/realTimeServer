import * as fileSystem from 'fs';
import { GLOBALS } from '../globals';
const fs = fileSystem.promises;

async function readData(route: string): Promise<JSON> {
  return fs.readFile(`${GLOBALS.dataDir}/${route}`, 'utf8')
    .then(data => JSON.parse(data))
    .catch(error => error);
}

async function readDataById(route: string, id: string | number): Promise<JSON> {
  return fs.readFile(`${GLOBALS.dataDir}/${route}`, 'utf8')
    .then(data => {
      const json: any = JSON.parse(data);
      const result = json.find(x => x.id.toString() === id);
      return result || {};
    })
    .catch(error => error);
}

export { readData, readDataById };