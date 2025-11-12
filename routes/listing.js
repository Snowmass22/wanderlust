const express=require('express');
const app=express();
const router=express.Router();
const wrapAsync=require("../utils/wrapasync");//error handling
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");
const listing=require("../models/listing");
const {isLoggedIn, isOwner}=require("../middleware");
const listingController=require("../controllers/listings");
const reviewController=require("../controllers/review");

const validateListing=(req,res,next)=>{
     let {error}=listingSchema.validate(req.body);
            
           if(error){
            let errmessage=error.details.map((el)=> el.message).join(",");
 
            throw new ExpressError(400,errmessage);
           }
           else{
            next();
           }

};

router.get("/",wrapAsync(listingController.index));



    //new route
    router.get("/new",isLoggedIn,listingController.renderNewForm);

    //show route
    router.get("/:id",wrapAsync(listingController.showListing));

    //create route
    router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createlisting));

    //edit route
    router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

    // book router
router.get("/:id/book",isLoggedIn,wrapAsync(listingController.renderBookForm));
//display confirmation
router.post("/:id/book",isLoggedIn,wrapAsync(listingController.createBooking));
router.get("/:id/book/confirmation",isLoggedIn,wrapAsync(listingController.confirmation));

    //update route
    router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updatelisting));

    //to create a new listing
    
    //delete route
    router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));

    module.exports=router;
    



 