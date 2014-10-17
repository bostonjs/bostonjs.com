const fs = require('fs');
const express = require('express');
const request = require('request');

var app = express();

app.use(express.static(__dirname + '/output'));

app.post('/api.boston-js.org', function(req, res){
  req.pipe(request.post('http://api.bocoup.com/submissions?access_token=' + fs.readFileSync('./data/KEY').toString().trim()));
  console.log(res);
  res.send('Submitted!');
})

var server = app.listen(8080, function() {
    console.log('Listening on port %d', server.address().port);
});