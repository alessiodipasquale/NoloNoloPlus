const { requestManager } = require('../routes/RequestsManager');

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        // Auth
        app.post('/loginFront',(req, res) => { requestManager("loginFront", req, res); })
        app.post('/registerFront',(req, res) => { requestManager("registerFront", req, res); })

        // User
        app.get('/users', auth, (req, res) => { requestManager("getUsers", req, res); })
        app.get('/users/:id', auth, (req, res) => { requestManager("getUserById", req, res); })
        app.delete('/users/:id', auth, (req, res) => { requestManager("deleteUser", req, res); })
        app.post('/users',auth, (req, res) => { requestManager("createUser", req, res); })

        // Item
        app.get('/items', auth, (req, res) => { requestManager("getItems", req, res); })
        app.delete('/items/:id', auth, (req, res) => { requestManager("deleteItem", req, res); })
        app.get('/items/:id', auth, (req, res) => { requestManager("getItemById", req, res); })

        // Rental
        app.get('/rentals', auth, (req, res) => { requestManager("getRentals", req, res); })
        app.delete('/rentals/:id', auth, (req, res) => { requestManager("deleteRental", req, res); })
        app.get('/rentals/:id', auth, (req, res) => { requestManager("getRentalById", req, res); })

        // Certification
        app.get('/certifications', auth, (req, res) => { requestManager("getCertifications", req, res); })
        app.delete('/certifications/:id', auth, (req, res) => { requestManager("deleteCertification", req, res); })
        app.get('/certifications/:id', auth, (req, res) => { requestManager("getCertificationById", req, res); })

        // Price details
        app.get('/priceDetails', auth, (req, res) => { requestManager("getPriceDetails", req, res); })
        app.delete('/priceDetails/:id', auth, (req, res) => { requestManager("deletePriceDetail", req, res); })
        app.get('/priceDetails/:id', auth, (req, res) => { requestManager("getPriceDetailById", req, res); })
    }
}

module.exports = router;