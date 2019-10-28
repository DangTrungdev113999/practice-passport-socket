import passport from "passport";
import passportFacebook from "passport-facebook";


let FacebookStragery = passportFacebook.Strategy;


let initPassportFacebook = () => {
  passport.use(
    new FacebookStragery(
      {
        clientID: 12341234,
        clientSecret: 4234234,
        callbackURL: 'asdf',
        profileFields: ["email", "gender", "displayName"]
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          
        } catch (error) {
          console.log(error);
          return done(
            null,
            false,
            // req.flash()
          )
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser( (id, done) => {
    try {

    } catch (error) {
      done(error, null, )
    }
  })
}

module.exports = initPassportFacebook;