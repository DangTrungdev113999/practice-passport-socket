import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "./../../models/User.model";
import { transErrors, transSuccess } from "./../../../lang/vi";

let LocalStragery = passportLocal.Strategy;
let initPassportLocal = () => {
  passport.use(
    new LocalStragery(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let user = await UserModel.findUserByEmail(email);
          if (!user) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.email_pass_wrrong)
            )
          }

          if (!user.local.isActive) {
            return done(
              null,
              false,
              req.flash("errors", transErrors.account_not_active)
            )
          }

          let checkPassword = await user.comparePassword(password);

          if (!checkPassword) {
            return done(
              null, 
              false, 
              req.flash("errors", transErrors.email_pass_wrrong)
            )
          }

          return done(
            null,
            user,
            req.flash("success", transSuccess.login_success(user.username))
          )
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            req.flash("errors", transErrors.server_error )
          )
        }
      }
    )
  )

  passport.serializeUser( (user, done) => {
    return done(null, user._id);
  })

  passport.deserializeUser( async (id, done) => {
    try {
      let user = await UserModel.findByIdForSessionToUse(id);
      // console.log("deserializeUser")
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(
        error,
        null
      )
    }
  })
}

module.exports = initPassportLocal;