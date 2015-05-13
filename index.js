var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var RandomStr = require("randomstring");

var app = express();

var viewsDir = path.join(process.cwd(), "views");
var shortUrls = {};

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/", function(req, res){
	var homePath = path.join(viewsDir, "home.html");
	res.sendFile(homePath);
});

app.post("/urls", function(req, res){
	var genRandStr = RandomStr.generate();
	shortUrls[genRandStr] = req.body.url;

	var randUrl = "localhost:3000/urls/" + genRandStr;
	res.send('Go to <a href="http://'+ randUrl + '">' + randUrl + '</a>');
});

app.get("/urls/:key", function(req, res){
	var key = shortUrls[req.params.key];
	res.redirect(key);
});

app.listen(3000, function () {
    console.log("You're up and running buddy");
});