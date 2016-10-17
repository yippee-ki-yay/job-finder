const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  postid: {type: Number, required: true, index: true},
  title: {type: String, required: true},
  content: {type: String, required: true},

  author: {type: String},
  postedOn: {type: Date},
  tags: [String],
  jobType: {type: String}
});

module.exports = mongoose.model('Job', JobSchema);
