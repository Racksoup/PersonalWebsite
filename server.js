const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(express.json({ extend: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/weather', require('./routes/api/weather'));
app.use('/api/journal', require('./routes/api/journal'));
app.use('/api/lists', require('./routes/api/lists'));
app.use('/api/listItem', require('./routes/api/listItem'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// multiple images on one journal
// style view journal

// add to-do's lists (multiple)
// mutilple lists
// track completed list items on journal pages

// timeline of big events
