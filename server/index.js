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
// app.use('/:id', express.static(path.join(__dirname, '../public')));
// app.use('/bundle.js', express.static(path.join(__dirname, '../public/bundle.js')));
  
app.post('/coordinates', (req, res) => {
  controller.setLocation(req, res)
})

app.post('/addFriend', (req,res) => {
  controller.addFriend
})

app.post('createFriend', (req,res) => {

})

app.get('/restaurant')

app.listen(port, () => {
  console.log(`listening at port !!! ${port}`);
});
