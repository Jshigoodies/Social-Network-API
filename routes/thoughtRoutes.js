const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const User = require("../models/User");

// Get all thoughts
router.get('/', async (req, res) => {
    //res.send("hi");
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get a single thought by id
router.get('/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ msg: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});


// Create a new thought
router.post('/', async (req, res) => {
    try {
      const { thoughtText, username, userId} = req.body;
      const thought = new Thought({ thoughtText, username });
      await thought.save();

      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
  
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});

// Update a thought by id
router.put('/:id', async (req, res) => {
    try {
      const { thoughtText } = req.body;
      const thought = await Thought.findByIdAndUpdate(
        req.params.id,
        { thoughtText },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ msg: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});

router.delete('/:id/user/:userId', async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (!thought) {
        return res.status(404).json({ msg: 'Thought not found' });
      }
      // Remove the thought id from the associated user's thoughts array field
      // Assuming the user's model has a `thoughts` field
      // that's an array of thought ids
      // And `userId` is the id of the associated user
      await User.findByIdAndUpdate(req.params.userId, { $pull: { thoughts: thought._id } });
      res.json({ msg: 'Thought deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
  
      thought.reactions.push(req.body);
      await thought.save();
  
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
  
      if (!thought) {
        return res.status(404).json({ error: 'Thought not found' });
      }
  
      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction.reactionId.toString() === req.params.reactionId
      );
  
      if (reactionIndex === -1) {
        return res.status(404).json({ error: 'Reaction not found' });
      }
  
      thought.reactions.splice(reactionIndex, 1);
      await thought.save();
  
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;