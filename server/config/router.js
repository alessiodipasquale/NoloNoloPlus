const { login } = require("../routes/auth");
const { getItemById } = require("../routes/item");
const { getUserById } = require("../routes/user")

const router = {
    initialize: (app) => {
        app.post('/login',login)
        app.get('/getUsers/:id', getUserById)
        app.get('/getItemById/:id', getItemById)
    }
}

module.exports = router;