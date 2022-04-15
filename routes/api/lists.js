const List = require('../../models/list');
const Auth = require('../../middleware/auth');

const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

// @route   GET api/lists
// @desc    Get all lists
// @access  Private
router.get('/', Auth, async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/lists/:id
// @desc    Delete one list
// @access  Private
router.delete('/:_id', Auth, async (req, res) => {
  try {
    await List.findOneAndRemove({ _id: req.params._id });
    res.json({ msg: 'List Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/lists
// @desc    Create one list
// @access  Private
router.post('/', Auth, async (req, res) => {
  const { title } = req.body;
  const postItem = {};
  if (title) postItem.title = title;

  try {
    const item = new List(postItem);
    await item.save();
    res.json({
      item: item,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
