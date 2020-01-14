const {Dishes , Users} = require('../db/model.js');
const mongoose = require('mongoose');

// Due to time crunch I will not be making my own dishes table of cusines and what not
// WARNING: Before I seed I need to match the data in my database to match that of 
// how yelp references things. There needs to be a standard.


const usersList = ['Gurjot Singh','Sona Singh','Strider Wilson','Kelly Willard','Nick Holke' ]; 
// SAVE everyone as lower case so its not case sensitive

const cuisineDishList = [
  {cuisine: 'Italian', dish:'Pizza'},
  {cuisine: 'Indian', dish:'Pizza'},
  {cuisine: 'American', dish:'Burger'},
  {cuisine: 'American', dish:'Salad'},
  {cuisine: 'American', dish:'Beef'},
  {cuisine: 'Mexican', dish:'Beef'},
  {cuisine: 'Thai', dish:'Curry'},
  {cuisine: 'Mexican', dish:'Pizza'},
  {cuisine: 'Mexican', dish:'Chicken'},
  {cuisine: 'Asian', dish:'Fusion'},
  {cuisine: 'Greek', dish:'Pita'},
  {cuisine: 'American', dish:'Meat Balls'},
  {cuisine: 'Vegan', dish:'Pizza'},
  {cuisine: 'Asian', dish:'Mexican'},
  {cuisine: 'American', dish:'Bagel'},
  {cuisine: 'Indian', dish:'Rice'},
  {cuisine: 'Asian', dish:'Rice'},
  {cuisine: 'Thai', dish:'Pad'},
  {cuisine: 'African', dish:'All'},
  {cuisine: 'All', dish:'Sushi'},
];


restrictionsList = [
  'vegetarian friendly', 'vegan', 'allergies', 'gluten friendly'
] // if allergies is the restrictions then find foods without common allergans
// religious restrictions, and allergic

// For my seed script I should make 5 users
  // email formula first+last@gmail.com
  // friends = every user is every users friends for this example
  // preferences will be randomized -- but i need something to pull dishes out of
    // actually this might need to be RESEEEDED if the way I am referencing foods
    // does not align with how yelp does it. ALso look into other APIS not just
    // yelp. bc otherwise how will my logic look like
  // Restrictions - not defined in schema
  // Dislikes - not defined in shcema
  //Recent Foods should randomized. should be length of seven and should ~ this is tricky
    //because I could eat many times a day. I guess this will just be used
    // as a food I do not want for now.
  //RestrictedRestaurants - will be restaurants that are a Absolute NO
  

// My formula will have to give a weight to each of these when trying to find the ideal stop


// iterate through the 5 users and create their profiles
// the script needs a cache so I dont add same dish twice
  // i also want to make sure people dont have too many dislikes or retrictions
  // its okay if some people have none. just pass in an empty arr
  // have a lot of preference, can be more than number of iterations. so double for loop
  // also recent food could e whatever but wont have mucht weight
  //lower case save the food as well


// Clean collection Before Seeding
Users.remove({}, () => {
  console.log('collection was cleared! Will seed now');
});

for (var i = 0; i < usersList.length; i++) {
  console.log(i)
  var cache = {}; // tracks dishes already slected so new one every user
  var user = {}
  user.name = usersList[i].toLowerCase();
  user.email = usersList[i].toLowerCase().split(" ").join("") + '@gmail.com';
  user.friends = usersList.slice()
  user.friends.splice(i,1);
  user.preferences = [];
  var randomNumber = Math.floor(Math.random()*3 + 1)
  // every use will have a random number of favorite dishes from 1-3
  for (var j = 0; j < randomNumber; j++){
    // add a randomly selected dish from dish list, but also cache it so it is not repeated
    var randomDish = Math.floor(Math.random()*cuisineDishList.length)
    if (cache[randomDish] !== undefined) {
      j--
    } else {
      cache[randomDish] = 1;
      user.preferences.push(cuisineDishList[randomDish])
    }
  }

  console.log('Adding the followin user:', user)
  // create document and save to data base
  const document = new Users(user);

  document.save((err) => {
    console.log(err)
    // mongoose.connection.close(); // shouldnt close connection since I have to use it many times
  });
}

