const { loginFront, registerFront } = require("./Auth");
const { getItemById, getItems, deleteItem } = require("./Item");
const { getUserById, getUsers, deleteUser, createUser } = require("./User");
const { getRentalById, getRentals, deleteRental } = require("./Rental");
const { getCertificationById, getCertifications, deleteCertification } = require("./Certification");
const { getPriceDetailById, getPriceDetails, deletePriceDetail } = require("./PriceDetails");
const { getPropertyById, getProperties, deleteProperty } = require("./Property");
const { getCategoryById, getCategories, deleteCategory } = require("./Category");

const requestManager = async (reqName, req, res) => {
    
    try {
        var toReturn = null;
        switch (reqName) {

            ////////////////////////////////////////////////////////////////////////// Auth
            case "loginFront": {
                toReturn = await loginFront(req.body.username, req.body.password)

                break;
            }
            case "registerFront": {
                toReturn = await registerFront(req.body.username, req.body.password)
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Item
            case "getItemById": {
                toReturn = await getItemById(req.params.id);
                break;
            }
            case "getItems": {
                toReturn = await getItems();
                break;
            }
            case "deleteItem": {
                await deleteItem(req.params.id);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// User
            case "getUserById": {
                toReturn = await getUserById(req.params.id);
                break;
            }
            case "getUsers": {
                toReturn = await getUsers();
                break;
            }
            case "deleteUser": {
                await deleteUser(req.params.id);
                break;
            }
            case "createUser": {
                toReturn = await createUser(req.body);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Rental
            case "getRentalById": {
                toReturn = await getRentalById(req.params.id);
                break;
            }
            case "getRentals": {
                toReturn = await getRentals();
                break;
            }
            case "deleteRental": {
                await deleteRental(req.params.id);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Certification
            case "getCertificationById": {
                toReturn = await getCertificationById(req.params.id);
                break;
            }
            case "getCertifications": {
                toReturn = await getCertifications();
                break;
            }
            case "deleteCertification": {
                await deleteCertification(req.params.id);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Price detail
            case "getPriceDetailById": {
                toReturn = await getPriceDetailById(req.params.id);
                break;
            }
            case "getPriceDetails": {
                toReturn = await getPriceDetails();
                break;
            }
            case "deletePriceDetail": {
                await deletePriceDetail(req.params.id);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Property
            case "getPropertyById": {
                toReturn = await getPropertyById(req.params.id);
                break;
            }
            case "getProperties": {
                toReturn = await getProperties();
                break;
            }
            case "deleteProperty": {
                await deleteProperty(req.params.id);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Category
            case "getCategoryById": {
                toReturn = await getCategoryById(req.params.id);
                break;
            }
            case "getCategories": {
                toReturn = await getCategories();
                break;
            }
            case "deleteCategory": {
                await deletePriceDetail(req.params.id);
                break;
            }


            default:
                console.log("ti sei scordato di inserire un case");
        }
        console.log(toReturn);
        if(!toReturn) res.send();
        else res.send(toReturn);
    } catch(err) {
        res.handle(err);
    }
} 

module.exports = {
    requestManager
}