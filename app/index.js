const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const BODY_LIMIT = '500kb';

var app = express();
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
  res.redirect('https://boston-javascript-slackin.herokuapp.com/');
});

app.get('/submit-a-talk/', function(req, res){
  res.redirect('https://www.meetup.com/boston_JS/events/262286359/');
});

module.exports = app;
