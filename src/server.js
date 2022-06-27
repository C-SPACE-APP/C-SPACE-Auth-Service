const cors  = require('cors')

const { auth } = require('./api')

module.exports = async (app) => {
    app.use(cors({
        credentials: true,
        origin: [
            'http://localhost:3000', 
            'http://localhost:3001', 
            'http://localhost:3002',
            'http://localhost:3003',
            'http://localhost:3004',
            'http://localhost:3005',
            'http://localhost:3006',
            'http://localhost:3007',
            'http://localhost:3008'
        ]
    }))

    auth(app)
}