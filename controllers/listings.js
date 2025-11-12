const listing=require("../models/listing");
const order = require("../models/order");
const Review=require("../models/review");

module.exports.index=async(req,res)=>{
     const all_listings=await listing.find({});
     res.render("listings/index.ejs",{all_listings});

    };

module.exports.renderNewForm=(req,res)=>{
        console.log(req.user);
        
        res.render("listings/new")
    };
module.exports.showListing=async(req,res)=>{
        let {id}=req.params;
        const foundListing=await listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
        if(!foundListing){
            req.flash("error","listing does not exists");
            res.redirect("/listings");
        }
        res.render("listings/show.ejs",{listing: foundListing});
    }
module.exports.createlisting=async(req,res,next)=>{
        const newListing = new listing(req.body.listing);
        newListing.owner = req.user._id;

        // If the image field is empty, the schema's default will be used.
        // If a URL is provided, it will be set.
        // This explicit check is good practice but relies on the schema's `set` and `default`.

        await newListing.save();
        req.flash("success", "new listing created");
        res.redirect(`/listings/${newListing._id}`);
    }
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    let foundListing=await listing.findById(id);
    if(!foundListing){
        req.flash("error","listing you requested does not exits");
        return res.redirect("/listings");
    
    }
    res.render("listings/edit.ejs",{listing:foundListing});

};

module.exports.updatelisting=async(req,res)=>{
        let {id}=req.params;
        await listing.findByIdAndUpdate(id,{...req.body.listing});
        req.flash("success","listing updated");
        res.redirect(`/listings/${id}`);
    };
module.exports.deletelisting=async(req,res)=>{
        let {id}=req.params;
        await listing.findByIdAndDelete(id);
        req.flash("success"," listing deleted");
        res.redirect("/listings");
    };

module.exports.renderBookForm = async (req, res) => {
    let { id } = req.params;
    const foundListing = await listing.findById(id);
    if (!foundListing) {
        req.flash("error", "Listing you requested does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/book.ejs", { listing: foundListing });
};

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const foundListing = await listing.findById(id);
    const newOrder = new order(req.body.order);
    newOrder.buyer = req.user._id;
    newOrder.seller = foundListing.owner;
    newOrder.listing = id;
    await newOrder.save();
    req.flash("success", "Booking confirmed!");
    // Redirect to confirmation page, passing the new order's ID
    res.redirect(`/listings/${id}/book/confirmation?orderId=${newOrder._id}`);
};

module.exports.confirmation = async (req, res) => {
    const { orderId } = req.query; // Get orderId from query parameters

    if (!orderId) {
        req.flash("error", "Booking details not found.");
        return res.redirect("/listings"); // Redirect if orderId is missing
    }

    // Find the order and populate its associated listing and buyer
    const confirmedOrder = await order.findById(orderId).populate('listing').populate('buyer');

    if (!confirmedOrder || !confirmedOrder.listing) {
        req.flash("error", "Booking or associated listing details could not be retrieved.");
        return res.redirect("/listings");
    }
    res.render("listings/confirmation.ejs", { order: confirmedOrder, listing: confirmedOrder.listing });
};
