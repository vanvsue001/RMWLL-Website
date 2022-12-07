const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const expressValidator = require('express-validator')

const app = express();
var corsOptions = {
  //origin: "http://localhost:8080",
  orgin: "http://127.0.0.1:5502/" //for LMS5 to connect to frontend
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//validator
app.use(expressValidator());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/team.routes")(app);
// set port, listen for requests
//const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
