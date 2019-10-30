import express from "express";
import passport from "passport";

import { auth, home, contact } from "./../controllers/index";
import { authValid } from "./../validation/index";
import initPassportLocal from "./../controllers/passportControllers/local";
import initPassportFacebook from "./../controllers/passportControllers/facebook";
import initPassportGoogle from "./../controllers/passportControllers/google";

let router = express.Router();

initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let initRoutes = app => {

  router.get("/login-register", auth.checkLogout, auth.index);

  router.get("/logout", auth.logout);

  router.post(
    "/register",
    auth.checkLogout,
    authValid.register, 
    auth.postRegister
  );

  router.post(
    "/login", 
    auth.checkLogout,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login-register",
      successFlash: true,
      failureFlash: true
    })
  );

  router.get(
    "/auth/facebook",
    auth.checkLogout,
    passport.authenticate("facebook", { scope:  ["email"] })
  );

  router.get(
    "/auth/facebook/callback",
    auth.checkLogout,
    passport.authenticate("facebook", {
      successRedirect: "/",
      failureRedirect: "/login-register",
    })
  );

  router.get("/", auth.checkLogin, home.index);

  router.post("/contact/add-frirend", auth.checkLogin, contact.addFriend)


  return app.use("/", router);
};


module.exports = initRoutes;