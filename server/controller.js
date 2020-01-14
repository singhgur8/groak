const {Users, Dishes} = require('../db/model.js');
const {findCommonFood} = require('./logic.js')
var currentClientCoordinates;
var eatersList = [];
var eatersInfoPromises = [];
const axios = require('axios')
const { yelpKey } = require('../config.js')

axios.defaults.headers.common['Authorization'] = yelpKey;
// Make practice API calls to yelp here
    // see what the API call should look like, like how is the filter going to work
    // what am I filter by??
    // by location, default radius, default price range, default star ratings
    // main filter will be by cusine, if i can or by food type that my algorithm decides on
    // my algorithm will decide based on overlapping and weights of people preferences

// https://api.yelp.com/v3/businesses/search?limit=20&latitude=37.7875753&longitude=-122.3965482&categories=burger&term=indian
// sometimes i get better results if i switch around term and category inputs


module.exports = {
    setLocation: function(req,res) {
        currentClientCoordinates = req.body
        res.send(currentClientCoordinates);
    },
    addEater: function(req, res) {
        eatersList.push(req.body.username)
        res.send()
    },
    createFriend: function(req, res) {
        res.send()
    },
    getRestaurant: function(req, res) {
        for (var i = 0; i < eatersList.length; i++) {

            // create new array of all the users info
            var promise = Users.findOne({ name: eatersList[i].toLowerCase()}).exec()
            eatersInfoPromises.push(promise)
        }
        // console.log(eatersInfoPromises)
        Promise.all(eatersInfoPromises)
        .then((data) => {
            // console.log('DATA FROM ALL PROMISEs', data)
            var cuisineDish = findCommonFood(data); // some array of two, first the cuisine and then the dish
            // Not getting enough variety of data
            
            // to make a yelp api call and return the first retaurant it finds
            const  {latitude, longitude} = currentClientCoordinates

            axios.get(`https://api.yelp.com/v3/businesses/search?limit=2&latitude=${latitude}&longitude=${longitude}&categories=${cuisineDish}&term=${cuisineDish}`)
            .then(data => {
                console.log(cuisineDish, data.data)
                var obj = {
                    filter: cuisineDish,
                    restaurant: data.data.businesses[0]
                }
                res.send(200, obj)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            })
        })

    },
    getUserInfo: function(req,res) {
        let name = req.params.user.split("_").join(" ")
        Users.findOne({ name: name})
        .then((data) => {
            if (data === null) {
                res.status(400).send();
            } else {
                res.send(data);
            }
        })
    }
        

}



