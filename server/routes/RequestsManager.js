const {
  loginFront,
  registerFront,
  loginDashboard,
  registerDashboard,
  loginBack,
  registerBack,
  roleChecker,
} = require("./Auth");
const {
  getItemById,
  getItems,
  deleteItem,
  createItem,
  getItemsByCategoryId,
  checkIfAvailable,
  getReviewsByItemId,
  calculatePriceforItem,
  editItem,
} = require("./Item");
const {
  getUserById,
  getUsers,
  getUsersByRole,
  deleteUser,
  createUser,
  getRentalsByUserId,
  editUser,
  getReviewsByUserId,
  editUserAdvanced,
  getUserDamage,
  getUsersTotalDamage,
  getEmployerRevenue,
  getEmployersTotalRevenue,
  getClientsTotalRevenue
} = require("./User");
const {
  getRentalById,
  getRentals,
  deleteRental,
  createRental,
  editRental,
} = require("./Rental");
const {
  getCertificationById,
  getCertifications,
  deleteCertification,
  createCertification,
} = require("./Certification");
const { getPriceDetail } = require("./PriceDetails");
const {
  getPropertyById,
  getProperties,
  deleteProperty,
  createProperty,
  editProperty,
} = require("./Property");
const {
  getPropertyValueById,
  getPropertyValues,
  deletePropertyValue,
  createPropertyValue,
  editPropertyValue,
} = require("./PropertyValue");
const {
  getCategoryById,
  getCategories,
  deleteCategory,
  createCategory,
  editCategory,
} = require("./Category");
const {
  getKitById,
  getKits,
  deleteKit,
  createKit,
  calculatePriceforKit,
  getReviewsByKitId,
  editKit,
} = require("./Kit");
const {
  getReviewById,
  getReviews,
  deleteReview,
  createReview,
  editReview,
} = require("./Review");
const {
  getGroupById,
  getGroups,
  deleteGroup,
  createGroup,
  editGroup,
} = require("./Group");

const requestManager = async (reqName, req, res) => {
  //TODO: new attribute to rentals ?
  try {
    var toReturn = null;
    switch (reqName) {
      ////////////////////////////////////////////////////////////////////////// Auth
      case "loginFront": {
        toReturn = await loginFront(req.body.username, req.body.password);
        break;
      }

      case "registerFront": {
        toReturn = await registerFront(req.body);
        break;
      }

      case "loginDashboard": {
        toReturn = await loginDashboard(req.body.username, req.body.password);
        break;
      }

      case "registerDashboard": {
        toReturn = await registerDashboard(req.body);
        break;
      }

      case "loginBack": {
        toReturn = await loginBack(req.body.username, req.body.password);
        break;
      }

      case "registerBack": {
        toReturn = await registerBack(req.body);
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteItem(req.params.id);
        break;
      }
      case "createItem": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createItem(req.body);
        break;
      }
      case "editItem": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editItem(req.params.id, req.body);
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
        if (req.user)
          toReturn = await calculatePriceforItem(
            req.body,
            req.params.id,
            req.user.user._id
          );
        else
          toReturn = await calculatePriceforItem(req.body, req.params.id, null);
        break;
      }

      ////////////////////////////////////////////////////////////////////////// User
      case "getUserById": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUserById(req.params.id);
        break;
      }
      case "getUsers": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUsers();
        break;
      }
      case "getManagers": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUsersByRole("manager");
        break;
      }
      case "getEmployers": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUsersByRole("funzionario");
        break;
      }
      case "getClients": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUsersByRole("cliente");
        break;
      }
      case "deleteUser": {
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteUser(req.params.id);
        break;
      }
      case "createUser": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createUser(req.body);
        break;
      }
      case "editUser": {
        if (roleChecker(req.user.user._id, "funzionario", "return"))
          toReturn = await editUserAdvanced(req.params.id, req.body);
        else toReturn = await editUser(req.params.id, req.body);
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
      case "getUserDamage": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUserDamage(req.params.id);
        break;
      }
      case "getUsersTotalDamage": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getUsersTotalDamage();
        break;
      }
      case "getEmployerRevenue": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getEmployerRevenue(req.params.id);
        break;
      }
      case "getEmployersTotalRevenue": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getEmployersTotalRevenue();
        break;
      }

      case "getClientsTotalRevenue": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await getClientsTotalRevenue();
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteRental(req.params.id);
        break;
      }
      case "createRental": {
        toReturn = await createRental(
          req.body,
          req.user.user._id,
          req.user.user.role
        );
        break;
      }
      case "editRental": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editRental(req.params.id, req.body);
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteCertification(req.params.id);
        break;
      }
      case "createCertification": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createCertification(req.body);
        break;
      }

      ////////////////////////////////////////////////////////////////////////// Price detail
      case "getPriceDetail": {
        roleChecker(req.user.user._id, "funzionario", "block");
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteProperty(req.params.id);
        break;
      }
      case "createProperty": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createProperty(req.body);
        break;
      }
      case "editProperty": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editProperty(req.params.id, req.body);
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deletePropertyValue(req.params.id);
        break;
      }
      case "createPropertyValue": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createPropertyValue(req.body);
        break;
      }
      case "editPropertyValue": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editPropertyValue(req.params.id, req.body);
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteCategory(req.params.id);
        break;
      }
      case "createCategory": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createCategory(req.body);
        break;
      }
      case "editCategory": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editCategory(req.params.id, req.body);
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteKit(req.params.id);
        break;
      }
      case "createKit": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createKit(req.body);
        break;
      }
      case "editKit": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editKit(req.params.id, req.body);
        break;
      }
      case "calculatePriceforKit": {
        if (req.user)
          toReturn = await calculatePriceforKit(
            req.body,
            req.params.id,
            req.user.user._id
          );
        else
          toReturn = await calculatePriceforKit(req.body, req.params.id, null);
        break;
      }
      case "getReviewsByKitId": {
        toReturn = await getReviewsByKitId(req.params.id);
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
        if (roleChecker(req.user.user._id, "funzionario", "return"))
          await deleteReview(req.params.id);
        // advanced version
        else await deleteReview(req.params.id);
        break;
      }
      case "createReview": {
        toReturn = await createReview(req.body, req.user.user._id);
        break;
      }
      case "editReview": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editReview(req.params.id, req.body);
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
        roleChecker(req.user.user._id, "funzionario", "block");
        await deleteGroup(req.params.id);
        break;
      }
      case "createGroup": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await createGroup(req.body);
        break;
      }
      case "editGroup": {
        roleChecker(req.user.user._id, "funzionario", "block");
        toReturn = await editGroup(req.params.id, req.body);
        break;
      }

      default:
        console.log("ti sei scordato di inserire un case");
    }
    //console.log(reqName)
    //console.log(toReturn);
    if (!toReturn) res.send();
    else res.send(toReturn);
  } catch (err) {
    res.handle(err);
  }
};

module.exports = {
  requestManager,
};
