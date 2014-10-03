# Boston JS

![boston skyline](public/img/skyline.png)

## What

This is the www home of the [Boston JS Meetup](http://www.meetup.com/boston_JS/).

[Talk to us on twitter](http://twitter.com/bos_js)

## Who

- [Ashley Williams](http://twitter.com/ag_dubs)
- [Adam Sontag](http://twitter.com/ajpiano)
- [Boaz Sender](http://twitter.com/boazsender)

## How-to

#### 1. Get an API Key from Meetup.com

  Create a file in the root directory of this project called `KEY`. Visit https://secure.meetup.com/meetup_api/key/ and cut and paste your Api Key into the KEY file. Save.

#### 2. Install Dependencies

  From the root directory, run `npm install`.

#### 3. Start a node server

  From the root directory, run `node app.js`.

#### 4. Load data from meetup

  In your browser, visit `http://localhost:3000/get_events`.

#### 5. View index and detail

-  `/` will give you the most recent event
-  `/events` will give you an index of all events, linked to their meetup page
-  `/events/:id` will give you a JSON dump of an individual event
 