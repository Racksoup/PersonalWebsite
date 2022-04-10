const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

connectDB();

app.use(express.json({ extend: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/weather', require('./routes/api/weather'));
app.use('/api/journal', require('./routes/api/journal'));

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
