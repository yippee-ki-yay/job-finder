const Jobs = require('../models/jobs');
const snoowrap = require('snoowrap');

let req = new snoowrap({
  userAgent: 'script',
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  refreshToken: process.env.REFRESH_TOKEN
});

let latestPosts = [];

module.exports.getLatestJobs = function() {
  console.log("Fetching latest jobs from /r/forhire");
};

module.exports.updateNewJobs = function() {
  req.getSubreddit('forhire').getNew()
  .then(function(posts) {
    console.log(posts.length);
    latestPosts = posts.map(post => post.title);
  })
  .catch(function(err) {
    console.log(err);
  });
};
