import session from "express-session";
import connectMongo from "connect-mongo";

let MongoStore = connectMongo(session);

let sessionStore = new MongoStore({
  url: `${process.env.DB_CONNECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}}`,
  autoReconnect: true
});

let config = app => {
  app.use(
    session({
      key: process.env.SESSION_KEY,
      secret: process.env.SESSION_SECRET,
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 *24
      }
    })
  )
}

module.exports = {
  sessionStore,
  config
}