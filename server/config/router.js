const { login } = require("../routes/auth");
const { getItemById, getItems } = require("../routes/item");
const { getUserById, getUsers } = require("../routes/user")

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        app.post('/login',login)
        app.get('/getUsers', auth, getUsers)
        app.get('/getUsers/:id', auth, getUserById)
        app.get('/getItems', auth, getItems)
        app.get('/getItemById/:id', auth, getItemById)
    }
}

module.exports = router;