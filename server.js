const cors  = require('cors')
const { user } = require('./api')

module.exports = async (app) => {
    app.use(cors())

    user(app)
}