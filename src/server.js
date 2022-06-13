const cors  = require('cors')

const { auth } = require('./api')

module.exports = async (app) => {
    app.use(cors())

    auth(app)
}