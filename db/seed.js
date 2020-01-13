const {Dishes , Users} = require('../db/model.js');
const mongoose = require('mongoose');

// Due to time crunch I will not be making my own dishes table of cusines and what not
// WARNING: Before I seed I need to match the data in my database to match that of 
// how yelp references things. There needs to be a standard.

// I might be able to simplify things even more by just

const usersList = [
  'Gurjot Singh',
  'Sona Singh',
  'Strider Wilson',
  'Kelly Willard',
  'Nick Holke'
];

const cuisineDishList = [
  {cuisine: 'Italian',dish:'Pizza'},
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





// Clean collection Before Seeding
db.Listing.remove({}, () => {
  console.log('collection was cleared! Will seed now');
});

// create document and save to data base
const document = new db.Listing({
  // name: houseName,
  // urls: urlArr,
});

document.save(() => {
  mongoose.connection.close();
});