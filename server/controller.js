const db = require('../db/model.js');
var currentClientCoordinates;


// Make practice API calls to yelp here
// I have to get the geo location on the client end
// becasue navigator is accessible by the browser, not node, unless maybe if
// i install an api for it...but then whenever the function would run
// it would get the location of the server not the client.

// update the coordinates upon post req from  client

module.exports = {
    getData: function getAllDataFromDb(id, res) {
        db.Listing.find({})
          .then((data) => {
            console.log('THIS IS THE DATA INSIDE OF THE DB IN THE CONTAINER', data);
            res.send(data[id - 1]);
          })
        },
    setLocation: function(req,res) {
        currentClientCoordinates = req.body
        res.send();
    } 
        

}
