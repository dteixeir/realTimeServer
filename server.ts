import { DataRoute, indexRouter } from './routes';
import { config } from './config';
import { GLOBALS } from './globals';


import * as fileSystem from 'fs';
import * as express from 'express';
const fs = fileSystem.promises;

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// CORS Support
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ------------------ PORTS -------------------------

setUpPort('data', config.port);

// --------- HELPER FUNCTION ------------------------

async function setUpPort(folderPath: string, port: number) {
  await getfiles();
  await addIndexRoute();
  console.log(`Listening on port ${port}...`);
  http.listen(port);
}

// ------------------- Base Route ------------------------

async function addIndexRoute() {
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });
}

// ---------- LETS GET RECURSIVE! ------------------------

async function getfiles(folderPath: string = GLOBALS.dataDir) {
  
  return fs.readdir(folderPath)
    .then(async (files) => {

      files.map(async file => {
        const fullPath = `${folderPath}${file}`;
        const fileStats = await fs.stat(fullPath);

        if (fileStats.isDirectory()) {
          await getfiles(fullPath + '/');
        } else {
          const endpoint = fullPath.replace(/^[^_]*(\/data\/)/, '');
          const controller = new DataRoute(endpoint);

          app.use(controller.router);
        }
      });
    })
    .catch(error => error);
}
