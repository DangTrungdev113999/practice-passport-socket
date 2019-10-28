import passport from "passport";
import passportLocal from "passport-local";
import UserModel from "./../../models/User.model";


let LocalStragery = passportLocal.Strategy;

let initPassportLocal = () => {
  passport.use(
    new LocalStragery(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (req, email, password, done) => {
        try {
          let user = await UserModel.findByEmail(email);
          if (!user) {
            return done(
              null,
              false,
              // req.flash("errors")
            )
          }

          if (!user.local.isActive) {
            return done(
              null,
              false,
              // req.flash("errors", )
            )
          }

          let checkPassword = await user.comparePassword(password);

          if (!check) {
            return done(
              null, 
              false, 
              // req.flash()
            )
          }

          return done(
            null,
            user,
            // req.flash("success", )
          )
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            // req.flash("errors")
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