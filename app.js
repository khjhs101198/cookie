const express = require("express");
const app = express();
const urlencoded = express.urlencoded({extended: false});
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(urlencoded, jsonParser);
app.use(express.static("./public"));

app.get("/", function(req, res){

  res.set("Set-Cookie", ["name=Jimmy; SameSite=None; Secure"]);

  res.render("main");
});

app.get("/img", function(req, res){
  res.set("Set-Cookie", "test=getImg");
  res.sendFile(__dirname+"/public/images/w18.jpg");
});

app.listen(process.env.PORT||5000, function(err){
  if(err) throw err;
  console.log("Sever started");
});
