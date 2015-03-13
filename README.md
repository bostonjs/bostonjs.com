# Boston JS

![boston skyline](public/img/skyline.png)

## What

This is the www home of the [Boston JS Meetup](http://www.meetup.com/boston_JS/).

[Talk to us on twitter](http://twitter.com/bos_js)

## Who

- [Ashley Williams](http://twitter.com/ag_dubs)
- [Adam Sontag](http://twitter.com/ajpiano)
- [Boaz Sender](http://twitter.com/boazsender)
- [Mat Marquis](http://twitter.com/wilto)

## How-to

#### 1. Get an API Key from Meetup.com

  Visit https://secure.meetup.com/meetup_api/key/ and get your API Key. Cut and paste it into the `db/KEY.txt` file. Save it and remove the extension so the file name is simply `KEY`.

#### 2. Install Dependencies

  From the root directory, run `npm install`.

#### 3. Start the app server

  From the root directory, run `node index.js`.

#### 4. View index and detail

-  `/` will give you the most recent event
-  `/events` will give you an index of all events, linked to their meetup page
-  `/events/:id` will give you a JSON dump of an individual event
