const passport = require('passport')

const AuthAPI = (app) => {

    app.get('/', async (req, res) => {
        return res.json({ message: `Inside auth service`})
    })

    // https://stackoverflow.com/questions/23065104/restrict-login-to-specific-domain-using-node-passport-with-google-auth
    app.get('/google', passport.authenticate('google', { 
        // Only show accounts that match the hosted domain.
        hd: 'up.edu.ph',
        // Ensure the user can always select an account when sent to Google.
        prompt: 'select_account',
        scope: [
            'profile', 
            'email'
        ] 
    }));

    app.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000', session: true }),
        function (req, res) {
            res.redirect('http://localhost:3000');
        });

    app.get('/getUser', (req, res) => {
        // console.log('getuser')
        // console.log(req.user)
        res.json({
            User: req.user
        })
        // res.send(res.req)
    })

    app.get('/logout', (req, res) => {
        req.session.destroy((err) => {
            res.redirect('http://localhost:3000') // will always fire after session is destroyed
        })
    })

    // const service = new UserService()

    // app.get('/', async (req, res) => {
    //     const { search } = req.query

    //     try {
    //         const data = await service.GetUsers(search)
    //         return res.json(data)
    //     } catch(err) {
    //         console.log(`Error in GET many users: ${err}`);
    //         return res.status(500).json({ err })
    //     }

    // })

    // app.get('/:id', async (req, res) => {
    //     const { id } = req.params

    //     try {
    //         const data = await service.GetUser(id)
    //         return res.json(data)
    //     } catch(err) {
    //         console.log(`Error in GET one user: ${err}`);
    //         return res.status(500).json({ err })
    //     }
    // })
}

module.exports = AuthAPI