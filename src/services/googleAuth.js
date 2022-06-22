const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const axios = require('axios')

require('dotenv').config()

passport.serializeUser((user, done) => {
    done(null, user.googleId || user.id);
});

passport.deserializeUser(async (id, done) => {
    const { data } = await axios({
        method: 'post',
        url: 'http://localhost:3002/app-events/',
        data: {
            event: 'FIND_BY_GOOGLE_ID',
            data: {
                googleId: id
            }
        }
    })

    if(data.payload.user) return done(null, data.payload.user)
    return done(null, false)
    
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

            if(!data.payload.user) {
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

                if(!data.payload.user) return done(null, false)

                return done(null, data.payload.user)
            }

            return done(null, data.payload.user);

        } catch(err) {
            console.log(err);
            return done(null, false)
        }
}));

module.exports = passport