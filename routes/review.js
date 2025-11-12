const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync");//error handling
const ExpressError=require("../utils/ExpressError");
const {listingSchema,reviewSchema}=require("../schema");//schema validation
const Review=require("../models/review");
const listing=require("../models/listing");
const {isLoggedIn, isOwner, isReviewAuthor}=require("../middleware");
 
const reviewController=require("../controllers/review");
const listingController=require("../controllers/listings");

const validateReview=(req,res,next)=>{
     let {error}=reviewSchema.validate(req.body);
            
           if(error){
            let errmessage=error.details.map((el)=> el.message).join(",");
 
            throw new ExpressError(400,errmessage);
           }
           else{
            next();
           }

};
 //reviews route
    router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.reviews));

  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deletereview));
  
module.exports=router;