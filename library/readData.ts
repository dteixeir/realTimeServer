const fileSystem = require('fs');
const fs = fileSystem.promises;

async function readData(route: string): Promise<JSON> {
  return fs.readFile(`${route}.json`)
    .then(data => JSON.parse(data))
    .catch(error => error);
}

export { readData };