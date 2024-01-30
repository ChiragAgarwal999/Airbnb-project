const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const {isLoggedIn,isOwner,validatelisting} = require("../middleware.js");
const listeningController = require("../conrollers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
      .get( wrapAsync(listeningController.index)) //Index Route
      .post(isLoggedIn,upload.single('listing[image]'),
        validatelisting,wrapAsync(listeningController.createListing)); //Create Route

//New Route
router.get("/new",isLoggedIn,listeningController.renderNewForm);
      
router.route("/:id")
      .get(wrapAsync(listeningController.showListing)) //Show Route
      .put(isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting,wrapAsync(listeningController.updateListing)) //update route
      .delete(isLoggedIn,isOwner,wrapAsync(listeningController.destroyListing)); //Delete route


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listeningController.renderEditForm));

module.exports = router;
