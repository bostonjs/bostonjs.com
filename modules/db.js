var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./db/dev.sqlite3"
  }
});

var events_table = function (table) {
  table.increments();
  table.string('name');
  table.string('event_url');
  table.string('description');
  table.string('venue');
  table.string('date');
  table.string('time');
};

var speakers_table = function (table) {
  table.increments();
  table.string('name');
  table.string('email');
};

knex.schema.createTable('events', events_table).then(function () {
  console.log('events table created!');
});

knex.schema.createTable('speakers', speakers_table).then(function () {
  console.log('speakers table created!');
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
