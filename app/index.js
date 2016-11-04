const express = require('express');
const jade = require('jade');
const _ = require('lodash');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const BODY_LIMIT = '500kb';

var app = express();
var transporter = nodemailer.createTransport();
var moment = app.locals.moment = require('moment');
var meetups = _.map(require('./data/meetups').results, function(m, i) {
  m.index = i+1;
  return m;
});

app.use(bodyParser.json({ limit: BODY_LIMIT }));
app.use(bodyParser.urlencoded({ limit: BODY_LIMIT, extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  var now = moment();
  var upcoming = _.takeRightWhile(meetups, function(m){
    return moment(m.time).isAfter(now);
  });
  var meetup = upcoming.length ? upcoming[ 0 ] : meetups[ meetups.length -1 ];
  res.render('index', {
    meetup: meetup,
    meetups: meetups
  });
});

app.get('/events/:index', function(req, res){
  res.render('index', {
    meetup: meetups[ req.params.index - 1],
    meetups: meetups
  });
});

app.get('/events/', function(req, res){
  res.render('events', {
    meetups: _.clone(meetups).reverse()
  });
});

app.get('/chat/', function(req, res) {
  res.redirect('https://bostonjs.herokuapp.com/');
});

app.get('/submit-a-talk/', function(req, res){
  res.render('submit');
});

app.post('/submit-a-talk/', function(req, res){
  var form = req.body;
  var destination = 'bocoup+38004@submissions.submittable.com';
  var submissionContents = [
    '#name:' + form.name,
    '#email:' + form.email,
    '\n',
    '<strong>Description</strong>',
    form.description || '',
    '\n',
    '/--JSON--/',
    JSON.stringify(form),
    '/----/'
  ];
  transporter.sendMail({
    from: 'submittable-relayer@bocoup.com', // Not a real e-mail address (yet)
    to: destination,
    subject: form.title,
    text: submissionContents.join('\n')
  }, function(error, info) {
    if ( error ) {
      console.log( error );
      res.status(400).json({error: error});
    }
    res.render('submit', {submission: req.body});
    //res.json({success: 'Your submission, "' + form.title +'", has been received. You should receive a confirmation in your e-mail shortly!'});

  });
});

module.exports = app;
