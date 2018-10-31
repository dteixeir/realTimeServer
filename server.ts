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

function setUpPort(folderPath: string, port: number) {
  fs.readdir(folderPath)
    .then((files) => {
    
      files.map(file => {
        // clean file name = route
        const endpoint = file.split(".")[ 0 ];
        app.use(endpoint, new BaseController(app, endpoint, folderPath));
      });

      console.log(`Listening on port ${port}...`);
      app.listen(port);
  })
  .catch(error => error);
}