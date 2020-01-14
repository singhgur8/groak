const {Users, Dishes} = require('../db/model.js');
var currentClientCoordinates;
var eatersList = [];

// Make practice API calls to yelp here
    // see what the API call should look like, like how is the filter going to work
    // what am I filter by??
    // by location, default radius, default price range, default star ratings
    // main filter will be by cusine, if i can or by food type that my algorithm decides on
    // my algorithm will decide based on overlapping and weights of people preferences

// https://api.yelp.com/v3/businesses/search?limit=20&latitude=37.7875753&longitude=-122.3965482&categories=burger&term=indian
// sometimes i get better results if i switch around term and category inputs


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
    addEater: function(req, res) {
        eatersList.push(req.body.username)
        console.log('in controller', eatersList)
        res.send()
    },
    createFriend: function(req, res) {
        res.send()
    },
    getRestaurant: function(req, res) {
        res.send()
    },
    getUserInfo: function(req,res) {
        // user is req.params.user.split("_").join(" ")
        let name = req.params.user.split("_").join(" ")
        console.log(name)
        Users.findOne({ name: name})
        .then((data) => {
            // console.log(data)
            // right now the friends list has every one but we dont want the user
            // that made the request, meaning i didnt seed right....


            res.send(data);
        })
    }
        

}



