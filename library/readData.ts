const fileSystem = require('fs');
const fs = fileSystem.promises;

async function readData(route: string): Promise<JSON> {
  return fs.readFile(`${route}.json`)
    .then(data => JSON.parse(data))
    .catch(error => error);
}

async function readDataById(route: string, id: string | number): Promise<JSON> {
  return fs.readFile(`${route}.json`)
    .then(data => {
      const json = JSON.parse(data);
      const result = json.find(x => x.id.toString() === id);
      return result || {};
    })
    .catch(error => error);
}

export { readData, readDataById };