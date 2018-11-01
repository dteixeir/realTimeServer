import { BaseController } from "./controllers";
import { config } from './config';

var express = require('express');
var app = express();
const fileSystem = require('fs');
const fs = fileSystem.promises;

// CORS Support
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ------------------ PORTS -------------------------

setUpPort('data', config.port1);
setUpPort('data', config.port2);

// --------- HELPER FUNCTION ------------------------

async function setUpPort(folderPath: string, port: number) {
  await getfiles();
  console.log(`Listening on port ${port}...`);
  app.listen(port);
}

// ---------- LETS GET RECURSIVE! ------------------------

async function getfiles(folderPath: string = './data') {
  return fs.readdir(folderPath)
    .then(async (files) => {

      files.map(async file => {
        const fullPath = `${folderPath}/${file}`;
        const fileStats = await fs.stat(fullPath);

        if (fileStats.isDirectory()) {
          await getfiles(fullPath);
        } else {
          const path = fullPath.replace('.json', '');
          const endpoint = path.replace('./data/', '');

          app.use(endpoint, new BaseController(app, endpoint, path));
        }
      });
    })
    .catch(error => error);
}