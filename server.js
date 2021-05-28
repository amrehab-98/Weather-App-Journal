// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log('server is running...');
    console.log(`this app is running on port: ${port}`);
}

// Respond with JS object when a GET request is made to '/all'
app.get('/all', function (req, res) {
    res.send(projectData);
  });

// post 
app.post('/addData', addData);

function addData(req,res){
  const newEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };

  projectData.push(newEntry);
  console.log(projectData);
}

app.get('/all', getData);
function getData(req, res){
  res.send(projectData)
}