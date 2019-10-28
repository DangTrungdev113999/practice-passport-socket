import express  from  'express';
import connectFlash from "connect-flash";
import cookieParser  from  "cookie-parser";

import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";

const app = express();

connectDB();

configViewEngine(app);

app.use(connectFlash());

app.use(cookieParser());


app.get('/', (req, res) => {
  res.render("auth/master", { errors:  req.flash("errors"), success: req.flash("success") });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`running on ${process.env.APP_PORT}: ${process.env.APP_HOST}`)
});