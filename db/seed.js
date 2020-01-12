const db = require('../db/index.js');
const mongoose = require('mongoose');

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