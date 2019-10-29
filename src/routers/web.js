import express from "express";
import passport from "passport";

import { auth } from "./../controllers/index";
import { authValid } from "./../validation/index";
import initPassportLocal from "./../controllers/passportControllers/local";
import initPassportFacebook from "./../controllers/passportControllers/facebook";
import initPassportGoogle from "./../controllers/passportControllers/google";

let router = express.Router();

initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let initRoutes = app => {

  router.get("/test", (req, res) => {
    res.render("test", {
      success: req.flash("success"),
      errors: req.flash("errors")
    })
  })

  router.get("/login-register", auth.index);

  router.post(
    "/register", 
    authValid.register, 
    auth.postRegister
  );

  router.post(
    "/login", 
    passport.authenticate("local", {
      successRedirect: "/test",
      failureRedirect: "/login-register",
      successFlash: true,
      failureFlash: true
    })
  )

  router.get(
    "/auth/facebook",
    passport.authenticate("facebook", { scope:  ["email"] })
  )

  router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      successRedirect: "/test",
      failureRedirect: "/login-register",
    })
  )



  return app.use("/", router);
};


module.exports = initRoutes;