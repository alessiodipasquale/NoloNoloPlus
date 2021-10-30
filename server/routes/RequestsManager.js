const { loginFront, registerFront, loginDashboard, registerDashboard, loginBack, registerBack } = require("./Auth");
const { getItemById, getItems, deleteItem, createItem, getItemsByCategoryId, checkIfAvailable, getReviewsByItemId, calculatePriceforItem } = require("./Item");
const { getUserById, getUsers, deleteUser, createUser, getRentalsByUserId, editUser, getReviewsByUserId } = require("./User");
const { getRentalById, getRentals, deleteRental, createRental } = require("./Rental");
const { getCertificationById, getCertifications, deleteCertification, createCertification } = require("./Certification");
const { getPriceDetail} = require("./PriceDetails");
const { getPropertyById, getProperties, deleteProperty, createProperty } = require("./Property");
const { getPropertyValueById, getPropertyValues, deletePropertyValue, createPropertyValue } = require("./PropertyValue");
const { getCategoryById, getCategories, deleteCategory, createCategory } = require("./Category");
const { getKitById, getKits, deleteKit, createKit, calculatePriceforKit } = require("./Kit");
const { getReviewById, getReviews, deleteReview, createReview } = require("./Review");
const { getGroupById, getGroups, deleteGroup, createGroup } = require("./Group");

const requestManager = async (reqName, req, res) => {
    //TODO: fix restitution of price and properties in getRentals  //partially fixed?
    //TODO: fix price for unauthenticated users
    //TODO: pass reviews in items in /users/id/rentals
    //TODO: add editing endpoint for all. Remaining: item, rental, certification, pricDet, prop, propVal, category, kit, review, group 
    try {
        var toReturn = null;
        switch (reqName) {
            ////////////////////////////////////////////////////////////////////////// Auth
            case "loginFront": {
                toReturn = await loginFront(req.body.username, req.body.password)

                break;
            }

            case "registerFront": {
                toReturn = await registerFront(req.body)
                break;
            }

            case "loginDashboard": {
                toReturn = await loginDashboard(req.body.username, req.body.password)

                break;
            }

            case "registerDashboard": {
                toReturn = await registerDashboard(req.body)
                break;
            }

            case "loginBack": {
                toReturn = await loginBack(req.body.username, req.body.password)

                break;
            }

            case "registerBack": {
                toReturn = await registerBack(req.body)
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
            case "checkIfAvailable": {
                toReturn = await checkIfAvailable(req.body);
                break;
            }
            case "getReviewsByItemId": {
                toReturn = await getReviewsByItemId(req.params.id);
                break;
            }
            case "calculatePriceforItem": {
                if(req.user)
                    toReturn = await calculatePriceforItem(req.body,req.params.id, req.user.user._id);
                else toReturn = await calculatePriceforItem(req.body,req.params.id, null);
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
            case "editUser": {
                toReturn = await editUser(req.user.user._id,req.body);
                break;
            }
            case "getRentalsByUserId": {
                toReturn = await getRentalsByUserId(req.user.user._id);
                break;
            }
            case "getReviewsByUserId": {
                toReturn = await getReviewsByUserId(req.user.user._id);
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
                toReturn = await createRental(req.body,req.user.user._id, req.user.user.role);
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
            case "getPriceDetail": {
                toReturn = await getPriceDetail();
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

            ////////////////////////////////////////////////////////////////////////// PropertyValue
            case "getPropertyValueById": {
                toReturn = await getPropertyValueById(req.params.id);
                break;
            }
            case "getPropertyValues": {
                toReturn = await getPropertyValues();
                break;
            }
            case "deletePropertyValue": {
                await deletePropertyValue(req.params.id);
                break;
            }
            case "createPropertyValue": {
                toReturn = await createPropertyValue(req.body);
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
                await deleteCategory(req.params.id);
                break;
            }
            case "createCategory": {
                toReturn = await createCategory(req.body);
                break;
            }

            case "getItemsByCategoryId": {
                toReturn = await getItemsByCategoryId(req.params.categoryId);
                break;
            }
            ////////////////////////////////////////////////////////////////////////// Kit
            case "getKitById": {
                toReturn = await getKitById(req.params.id);
                break;
            }
            case "getKits": {
                toReturn = await getKits();
                break;
            }
            case "deleteKit": {
                await deleteKit(req.params.id);
                break;
            }
            case "createKit": {
                toReturn = await createKit(req.body);
                break;
            }
            case "calculatePriceforKit": {
                if(req.user)
                    toReturn = await calculatePriceforKit(req.body,req.params.id, req.user.user._id);
                else toReturn = await calculatePriceforKit(req.body,req.params.id, null);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Review
            case "getReviewById": {
                toReturn = await getReviewById(req.params.id);
                break;
            }
            case "getReviews": {
                toReturn = await getReviews();
                break;
            }
            case "deleteReview": {
                await deleteReview(req.params.id);
                break;
            }
            case "createReview": {
                toReturn = await createReview(req.body,req.user.user._id);
                break;
            }

            ////////////////////////////////////////////////////////////////////////// Group
            case "getGroupById": {
                toReturn = await getGroupById(req.params.id);
                break;
            }
            case "getGroups": {
                toReturn = await getGroups();
                break;
            }
            case "deleteGroup": {
                await deleteGroup(req.params.id);
                break;
            }
            case "createGroup": {
                toReturn = await createGroup(req.body);
                break;
            }

            default:
                console.log("ti sei scordato di inserire un case");
        }
        //console.log(toReturn);
        if(!toReturn) res.send();
        else res.send(toReturn);
    } catch(err) {
        res.handle(err);
    }
} 

module.exports = {
    requestManager
}