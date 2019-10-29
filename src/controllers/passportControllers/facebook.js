import passport from "passport";
import passportFacebook from "passport-facebook";

import { transErrors, transSuccess } from "./../../../lang/vi";
import UserModel from "./../../models/User.model";


let FacebookStragery = passportFacebook.Strategy;


let fbAppId = process.env.FB_ID;
let fbAppSecret = process.env.FB_SECRET;
let dbCallback = process.env.FB_CALLBACL_URL;

let initPassportFacebook = () => {
  passport.use(
    new FacebookStragery(
      {
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: dbCallback,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findUserByFacebookId(profile.id);
          if (user) {
            return done(
              null,
              user,
              req.flash("success", transSuccess.login_success(profile.displayName))
            )
          }

          let newUserItem = {
            username: profile.displayName,
            local: { isActive: true },
            facebook: {
              uid: profile.id,
              token: accessToken,
              email: profile.email ? profile.email : `${profile.provider}@gmail.com`
            }
          }

          let newUser = await UserModel.createNew(newUserItem);

          return done(
            null,
            newUser,
            req.flash("success", transSuccess.login_success(newUser.username))
          )

        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            req.flash("errors", transErrors.server_error)
          )
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser( async (id, done) => {
    try {
      let user = await UserModel.findByIdForSessionToUse(id);
      // let getChatGroupIds = await ChatGroup.getChatGroupIdsByUser(user._id);

      // user = user.toObject();
      // user.ChatGroupIds = getChatGroupIds

      return done(null, user);
    } catch (error) {
      done(error, null,)
    }
  })
}

module.exports = initPassportFacebook;