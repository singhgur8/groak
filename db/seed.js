const {Dishes , Users} = require('../db/index.js');
const mongoose = require('mongoose');

const usersList = [
  'Gurjot Singh',
  'Sona Singh',
  'Strider Wilson',
  'Kelly Willard',
  'Nick Holke'
];


// For my seed script I should make 5 users
  // i should just u





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