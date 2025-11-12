const express=require('express');
const router=express.Router();
const User=require("../models/user");
const passport=require("passport");
const wrapasync=require("../utils/wrapasync");
const { saveRedirectUrl } = require('../middleware');
 



router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup", wrapasync(async (req, res, next) => {
    try {
        console.log("User signup request received.");
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        console.log(`Attempting to register new user: ${username}`);
        const registeredUser = await User.register(newUser, password);
        console.log("User registered successfully:", registeredUser);
        req.flash("success", "Welcome to Wanderlust! You are now registered.");
        // Automatically log in the user after successful signup
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        console.error("Signup error:", e.message);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");

})

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureFlash:true,failureRedirect:"/login"}),(req,res)=>{
    req.flash("success","welcome back");
    res.redirect(res.locals.redirectUrl||"/listings");
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
})


router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
})

module.exports=router;