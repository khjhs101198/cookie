const express = require("express");
const cookieParser = require("cookie-parser");
const filter = require("./public/scripts/filter");
const app = express();
const urlencoded = express.urlencoded({extended: false});
const jsonParser = express.json();

app.set("view engine", "ejs");
app.use(urlencoded, jsonParser, cookieParser());
app.use(express.static("./public"));

app.get("/", function(req, res){
  res.render("main");
});

app.get("/cookies/outerInf", function(req, res){
  if(req.cookies.viewHis===undefined) {
    res.sendFile(__dirname+"/public/images/w18.jpg"); // Default images
  }
  else {
    res.sendFile(__dirname+`/public/images/${filter(req.cookies.viewHis)}.png`)
  }
});

app.put("/cookies/modifyCookie", function(req, res) {
  if(req.cookies.viewHis===undefined) {
    res.cookie("viewHis", `ct1${req.body.type}1`, {sameSite: "None" ,secure: true, path: "/cookies", httpOnly: true, maxAge: 115200000});
  }
  else {
    let cc = req.cookies.viewHis;
    let curCount = Number( cc.match(`(?<=ct)[0-9]*`) );
    if(curCount<10) {
      res.cookie("viewHis", `${cc.replace( new RegExp("(?<=ct)[0-9]*"), curCount+1)}${req.body.type}1`, {sameSite: "None" ,secure: true, path: "/cookies", httpOnly: true, maxAge: 115200000});
    }
    else {
      res.cookie("viewHis", `${cc.replace( new RegExp("ct10[A-Z,a-z]*1"), "ct10")}${req.body.type}1`, {sameSite: "None" ,secure: true, path: "/cookies", httpOnly: true, maxAge: 115200000});
    }
  }
  res.send("Modify cookies successfully!");
});

app.listen(process.env.PORT||5000, function(err){
  if(err) throw err;
  console.log("Sever started");
});
