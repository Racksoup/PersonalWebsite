const JournalPost = require('../../models/JournalPost');
const Auth = require('../../middleware/auth');

const express = require('express');
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const mongoose = require('mongoose');

// ========================
// DATABASE STORAGE METHOD
// ========================

const config = require('config');
const db = config.get('mongoURI');

// Create mongo connection
const conn = mongoose.createConnection(db);

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('journalImages');
});

// Create storage engine
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'journalImages',
          //metadata: req.body,
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// ========================
// DATABASE STORAGE METHOD
// ========================

// @route   POST api/journal
// @desc    Create Journal Post
// @access  Private
router.post('/', [Auth, upload.single('file')], async (req, res) => {
  const { title, text, date } = req.body;

  const postItem = {};
  if (title) postItem.title = title;
  if (text) postItem.text = text;
  if (date) postItem.date = date;
  if (req.file) {
    postItem.image_filename = req.file.filename;
  }

  try {
    const item = new JournalPost(postItem);
    await item.save();
    res.json({
      item: item,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/journal/:_id
// @desc    Update Journal Entry
// @access  Private
router.put('/:_id', Auth, async (req, res) => {
  const { title, date, text, image_filename } = req.body;
  const postItem = {};
  if (title) postItem.title = title;
  if (text) postItem.text = text;
  if (date) postItem.date = date;
  if (image_filename) postItem.image_filename = image_filename;

  try {
    const item = await JournalPost.findOneAndUpdate({ _id: req.params._id }, postItem);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/journal/:_id
// @desc    Delete Journal Entry
// @access  Private
router.delete('/:_id', Auth, async (req, res) => {
  try {
    await JournalPost.findOneAndRemove({ _id: req.params._id });
    gfs.remove({ _id: req.params._id, root: 'journalImages' }, (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    });
    res.json({ msg: 'Journal Entry Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journal
// @desc    Get All Journal Entries
// @access  Private
router.get('/', Auth, async (req, res) => {
  try {
    const items = await JournalPost.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journal/:_id
// @desc    Get One Journal Entry
// @access  Private
router.get('/:_id', Auth, async (req, res) => {
  try {
    const item = await JournalPost.findById(req.params._id);
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journal/date/:_date
// @desc    Get One Journal Entry By Date
// @access  Private
router.get('/date/:date', Auth, async (req, res) => {
  try {
    const item = await JournalPost.findOne({ date: req.params.date });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/journal/month/:year/:month
// @desc    Get Journal Entries By Month, 3 months of data (prevMonth, currMonth, nextMonth)
// @access  Private
router.get('/month/:year/:month', Auth, async (req, res) => {
  try {
    let nextMonth = parseInt(req.params.month) + 1;
    if (nextMonth < 10) {
      nextMonth = `0${nextMonth}`;
    }
    let prevMonth = parseInt(req.params.month) - 1;
    if (prevMonth === -1) {
      prevMonth = 11;
    } else if (prevMonth < 10) {
      prevMonth = `0${prevMonth}`;
    }
    const items = await JournalPost.find({
      date: {
        $gte: new Date(req.params.year, prevMonth),
        $lt: new Date(req.params.year, nextMonth),
      },
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error x');
  }
});

// ===========================
// IMAGE ROUTES
// ===========================

// @route   GET api/journal/image/:filename
// @desc    Get Journal Image
// @access  Private
router.get('/image/:filename', async (req, res) => {
  await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No Files Exist',
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not jpeg or pgn Image',
      });
    }
  });
});

// @route   DELETE api/journal/delete-image/:filename
// @desc    Delete Image By Name
// @access  private
router.delete('/delete-image/:filename', Auth, async (req, res) => {
  const delImage = await gfs.remove(
    { filename: req.params.filename, root: 'journalImages' },
    (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }
  );
  res.json(delImage);
});

// @route   DELETE api/journal/delete-image/id/:files_id
// @desc    Delete Image By id
// @access  Private
router.delete('/delete-image/id/:files_id', Auth, async (req, res) => {
  const delImage = await gfs.remove(
    { files_id: req.params.files_id, root: 'journalImages' },
    (err, GridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }
  );
  res.json(delImage);
});

// @route   POST api/blogs/uploadimage
// @desc    Upload image
// @access  Private
router.post('/uploadimage', [Auth, upload.single('file')], (req, res) => {
  res.json({ file: req.file });
});

module.exports = router;
