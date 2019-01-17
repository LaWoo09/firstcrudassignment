const express = require("express");
const app = express();
const fs = require('fs')
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
app.use(bodyParser.json());
//challenge 1


//makes post to specific route
app.post('/users', (req, res) => {
  fs.readFile("./storage.json", "utf8", function(err, data){
    if(err) throw err;
    let usersName = JSON.parse(data);

    usersName.push(req.body);

    fs.writeFile("./storage.json", JSON.stringify(usersName), (err) => {
      if(err)
        throw err;

      res.sendStatus(200);

    })

  })
});


//challenge 2
//makes get request to route
app.get('/alluser', (req, res) => {
  //read info in file
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    if(err)
      throw err;
      //changes into object
      let userInfo = JSON.parse(data);
      //shows information requested
      res.json(userInfo);
  })
});

//challenege 3
app.get('/users/:name', (req, res) => {
  fs.readFile('./storage.json', 'utf8', (err, data) => {
    if(err)
      throw err;

    let userName = JSON.parse(data);
    //filters through information
    for(let i = 0; i < userName.length; i++) {
      //checks info where key in name matches value in route parameter
      if(userName[i].name == req.params.name){
        res.json(userName[i]);
        console.log("success")
        return;

      }
    }
    res.sendStatus(400)
  })
})

//challenge4
app.put('/users/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data){
    if(err) throw err;
    let usersArr = JSON.parse(data);
    //loops through data
    for(let i = 0; i<usersArr.length; i++){
      //matches data.name and parameter.name
      if(usersArr[i].name == req.params.name){
        //once match is found updates user at that index with the informaion from form input by user
        usersArr[i] = req.body;
        //updates the storage.json file wih new input info
        fs.writeFile('./storage.json', JSON.stringify(usersArr), function(err){
          console.log("success!");
          res.sendStatus(200);
        });
        return;

      }
    }
    res.sendStatus(400);
  })
});

//challenge 5
app.delete('/users/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data){
    if(err) throw err;
    let usersArr = JSON.parse(data);

    for(let i = 0; i<usersArr.length; i++){
      if(usersArr[i].name == req.params.name){
        //chooses [i] = current user to be deleted out of array/object using splice method, the 1 respresents how many are being deleted
        usersArr.splice(i, 1);
        //after deletion, writes new information into storage.json file
        fs.writeFile('./storage.json', JSON.stringify(usersArr), function(err){
          console.log("success!");
          res.sendStatus(200);
        });
        return;

      }
    }
    res.sendStatus(400);
  })
});

app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
