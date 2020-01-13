const db = require('../db/model.js');
var currentClientCoordinates;


// Make practice API calls to yelp here
    // see what the API call should look like, like how is the filter going to work
    // what am I filter by??
    // by location, default radius, default price range, default star ratings
    // main filter will be by cusine, if i can or by food type that my algorithm decides on
    // my algorithm will decide based on overlapping and weights of people preferences

// update the coordinates upon post req from  client. will be prompted on page load

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
        res.send(currentClientCoordinates);
    },
    addFriend: function(req, res) {
        res.send()
    },
    createFriend: function(req, res) {
        res.send()
    },
    getRestaurant: function(req, res) {
        res.send()
    },

        

}



