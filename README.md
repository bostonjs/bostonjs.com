# Boston JS

![boston skyline](app/public/img/skyline.png)

## What

This is the www home of the [Boston JS Meetup](http://www.meetup.com/boston_JS/).

[Talk to us on twitter](http://twitter.com/bos_js)

## Who

- [Adam Sontag](http://twitter.com/ajpiano)
- [Boaz Sender](http://twitter.com/boazsender)
- [Gregor Martynus](https://twitter.com/gr2m)
- [Jory Burson](http://twitter.com/jorydotcom)
- [K Adam White](https://twitter.com/kadamwhite)
- [Mat Marquis](http://twitter.com/wilto)

## How-to

#### 1. Get an API Key from Meetup.com

  Visit https://secure.meetup.com/meetup_api/key/ and get your API Key. Cut and paste it into a file called `app/data/KEY.txt`. Save it and remove the extension so the file name is simply `KEY`.

#### 2. Install Dependencies

  From the root directory, run `npm install`.

#### 3. Start the app server

  From the root directory, run `node index.js`.

#### 4. View index and detail

-  `/` will give you the most recent event
-  `/events` will give you an index of all events, linked to their meetup page
-  `/events/:id` will give you a JSON dump of an individual event

#### Deployment
`(cd deploy/ansible && ansible-playbook --ask-sudo-pass -i inventory/production deploy.yml)`

To get changes to show up on the site, you may need to SSH into the box and run these commands from the site root (`/mnt/site/`):

- `sudo npm run build` (runs `grunt`, specifically we care about the `http` grunt task to download the latest meetup data)
- `sudo service site restart` (restarts the website)


#### Seeing new meetups that you created on meetup.com on the website

You have to run a deploy to get the site to see new meetups after you add them on meetup.com
If, after a deploy, the changes still do not appear to have happened, ssh into the machine and do
`sudo service site restart`. This will be fixed when #27 is closed.
