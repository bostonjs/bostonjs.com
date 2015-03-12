const fs = require('fs');
const request = require('request-promise');
const API_URL = 'https://api.meetup.com/2/';
const MEETUP_API_KEY = fs.readFileSync(__dirname + '/data/KEY').toString().trim();

var dataRequest = request({
  uri: API_URL + "events/",
  method: "GET",
  qs: {
    "group_urlname": "boston_JS",
    "key": MEETUP_API_KEY,
    "status": "upcoming, past"
  }
});

dataRequest.then(function(resp) {
  console.log(resp);
}).catch(console.error);

module.exports = {
  upcoming: dataRequest
};
