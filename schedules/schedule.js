const redditCtrl = require('../controllers/reddit');

setInterval(() => {
  redditCtrl.updateNewJobs();
}, 45000);
