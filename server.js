// DEPENDENCIES
const express = require("express");
require("dotenv").config();

// CONFIGURATION
const app = express();
const port = process.env.PORT;

// 'DATA'
const fruits = require("./models/fruits");
const plants = require("./models/plants");
const isLoggedIn = require("./middleware/auth");

// forms cant make DELETE request by default. Only POST & GET
// methodOverride package can work around this
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// BODY PARSER
/*
Our POST request is sending in data (an object with key value pairs) in the request body.
However, the HTTP protocol just sends ( url encoded) strings. 
Our express app has no idea what to do with this string.
The below code take incoming strings from the body that are url encoded and parse them into an
object that can be accessed in the request parameter as a property called body.
*/
app.use(express.urlencoded({ extended: false }));

// PUBLIC
// tells express to try to match requests with files in the directory called 'public'
app.use(express.static("public"));

// MIDDLEWARE
// middleware code must be above your routes in order to be run before your routes
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});

// ROUTES
// put more specific routes first
app.get("/", (req, res) => {
  console.log("Oh hey! I got a request. Let me respond with something");
  res.send("Hello World!");
});

// put this above your show.ejs file
app.get("/fruits/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/fruits", (req, res) => {
  // res.send(fruits);
  res.render("index.ejs", {
    allFruits: fruits,
  });
});

app.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  fruits.push(req.body);
  res.redirect("/fruits");
  // res.send(req.body);
  // console.log("Create route accessed!");
  // res.send("This route works");
});

app.post("/products", (req, res) => {
  console.log("Create route accessed!");
  console.log("Req.body is: ", req.body);
  res.send(req.body);
});

app.get("/fruits/:index/edit", (req, res) => {
  res.render(
    "edit.ejs", //render views/edit.ejs
    {
      //pass in an object that contains
      fruit: fruits[req.params.index], //the fruit object
      index: req.params.index, //... and its index in the array
    }
  );
});

app.get("/fruits/:indexOfFruitsArray", (req, res) => {
  //   res.send(fruits[req.params.indexOfFruitsArray]);
  const params = req.params.indexOfFruitsArray;

  res.render("show.ejs", {
    fruit: fruits[params],
  });
});

// app.get("/awesome", (req, res) => {
//   res.send(`
//         <h1>Plants are awesome!</h1>
//         <img src="https://static.boredpanda.com/blog/wp-content/uuuploads/plant-sculptures-mosaicultures-internationales-de-montreal/plant-sculptures-mosaicultures-internationales-de-montreal-14.jpg" >
//       `);
// });

app.get("/plants/:indexOfPlantsArray", (req, res) => {
  if (plants[req.params.indexOfPlantsArray]) {
    res.send(plants[req.params.indexOfPlantsArray]);
  } else {
    res.send(
      "cannot find anything at this index: " + req.params.indexOfPlantsArray
    );
  }
});

// multiple params
app.get("/hello/:firstname/:lastname", (req, res) => {
  //   console.log(req.params);
  console.log("=========================================");
  console.log(
    "This is the entire Request Object sent from the browser to the server: "
  );
  console.log(req);
  console.log("========================================");
  res.send("hello " + req.params.firstname + " " + req.params.lastname);
});

// http://localhost:3000/howdy/Edinburgh?title=duke
app.get("/howdy/:firstName", function (req, res) {
  console.log(req.params);
  console.log(req.query);
  res.send("hello " + req.query.title + " " + req.params.firstName);
});

app.delete("/fruits/:index", (req, res) => {
  fruits.splice(req.params.index, 1); //remove the item from the array
  res.redirect("/fruits"); //redirect back to index route
});

app.put("/fruits/:index", (req, res) => {
  // :index is the index of our fruits array that we want to change
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
  fruits[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:index).  Set that element to the value of req.body (the input data)
  res.redirect("/fruits"); //redirect to the index page
});

// APP LISTENER
app.listen(port, () => {
  console.log("I am listening for requests!!!");
});
