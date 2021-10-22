const { requestManager } = require('../routes/RequestsManager');

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        // Auth
        app.post('/loginFront',(req, res) => { requestManager("loginFront", req, res); })
        app.post('/registerFront',(req, res) => { requestManager("registerFront", req, res); })
        app.post('/loginDashboard',(req, res) => { requestManager("loginDashboard", req, res); })
        app.post('/registerDashboard',(req, res) => { requestManager("registerDashboard", req, res); })
        app.post('/loginBack',(req, res) => { requestManager("loginBack", req, res); })
        app.post('/registerBack',(req, res) => { requestManager("registerBack", req, res); })

        // User
        app.get('/users', auth, (req, res) => { requestManager("getUsers", req, res); })
        app.get('/users/:id', auth, (req, res) => { requestManager("getUserById", req, res); })
        app.delete('/users/:id', auth, (req, res) => { requestManager("deleteUser", req, res); })
        app.post('/users',auth, (req, res) => { requestManager("createUser", req, res); })
        app.put('/users',auth, (req, res) => { requestManager("editUser", req, res); })
        app.get('/users/:userId/rentals',auth, (req, res) => { requestManager("getRentalsByUserId", req, res); })

        // Item
        app.get('/items', auth, (req, res) => { requestManager("getItems", req, res); })
        app.delete('/items/:id', auth, (req, res) => { requestManager("deleteItem", req, res); })
        app.get('/items/:id', auth, (req, res) => { requestManager("getItemById", req, res); })
        app.post('/items',auth, (req, res) => { requestManager("createItem", req, res); })
        app.post('/items/:id/checkIfAvailable', auth, (req, res) => { requestManager("checkIfAvailable", req, res); })

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

        // PropertyValue
        app.get('/propertyValues', auth, (req, res) => { requestManager("getPropertyValues", req, res); })
        app.delete('/propertyValues/:id', auth, (req, res) => { requestManager("deletePropertyValue", req, res); })
        app.get('/propertyValues/:id', auth, (req, res) => { requestManager("getPropertyValueById", req, res); })
        app.post('/propertyValues',auth, (req, res) => { requestManager("createPropertyValue", req, res); })

        // Category
        app.get('/categories', auth, (req, res) => { requestManager("getCategories", req, res); })
        app.delete('/categories/:id', auth, (req, res) => { requestManager("deleteCategory", req, res); })
        app.get('/categories/:id', auth, (req, res) => { requestManager("getCategoryById", req, res); })
        app.post('/categories',auth, (req, res) => { requestManager("createCategory", req, res); })
        app.get('/categories/:categoryId/items', auth, (req, res) => { requestManager("getItemsByCategoryId", req, res); })

        // Kit
        app.get('/kits', auth, (req, res) => { requestManager("getKits", req, res); })
        app.delete('/kits/:id', auth, (req, res) => { requestManager("deleteKit", req, res); })
        app.get('/kits/:id', auth, (req, res) => { requestManager("getKitById", req, res); })
        app.post('/kits',auth, (req, res) => { requestManager("createKit", req, res); })

    }
}

module.exports = router;