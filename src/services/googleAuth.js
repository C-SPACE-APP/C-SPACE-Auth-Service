const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

require('dotenv').config()

// const { UserModel } = require('../schema')

passport.serializeUser((user, done) => {
    done(null, user.googleId || user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findOne({googleId: id}, (err, user) => {
        done(null,user)
    })
})


passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "http://localhost:3000/auth/google/callback"
    },
    async (accessToken, refreshToken, object0, profile, done) => {

        console.log(profile)

        return done(null, false)

        // if(profile._json.hd !== 'up.edu.ph') {
        //     return done(null, false)
        // }

        // await UserModel.findOne({ googleId: profile.id }, (err, doc) => {
        //     if (err) {
        //         console.log(`Error inside Strategy. Error: ${err}`);
        //         return done(err, null);
        //     }

        //     if (!doc) {
        //         const newUser = new UserModel({
        //         googleId: profile.id,
        //         givenName: profile.name.givenName,
        //         lastName: profile.name.familyName,
        //         email: profile.emails[0].value,
        //         });

        //         newUser.save();
        //         return done(null, newUser);
        //     } 
        //     else{
        //         return done(null, doc);
        //     } 
        // }).clone()
}));

module.exports = passport