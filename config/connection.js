const mongoose = require("mongoose");

const uri = 'mongodb://127.0.0.1:27017/socialDB';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error connecting to database', err));


module.exports = mongoose.connection;
