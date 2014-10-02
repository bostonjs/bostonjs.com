var fs = require('fs');
var request = require('request');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  
  // looks for a file KEY with your API key in it
  fs.readFile('./KEY', function(err,data){
    if (err) throw err;
    var API_KEY = data;

    // using fake data because auth for bos_js is dumb
    // var API_URL = 'https://api.meetup.com/2/events?&key=3b56411d154021286d3373b56695f&group_id=884541&sign=true';
    var API_URL = "https://api.meetup.com/2/events?&key=" + API_KEY + "&group_urlname=ny-tech";
    var events = request(API_URL);

    events.pipe(res);
  });

});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

