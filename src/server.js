import express  from  'express';
import connectFlash from "connect-flash";
import cookieParser  from  "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";

import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRouter from "./routers/web";
import session from "./config/session";

const app = express();

connectDB();

session.config(app);


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(connectFlash());

app.use(cookieParser());

configViewEngine(app);

initRouter(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`running on ${process.env.APP_PORT}: ${process.env.APP_HOST}`)
});