const ListItem = require('../../models/listItem');
const Auth = require('../../middleware/auth');

const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
const { route } = require('./lists');

// @route   GET api/listItem/:listTitle
// @desc    return 1 list
// @access  Private
router.get('/:listTitle', Auth, async (req, res) => {
  try {
    const list = await ListItem.find({ listTitle: req.params.listTitle });
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/listItem/:_id
// @desc    Delete one listItem
// @access  Private
router.delete('/:_id', Auth, async (req, res) => {
  try {
    const item = await ListItem.findOneAndRemove({ _id: req.params._id });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/listItem
// @desc    Create one list item
// @access  Private
router.post('/', Auth, async (req, res) => {
  const { listTitle, title, checked } = req.body;
  const postItem = {};
  postItem.listTitle = listTitle;
  postItem.title = title;
  postItem.checked = checked;

  try {
    const item = new ListItem(postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/listItem/:_id
// @desc    Change one list item
// @access  Private
router.put('/:_id', Auth, async (req, res) => {
  const { listTitle, title, checked } = req.body;
  const postItem = {};
  postItem.listTitle = listTitle;
  postItem.title = title;
  postItem.checked = checked;

  try {
    const item = await ListItem.findOneAndUpdate({ _id: req.params._id }, postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
