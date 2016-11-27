var nodemailer = require('nodemailer');
var fs = require('fs');

var config = {
  "email": process.env.EMAIL,
  "password": process.env.EMAIL_PASSWORD
};

var transporter = nodemailer
    .createTransport("smtps://" + config.email + ":" + config.password + "@smtp.gmail.com");


var mailOptions = {
  from: '',
  to: '',
  subject: '',
  text: '',
  html: ''
};


module.exports.sendMail = function(from, to, subject, text, callback) {

  mailOptions.from = from;
  mailOptions.to = to;
  mailOptions.subject = subject;
  mailOptions.html = text;

  transporter.sendMail(mailOptions, callback);
};
