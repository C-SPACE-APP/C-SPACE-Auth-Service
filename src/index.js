const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const { databaseConnection } = require('./database')
const server = require('./server')
const { passport } = require('./services')

require('dotenv').config

const start = async () => {
    const app = express()

    try {
        await databaseConnection(mongoose)
    } catch(err) {
        return
    }

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongoUrl: mongoose.connection.client.s.url, collection: 'sessions'}),
            cookie: {
                expires: 24*60*60*1000      // day*hour*minute*second  1 day
                // expires: 10*60*1000      // minute*second  10 minutes    for demo purposes
            }
        })
    )

    app.use(passport.initialize());
    app.use(passport.session());
    
    await server(app)

    const PORT = process.env.PORT || 3003

    app.listen(PORT, (err) => {
        if(err) console.log(`Error starting app: ${err}`)
        else console.log(`Auth Service tarted listening on port ${PORT}`)
    })
}

start()