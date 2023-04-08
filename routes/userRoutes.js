const express = require('express');
const router = express.Router();

const User = require("../models/User");
const Thought = require("../models/Thought")

// Get all users
router.get('/', (req, res) => {
    //res.send("here");

    User.find({})
        .then(users => res.send(users))
        .catch(err => console.log(err));
});

// Create a new user
router.post('/', (req, res) => {
    const { username, email } = req.body;
    const user = new User({ username, email });
    user.save()
      .then(() => res.send('User created'))
      .catch(err => console.log(err));
});

// Get a user by ID
router.get('/:id', (req, res) => {
User.findById(req.params.id)
    .populate('thoughts') // populate the 'thoughts' field
    .populate('friends') // populate the 'friends' field
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

// Update a user by ID
router.put('/:id', (req, res) => {
const { username, email } = req.body;
User.findByIdAndUpdate(req.params.id, { username, email }, { new: true })
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
User.findByIdAndDelete(req.params.id)
    .then(() => res.send('User deleted'))
    .catch(err => console.log(err));
});


router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friend = await User.findById(req.params.friendId);
    
        if (!user || !friend) {
          return res.status(404).send('User or friend not found');
        }
        
        //so they don't add the same friend
        if (user.friends.includes(req.params.friendId)) {
          return res.status(400).send('Friend already added');
        }
    
        user.friends.push(req.params.friendId);
        await user.save();
    
        res.send({
          user: user,
          friend: friend
        });
      } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
      }
});


module.exports = router;