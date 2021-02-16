const express = require("express");
const app = express();
const urlencoded = express.urlencoded({extended: false});
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(urlencoded, jsonParser);
app.use(express.static("./public"));
app.use(function addCookie(req, res, next){
  if(!req.headers.cookie||req.headers.cookie.indexOf("user")===-1){ // if no user data cookie
    res.set("Set-Cookie", "userID=123; SameSite=None");
  }
  next();
});

app.get("/", function(req, res){
  res.render("main");
});
// get user profile from cookie
app.get("/outerInf", function(req, res){
  if(req.headers.cookie.indexOf("pcView")===-1) { // no shopping history
    res.send("We did't find any shoppping history");
  }
  else {
    let ck = req.headers.cookie;
    let count = ck.slice(ck.indexOf("pcS")+3, ck.indexOf("pcE") );
    res.send(`Receive the request from outer website, count: ${count}`);
  }
});

app.listen(process.env.PORT||5000, function(err){
  if(err) throw err;
  console.log("Sever started");
});
