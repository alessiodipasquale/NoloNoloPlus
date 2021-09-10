const { getItemById } = require("../routes/item");
const { getUserById } = require("../routes/user")

const router = {
    initialize: (app) => {
        app.get('/getUsers/:id', getUserById)
        app.get('/getItemById/:id', getItemById)
    }
}

module.exports = router;