import express  from  'express';
import connectFlash from "connect-flash";
import cookieParser  from  "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import socketio from "socket.io";
import http from "http"

import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRouter from "./routers/web";
import session from "./config/session";
import initSocket from "./sockets/index";
import configSocket from "./config/socketio";

const app = express();
const server = http.Server(app);
let io = socketio(server);

connectDB();

session.config(app);

configViewEngine(app);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(connectFlash());

app.use(cookieParser());

initRouter(app);

initSocket(io);

configSocket(io, cookieParser, session.sessionStore);

server.listen(process.env.APP_PORT, () => {
  console.log(`running on ${process.env.APP_PORT}: ${process.env.APP_HOST}`)
});

// import pem from "pem";
// import https from "https";
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//   if (err) {
//     throw err
//   }

//   connectDB();

//   session.config(app);


//   app.use(bodyParser.urlencoded({ extended: false }))
//   app.use(bodyParser.json());

//   app.use(passport.initialize());
//   app.use(passport.session());

//   app.use(connectFlash());

//   app.use(cookieParser());

//   configViewEngine(app);

//   initRouter(app);
 
//   https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, () => {
//     console.log(`running on ${process.env.APP_PORT}: ${process.env.APP_HOST}`)
//   });
// })