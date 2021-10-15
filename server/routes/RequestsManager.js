const { loginFront, registerFront } = require("./Auth");
const { getItemById, getItems, deleteItem, createItem } = require("./Item");
const { getUserById, getUsers, deleteUser, createUser } = require("./User");
const { getRentalById, getRentals, deleteRental, createRental } = require("./Rental");
const { getCertificationById, getCertifications, deleteCertification, createCertification } = require("./Certification");
const { getPriceDetailById, getPriceDetails, deletePriceDetail, createPriceDetail } = require("./PriceDetails");
const { getPropertyById, getProperties, deleteProperty, createProperty } = require("./Property");
const { getCategoryById, getCategories, deleteCategory, createCategory } = require("./Category");

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
            case "createItem": {
                toReturn = await createItem(req.body);
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
            case "createRental": {
                toReturn = await createRental(req.body);
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
            case "createCertification": {
                toReturn = await createCertification(req.body);
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
            case "createPriceDetail": {
                toReturn = await createPriceDetail(req.body);
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
            case "createProperty": {
                toReturn = await createProperty(req.body);
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
            case "createCategory": {
                toReturn = await createCategory(req.body);
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