const schedule = require('node-schedule');
const redditCtrl = require('../controllers/reddit');

// let redditRule = new schedule.RecurrenceRule();
// redditRule.minute = 1;

setInterval(() => {
  console.log("huehuehue hehe");
  redditCtrl.updateNewJobs();
}, 10000);
