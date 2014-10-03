var path = require('path');
var fs = require('fs');
var request = require('request');

var express = require('express');
var app = express();

var jade = require('jade');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

var Event = require('./modules/event');

app.get('/get_events', function(req, res){
  
  // looks for a file KEY with your API key in it
  fs.readFile('db/KEY', function(err,data){
    if (err) throw err;
    var API_KEY = data;

    // using fake data because auth for bos_js is dumb
    // var API_URL = 'https://api.meetup.com/2/events?&key=3b56411d154021286d3373b56695f&group_id=884541&sign=true';
    var API_URL = "https://api.meetup.com/2/events?&key=" + API_KEY + "&group_id=884541&sign=true&status=past";
    request(API_URL, function(err, data){

      var events = JSON.parse(data.body)['results'];

      for(var i = 0; i < events.length; i++) {
        var event = events[i];
        new Event({ name: event.name, event_url: event.event_url })
          .save()
          .then(function(model){
            console.log(model.id + " saved!")
          });
      }

      res.send(events.length + " events loaded.");
    });
  });

});

app.get('/events/:id', function(req,res){

  new Event({id: req.params.id})
    .fetch()
    .then(function(event){
      res.render('detail', { event: event });
    });

});

app.get('/events', function(req,res){

  Event.query()
    .then(function(events){
      res.render('index', { events: events });
    });

});

app.get('/', function(req,res){

  Event.query(function(qb){
      qb.orderBy('id','DESC');
      qb.limit(1);
    })
    .fetch()
    .then(function(event){
      res.render('detail', { event: event });
    });

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

