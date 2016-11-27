const Jobs = require('../models/jobs');
const snoowrap = require('snoowrap');

const emailService = require('./../services/email');

const SUBREDDIT = "forhire";
const keywords = ["Node.js", "Node", "Js", "Online", "Javascript", "Remote", "Ruby", "Crawling"];

let req = new snoowrap({
  userAgent: 'script',
  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  refreshToken: process.env.REFRESH_TOKEN
});

let latestPosts = null;

//load inital jobs
req.getSubreddit(SUBREDDIT).getNew()
.then(function(posts) {
  latestPosts = posts;
});

module.exports.updateNewJobs = () => {
  req.getSubreddit(SUBREDDIT).getNew()
  .then(function(posts) {

    posts = posts.map(post => {
      return {
        title: post.title,
        id: post.id,
        url: post.url
      };
    });

    let newPosts = filterJobs(getNewJobs(posts));

    console.log(newPosts.map(post => post.title));

    sendEmail(newPosts);

    latestPosts = posts;
  })
  .catch(function(err) {
    console.log(err);
  });
};


// Helper functions
function getNewJobs(upcoming) {

  let newPosts = [];

  let top = latestPosts[0].title;

  for(let i = 0; i < upcoming.length; ++i) {
    if(upcoming[i].title !== top) {
      newPosts.push(upcoming[i]);
    } else {
      break;
    }
  }

  return newPosts;
}

function titleContains(title, keywords) {

  let contains = false;

  keywords.forEach((word) => {
    if(title.indexOf(word) !== -1) {
      contains = true;
    }
  });

  return contains;
}

function filterJobs(jobs) {
  return jobs.filter((job) => {
    if(job.title.indexOf("[Hiring]") !== -1 && titleContains(job.title, keywords)) {
      return true;
    }

    return false;
  });
}

function sendEmail(newPosts) {

  let formatedPosts = newPosts.map(post => post.url);

  if(newPosts.length > 0) {
    emailService.sendMail("jobs@reddit.com", "nesa993@gmail.com", "jobs",
     formatedPosts.toString(), (err) => {
      console.log(err);
    });
  }
}
