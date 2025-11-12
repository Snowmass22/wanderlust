const Review=require("../models/review");
const listing=require("../models/listing");

module.exports.reviews=async(req,res)=>{
        let foundListing = await listing.findById(req.params.id);
        let newReview= new Review(req.body.review);
        newReview.author=req.user._id;
        foundListing.reviews.push(newReview);
        await newReview.save();
        await foundListing.save();
        console.log("new review saved");
        req.flash("success","new review created");
        res.redirect(`/listings/${req.params.id}`);
        
 };
 module.exports.deletereview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","new review deleted");
    res.redirect(`/listings/${id}`);
  };