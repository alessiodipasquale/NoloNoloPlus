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
        app.post('/items',auth, (req, res) => { requestManager("createItem", req, res); })

        // Rental
        app.get('/rentals', auth, (req, res) => { requestManager("getRentals", req, res); })
        app.delete('/rentals/:id', auth, (req, res) => { requestManager("deleteRental", req, res); })
        app.get('/rentals/:id', auth, (req, res) => { requestManager("getRentalById", req, res); })
        app.post('/rentals',auth, (req, res) => { requestManager("createRental", req, res); })

        // Certification
        app.get('/certifications', auth, (req, res) => { requestManager("getCertifications", req, res); })
        app.delete('/certifications/:id', auth, (req, res) => { requestManager("deleteCertification", req, res); })
        app.get('/certifications/:id', auth, (req, res) => { requestManager("getCertificationById", req, res); })
        app.post('/certifications',auth, (req, res) => { requestManager("createCertification", req, res); })

        // Price details
        app.get('/priceDetails', auth, (req, res) => { requestManager("getPriceDetails", req, res); })
        app.delete('/priceDetails/:id', auth, (req, res) => { requestManager("deletePriceDetail", req, res); })
        app.get('/priceDetails/:id', auth, (req, res) => { requestManager("getPriceDetailById", req, res); })
        app.post('/priceDetails',auth, (req, res) => { requestManager("createPriceDetail", req, res); })

        // Property
        app.get('/properties', auth, (req, res) => { requestManager("getProperties", req, res); })
        app.delete('/properties/:id', auth, (req, res) => { requestManager("deleteProperty", req, res); })
        app.get('/properties/:id', auth, (req, res) => { requestManager("getPropertyById", req, res); })
        app.post('/properties',auth, (req, res) => { requestManager("createProperty", req, res); })

        // Category
        app.get('/categories', auth, (req, res) => { requestManager("getCategories", req, res); })
        app.delete('/categories/:id', auth, (req, res) => { requestManager("deleteCategory", req, res); })
        app.get('/categories/:id', auth, (req, res) => { requestManager("getCategoryById", req, res); })
        app.post('/categories',auth, (req, res) => { requestManager("createCategory", req, res); })
        app.get('/categories/:categoryId/items', auth, (req, res) => { requestManager("getItemsByCategoryId", req, res); })

    }
}

module.exports = router;