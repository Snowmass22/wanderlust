const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require('ejs-mate');//templating ke liye
const wrapAsync=require("./utils/wrapasync");//error handling
const ExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema}=require("./schema");//schema validation
const Review=require("./models/review");
const passport=require("passport");
const LocalStrategy=require("passport-local");
 


const User=require("./models/user");//user schema
const listingRouter=require("./routes/listing");
const reviewRouter=require("./routes/review");
const userRouter=require("./routes/user");
const session=require("express-session");
const flash=require("connect-flash");
 

 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);

const sessionOptions={
    secret:"mysupersecretcode",
    resve:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,//to prevent xss attack
    }
    
};


 

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

main()
.then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log(err);   
})

async function main(){
    await mongoose.connect(MONGO_URL);
}



app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.use(session(sessionOptions));//session
app.use(flash());
app.use(passport.initialize());//passport initilze
app.use(passport.session());//passport session
passport.use(new LocalStrategy(User.authenticate()));//middleware for passport

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
     res.locals.currentUser=req.user;
    next();
});



app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

    app.use((err,req,res,next)=>{
        let {statusCode=500,message="something went wrong"}=err;
        /* res.status(statusCode).send(message); */
        res.status(statusCode).render("error.ejs",{err});
    })

app.listen(8080,()=>{
    console.log("server is working");
});