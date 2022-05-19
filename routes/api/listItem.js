const ListItem = require('../../models/ListItem');
const Auth = require('../../middleware/auth');

const express = require('express');
const router = express.Router();

// @route   GET api/listItem/:listTitle
// @desc    return 1 list
// @access  Private
router.get('/:listId', Auth, async (req, res) => {
  try {
    const list = await ListItem.find({ listId: req.params.listId });
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
    const items = await ListItem.find({ parentId: item._id });
    await ListItem.deleteMany({ parentId: item._id });

    function x(items) {
      if (items.length > 0) {
        items.map(async (item1) => {
          const itemsx = await ListItem.find({ parentId: item1._id });
          await ListItem.deleteMany({ parentId: item1._id });
          x(itemsx);
        });
      }
    }
    x(items);
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
  const { listId, parentId, title, checked } = req.body;
  const postItem = {};
  postItem.listId = listId;
  postItem.parentId = parentId;
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
  const { listId, parentId, title, checked } = req.body;
  const postItem = {};
  postItem.listId = listId;
  postItem.parentId = parentId;
  postItem.title = title;
  postItem.checked = checked;

  try {
    const item = await ListItem.findOneAndUpdate({ _id: req.params._id }, postItem, {
      returnDocument: 'after',
    });
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
