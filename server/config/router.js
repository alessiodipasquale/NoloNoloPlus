const { loginFront, registerFront } = require("../routes/Auth");
const { getItemById, getItems, deleteItem } = require("../routes/Item");
const { getUserById, getUsers, deleteUser } = require("../routes/User");
const { getRentalById, getRentals, deleteRental } = require("../routes/Rental");
const { getCertificationById, getCertifications, deleteCertification } = require("../routes/Certification");
const { getPriceDetailById, getPriceDetails, deletePriceDetail } = require("../routes/PriceDetails");

const router = {
    initialize: (app, passport) => {
        const auth = passport.authenticate('jwt', { session: false });

        // Auth
        app.post('/loginFront',loginFront)
        app.post('/registerFront',registerFront)

        // User
        app.get('/users', auth, getUsers)
        app.get('/users/:id', auth, getUserById)
        app.delete('/users/:id', auth, deleteUser)

        // Item
        app.get('/items', auth, getItems)
        app.delete('/items/:id', auth, deleteItem)
        app.get('/items/:id', auth, getItemById)

        // Rental
        app.get('/rentals', auth, getRentals)
        app.delete('/rentals/:id', auth, deleteRental)
        app.get('/rentals/:id', auth, getRentalById)

        // Certification
        app.get('/certifications', auth, getCertifications)
        app.delete('/certifications/:id', auth, deleteCertification)
        app.get('/certifications/:id', auth, getCertificationById)

        // Price details
        app.get('/priceDetails', auth, getPriceDetails)
        app.delete('/priceDetails/:id', auth, deletePriceDetail)
        app.get('/priceDetails/:id', auth, getPriceDetailById)
    }
}

module.exports = router;