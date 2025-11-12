const Listing=require("./models/listing");
const Review=require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{

     if(!req.isAuthenticated()){
            req.session.redirectUrl=req.originalUrl;
            
            req.flash("error","you must be login");
            return res.redirect("/login");
        }
        next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();

}

module.exports.isOwner=async(req,res,next)=>{
     let {id}=req.params;
        let foundListing=await Listing.findById(id);
        if(!foundListing.owner.equals(res.locals.currentUser._id)){
            req.flash("error","you are not authorized to update this listing");
           return res.redirect(`/listings/${id}`);
        }
        next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
       let review=await Review.findById(reviewId);
       if(!review.author.equals(res.locals.currentUser._id)){
           req.flash("error","you are not the author of this review");
          return res.redirect(`/listings/${id}`);
       }
       next();
}

 
