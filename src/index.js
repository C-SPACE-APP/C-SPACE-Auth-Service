const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const server = require('./server')
const { passport } = require('./services')
const { databaseConnection } = require('./database')

require('dotenv').config

const start = async () => {
    const app = express()

    let connection = null
    try {
        connection = await databaseConnection(mongoose)
    } catch(err) {
        return
    }

    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongoUrl: mongoose.connection.client.s.url, collection: 'sessions'})
        })
    )

    app.use(passport.initialize());
    app.use(passport.session());
    
    await server(app)

    const PORT = process.env.PORT || 3002

    app.listen(PORT, (err) => {
        if(err) console.log(`Error starting app: ${err}`)
        else console.log(`Started listening on port ${PORT}`)
    })
}

start()