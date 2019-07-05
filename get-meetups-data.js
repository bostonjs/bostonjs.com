const fs = require('fs');
const fetch = require('node-fetch');
const qs = require('qs');
const path = require('path');

const key = fs.readFileSync(path.join('app', 'data', 'KEY').toString().trim();

const params = {
  group_urlname: 'boston_JS',
  key,
  status: 'upcoming,past',
};

fetch(`https://api.meetup.com/2/events/?${qs.stringify(params)}`)
  .then(async res => {
    const file = path.join('app', 'data', 'meetups.json')

    const fileStream = fs.createWriteStream(file);
    return new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", (err) => {
        reject(err);
      });
      fileStream.on("finish", function() {
        resolve();
      });
    });
  }).then(() => console.log('done'), err => {
    console.error('Error!');
    console.error(err);
  });
