const express = require("express");
const app = express();
const urlencoded = express.urlencoded({extended: false});
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(urlencoded, jsonParser);
app.use(express.static("./public"), auth);

function auth(req, res, next) {
  if(req.headers.cookie.indexOf("name")===-1) {
    res.sendStatus(404);
  }
  else {
    res.send("something");
    next();
  }
}

app.get("/", function(req, res){
  if(!req.headers.cookie) {
    res.set("Set-Cookie", ["name=Jimmy; SameSite=Strict"]);
  }
  res.render("main");
});

app.listen(process.env.PORT||3000, function(err){
  if(err) throw err;
  console.log("Sever started");
});
