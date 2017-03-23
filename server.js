const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

 var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}`
  console.log(log);
  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log("An error occured");
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render("maintanance.hbs", {});
});

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
})
hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
})

 app.get("/", (req, res) => {
   res.render("home.hbs", {
     pageTitle: "Welcome Page",
     welcomeMessage: "Pakhair Raghalayyy"
   });
 });

 app.get("/about", (req, res) => {
   res.render("about.hbs", {
     pageTitle: "About Page"
   });
 });

 app.get("/bad", (req, res) => {
   res.send({
     errorMessage: "Masla ho gya ne"
   });
 });

 app.listen(3000, () => {
   console.log("Server is up and running on port 3000");
 });
