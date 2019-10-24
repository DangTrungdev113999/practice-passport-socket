import express  from  'express';

import connectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";

const app = express();

connectDB();

configViewEngine(app);


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(process.env.APP_PORT, () => {
  console.log(`running on ${process.env.APP_PORT}: ${process.env.APP_HOST}`)
});