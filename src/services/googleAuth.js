const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const axios = require('axios')

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
    callbackURL: "http://localhost:3001/auth/google/callback"
    },
    async (accessToken, refreshToken, object0, profile, done) => {
        if(profile._json.hd !== 'up.edu.ph') return done(null, false)

        try {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:3002/app-events/',
                data: {
                    event: 'FIND_BY_GOOGLE_ID',
                    data: {
                        googleId: profile.id
                    }
                }
            })

            if(!data) {
                const { data } = await axios({
                    method: 'post',
                    url: 'http://localhost:3002/app-events/',
                    data: {
                        event: 'ADD_USER',
                        data: {
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            givenName: profile.name.givenName,
                            lastName: profile.name.familyName
                        }
                    }
                })

                if(!data) return done(null, false)

                return done(null, data)
            }

            return done(null, data);

        } catch(err) {
            console.log(err);
            return done(null, false)
        }
}));

module.exports = passport