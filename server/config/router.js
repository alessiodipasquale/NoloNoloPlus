const { login } = require("../routes/auth");
const { getItemById } = require("../routes/item");
const { getUserById } = require("../routes/user")

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        app.post('/login',login)
        app.get('/getUsers/:id', auth, getUserById)
        app.get('/getItemById/:id', auth, getItemById)
    }
}

module.exports = router;