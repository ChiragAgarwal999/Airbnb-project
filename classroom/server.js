const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path"); 
const app=express();


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOption={secret:"mySecretString",
                    resave:false,
                    saveUninitialized:true};
app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.errorMsg = req.flash("error");
    res.locals.successMsg = req.flash("success");
    next();
})
// app.get("/register",(req,res)=>{
//     let{name="anonymous"}=req.query;
//     req.session.name=name;
//     console.log(req.session);
//     res.send(name);
// })
app.get("/register",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name=name;
    if(name === "anonymous"){
        req.flash("error","user not register");
    }else{
        req.flash("success","user register successfully");
    } 
    res.redirect("/hello");
})

app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
})

app.listen(3000,()=>{
    console.log("server is listening to port 8080");
});