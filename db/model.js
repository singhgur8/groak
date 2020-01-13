const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/groak';

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(mongoUri, { useNewUrlParser: true }).then(() => {
    console.log('MongoDB is connected');
  }).catch((err) => {
    console.log('unsuccessful, retry after 5 seconds.', err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

mongoose.Promise = global.Promise;


// Schemas for Collection of Users
const friendSchema = new mongoose.Schema({ friendName : String });
const dishSchema = new mongoose.Schema({
  cuisine: String,
  dishName: String
}, {strict: false})

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  friends: [friendSchema],
  friend: friendSchema,
  preferences: [dishSchema],
  preference: dishSchema,
  recentFoods: [dishSchema],
  recentFood: dishSchema
}, {strict: false})

// Schema for Collection of Existing Cusines and Dishes
// just reuse the schema made for dishschema

module.exports = {
  Dishes: mongoose.model('Dishes', dishSchema),
  Users: mongoose.model('Users', userSchema)
}