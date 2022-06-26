const cors  = require('cors')

const { auth } = require('./api')

module.exports = async (app) => {
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }))

    auth(app)
}