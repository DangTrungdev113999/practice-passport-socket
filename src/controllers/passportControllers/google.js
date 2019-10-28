import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";


let GoogleStragery = passportGoogleOauth20.Strategy;

let initPassportStragery = () => {
  passport.use(
    new GoogleStragery(
      {
        clientID: 234,
        clientSecret: 234,
        callbackURL: "asdf",
        // profileFields
      }, 
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(refreshToken);
          console.log(profile);
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            // req.flash(),
          )
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser( async (id, done) => {
    try {
      console.log(id);
    } catch (error) {
      done(error, null)
    }
  })
}

module.exports = initPassportStragery;