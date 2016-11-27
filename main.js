require('dotenv').load();
require('./schedules/schedule');

const mongoose = require('mongoose');
const express = require('express');

const routes = require('./routes/routes');

const app = express();

app.use('api', routes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on " + process.env.PORT);
});

// mongoose.connect(process.env.DB_URI);
//
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose connected to ' + process.env.DB_URI);
// });
