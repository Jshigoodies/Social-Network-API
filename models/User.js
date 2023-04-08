const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/ // regex to validate email format
  },
  thoughts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
    toJSON: {
        virtuals: true // enable virtual properties to be included when converting the document to JSON
    },
    id: false // disable the '_id' field to be included in the document by default
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  })
  .set(function(value) {
    this.set(value)
  })

const User = mongoose.model('User', userSchema);


//wanted to set some data
// const newUser = {
//     username: 'john_doe',
//     email: 'john_doe@example.com',
//     thoughts: [],
//     friends: []
//   };
  
//   User.create(newUser)
//     .then(dbUser => {
//       console.log(dbUser);
//     })
//     .catch(err => {
//       console.error(err);
//     });

module.exports = User;