const express = require('express');
const app = express();
const path = require('path');
const model = require('../db/model.js');
const cors = require('cors');
const controller = require('./controller.js')
const port = 3004;
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:user', express.static(path.join(__dirname, '../public')));
// app.use('/bundle.js', express.static(path.join(__dirname, '../public/bundle.js')));
  
app.post('/coordinates', (req, res) => {
  controller.setLocation(req, res)
})

app.post('/addEater', (req,res) => {
  controller.addEater(req,res)
})

app.post('/createFriend', (req,res) => {
  controller.createFriend(req,res)
})

app.get('/api/getRestaurant', (req,res) => {
  controller.getRestaurant(req,res)
})

app.get('/:user/friends', (req,res) => {
  controller.getUserInfo(req,res)
})

app.listen(port, () => {
  console.log(`listening at port !!! ${port}`);
});
