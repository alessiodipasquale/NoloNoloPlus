const { requestManager } = require('../routes/RequestsManager');
const { BadRequestError } = require('./errors');

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
        app.get('/users/managers', auth, (req, res) => { requestManager("getManagers", req, res); })
        app.get('/users/employers', auth, (req, res) => { requestManager("getEmployers", req, res); })
        app.get('/users/clients', auth, (req, res) => { requestManager("getClients", req, res); })
        app.get('/users/damage', auth, (req, res) => { requestManager("getUsersTotalDamage", req, res);})
        app.get('/users/:id', auth, (req, res) => { requestManager("getUserById", req, res); })
        app.delete('/users/:id', auth, (req, res) => { requestManager("deleteUser", req, res); })
        app.post('/users', auth, (req, res) => { requestManager("createUser", req, res); })
        app.put('/users',auth, (req, res) => { requestManager("editUser", req, res); })
        app.get('/users/:userId/rentals',auth, (req, res) => { requestManager("getRentalsByUserId", req, res); })
        app.get('/users/:id/getReviewsByUserId', auth, (req, res) => { requestManager("getReviewsByUserId", req, res); })
        app.get('/users/:id/damage', auth, (req, res) => { console.log("ao");requestManager("getUserDamage", req, res); })
        app.get('/users/employers/:id/revenue', auth, (req, res) => { requestManager("getEmployerRevenue", req, res); })
        app.get('/users/employers/revenue', auth, (req, res) => { requestManager("getEmployersTotalRevenue", req, res); })
        app.get('/users/clients/revenue', auth, (req, res) => { requestManager("getClientsTotalRevenue",req, res); })

        // Item
        /**/app.get('/items', (req, res) => { requestManager("getItems", req, res); })
        app.delete('/items/:id', auth, (req, res) => { requestManager("deleteItem", req, res); })
        /**/app.get('/items/:id', (req, res) => { requestManager("getItemById", req, res); })
        app.post('/items',auth, (req, res) => { requestManager("createItem", req, res); })
        app.put('/items/:id',auth, (req, res) => { requestManager("editItem", req, res); })
        app.post('/items/:id/checkIfAvailable', auth, (req, res) => { requestManager("checkIfAvailable", req, res); })
        /*non uso*/app.get('/items/:id/getReviewsByItemId', (req, res) => { requestManager("getReviewsByItemId", req, res); })
        /*non uso*/app.post('/items/:itemId/calculatePrice', (req, res) => { requestManager("calculatePriceforItem", req, res); })


        // Rental
        app.get('/rentals', auth, (req, res) => { requestManager("getRentals", req, res); })
        app.delete('/rentals/:id', auth, (req, res) => { requestManager("deleteRental", req, res); })
        app.get('/rentals/:id', auth, (req, res) => { requestManager("getRentalById", req, res); })
        app.post('/rentals',auth, (req, res) => { requestManager("createRental", req, res); })
        app.put('/rentals',auth, (req, res) => { requestManager("editRental", req, res); })

        // Certification (ancora faccio su frontoffice)
        app.get('/certifications', auth, (req, res) => { requestManager("getCertifications", req, res); })
        app.delete('/certifications/:id', auth, (req, res) => { requestManager("deleteCertification", req, res); })
        app.get('/certifications/:id', auth, (req, res) => { requestManager("getCertificationById", req, res); })
        app.post('/certifications',auth, (req, res) => { requestManager("createCertification", req, res); })

        // Property (roba tua, non da frontoffice, magari da back)
        /**/app.get('/properties', (req, res) => { requestManager("getProperties", req, res); })
        app.delete('/properties/:id', auth, (req, res) => { requestManager("deleteProperty", req, res); })
        /**/app.get('/properties/:id', (req, res) => { requestManager("getPropertyById", req, res); })
        app.post('/properties',auth, (req, res) => { requestManager("createProperty", req, res); })
        app.put('/properties/:id',auth, (req, res) => { requestManager("editProperty", req, res); })

        // PropertyValue (roba tua, non da frontoffice, magari da back)
        /**/app.get('/propertyValues', (req, res) => { requestManager("getPropertyValues", req, res); })
        app.delete('/propertyValues/:id', auth, (req, res) => { requestManager("deletePropertyValue", req, res); })
        /**/app.get('/propertyValues/:id', (req, res) => { requestManager("getPropertyValueById", req, res); })
        app.post('/propertyValues',auth, (req, res) => { requestManager("createPropertyValue", req, res); })
        app.put('/propertyValues',auth, (req, res) => { requestManager("editPropertyValue", req, res); })

        // Category
        /**/app.get('/categories', (req, res) => { requestManager("getCategories", req, res); })
        app.delete('/categories/:id', auth, (req, res) => { requestManager("deleteCategory", req, res); })
        /**/app.get('/categories/:id', (req, res) => { requestManager("getCategoryById", req, res); })
        app.post('/categories',auth, (req, res) => { requestManager("createCategory", req, res); })
        /**/app.get('/categories/:categoryId/items', (req, res) => { requestManager("getItemsByCategoryId", req, res); })
        app.put('/categories',auth, (req, res) => { requestManager("editCategory", req, res); })

        // Kit
        /**/app.get('/kits', (req, res) => { requestManager("getKits", req, res); })
        app.delete('/kits/:id', auth, (req, res) => { requestManager("deleteKit", req, res); })
        /**/app.get('/kits/:id', (req, res) => { requestManager("getKitById", req, res); })
        app.post('/kits',auth, (req, res) => { requestManager("createKit", req, res); })
        app.post('/kits/:id/checkIfAvailable', auth, (req, res) => { requestManager("checkIfAvailable", req, res); })
        /*non uso */app.post('/kits/:kitId/calculatePrice', (req, res) => { requestManager("calculatePriceforKit", req, res); })
        /*non uso*/app.get('/kits/:id/getReviewsByKitId', (req, res) => { requestManager("getReviewsByKitId", req, res); })
        app.put('/kits/:id',auth, (req, res) => { requestManager("editKit", req, res); })

        // Review
        /*non uso*/app.get('/reviews', (req, res) => { requestManager("getReviews", req, res); })
        app.delete('/reviews/:id', auth, (req, res) => { requestManager("deleteReview", req, res); })
        /**/app.get('/reviews/:id', (req, res) => { requestManager("getReviewById", req, res); })
        app.post('/reviews',auth, (req, res) => { requestManager("createReview", req, res); })
        app.put('/reviews/:id',auth, (req, res) => { requestManager("editReview", req, res); })

        // Group (Ancora implemento da frontoffice)
        /**/app.get('/groups', (req, res) => { requestManager("getGroups", req, res); })
        app.delete('/groups/:id', auth, (req, res) => { requestManager("deleteGroup", req, res); })
        /**/app.get('/groups/:id', (req, res) => { requestManager("getGroupById", req, res); })
        app.post('/groups',auth, (req, res) => { requestManager("createGroup", req, res); })
        app.put('/groups',auth, (req, res) => { requestManager("editGroup", req, res); })
    }
}

module.exports = router;