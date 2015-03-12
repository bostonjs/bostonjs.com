const express = require('express');
const jade = require('jade');
const _ = require('lodash');

var app = express();
app.locals.moment = require('moment');
var meetups = _.map(require('./data/meetups').results, function(m, i) {
  m.index = i+1;
  return m;
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  res.render('index', {
    meetup: meetups[ meetups.length - 1 ],
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

app.get('/submit-a-talk/', function(req, res){
  console.log(req);
  res.render('submit', {submission: "foo"});
});

app.post('/submit-a-talk/', function(req, res){
  console.log(req);
  res.render('submit', {submission: "foo"});
});

module.exports = app;
