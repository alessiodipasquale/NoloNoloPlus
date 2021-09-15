const { login } = require("../routes/auth");
const { getItemById, getItems } = require("../routes/item");
const { getUserById, getUsers } = require("../routes/user")

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        app.post('/login',login)
        app.get('/users', auth, getUsers)
        app.get('/users/:id', auth, getUserById)
        app.get('/items', auth, getItems)
        app.get('/items/:id', auth, getItemById)
    }
}

module.exports = router;