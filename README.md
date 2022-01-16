# Basic Node+Express+EJS Revision

Dependencies used:
1. dotenv
2. method-override
3. nodemon

## REST (Representational state transfer)
REST just a set of principles that describe how networked resources are accessed and manipulated.
We have [7 RESTful routes](https://gist.github.com/alexpchin/09939db6f81d654af06b) that allow us basic operations for reading and manipulating a collection of data:
| **URL**          | **HTTP Verb** | **Action** |
| ---------------- | ------------- | ---------- |
| /photos/         | GET           | index      |
| /photos/:id      | GET           | show       |
| /photos/new      | GET           | new        |
| /photos          | POST          | create     |
| /photos/:id/edit | GET           | edit       |
| /photos/:id      | PATCH/PUT     | update     |
| /photos/:id      | DELETE        | destroy    |

## Key middlewares
### Simple Middleware Concept
```javascript
app.use((req, res, next) => {
  console.log("I run for all routes");
  next();
});
```
### Public Folder: access static CSS
```javascript
// tells express to try to match requests with files in the directory called 'public'
app.use(express.static("public"));
```
### Method-override: use DELETE in forms
```javascript
// forms cant make DELETE request by default. Only POST & GET
// methodOverride package can work around this
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
```

### Body-parser
```javascript
/*
Our POST request is sending in data (an object with key value pairs) in the request body.
However, the HTTP protocol just sends ( url encoded) strings. 
Our express app has no idea what to do with this string.
The below code take incoming strings from the body that are url encoded and parse them into an
object that can be accessed in the request parameter as a property called body.
*/
app.use(express.urlencoded({ extended: false }));
```
## Using cURL on terminal
### Using cURL to test a POST request
For each new key/value pair, add a new `-d property="value"` argument
```bash
curl -X POST -d name="kiwi" -d color="green" -d readyToEat="on" localhost:3000/fruits
```
### Using cURL to test a DELETE request
```bash
curl -X DELETE localhost:3000/fruits/1
```
### Using cURL to test a DELETE request
```bash
curl -X PUT -d name="tomato" -d color="red" localhost:3000/fruits/2
```
