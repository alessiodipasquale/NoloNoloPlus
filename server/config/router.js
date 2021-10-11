const { loginFront, registerFront } = require("../routes/auth");
const { getItemById, getItems, deleteItem } = require("../routes/item");
const { getUserById, getUsers, deleteUser } = require("../routes/user")

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        app.post('/loginFront',loginFront)
        app.post('/registerFront',registerFront)
        app.get('/users', auth, getUsers)
        app.get('/users/:id', auth, getUserById)
        app.delete('/users/:id', auth, deleteUser)
        app.get('/items', auth, getItems)
        app.delete('/items/:id', auth, deleteItem)
        app.get('/items/:id', auth, getItemById)
    }
}

module.exports = router;