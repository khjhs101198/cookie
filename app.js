const express = require("express");
const app = express();
const urlencoded = express.urlencoded({extended: false});
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(urlencoded, jsonParser);
app.use(express.static("./public"));

app.get("/", function(req, res){
  if(!req.headers.cookie) {
    res.set("Set-Cookie", ["name=Jimmy; SameSite=Strict"]);
  }
  res.render("main");
});

app.get("/img", function(req, res){
  if(req.headers.cookie) {
    res.sendFile(__dirname+"/public/images/w18.jpg");
  }
  else {
    res.send("No cookie");
  }
});

app.listen(process.env.PORT||3000, function(err){
  if(err) throw err;
  console.log("Sever started");
});
