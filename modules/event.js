var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./db/dev.sqlite3"
  }
});

var table = function (table) {
  table.increments();
  table.string('name');
  table.string('event_url');
  table.timestamps();
};

knex.schema.createTable('events', table).then(function () {
  console.log('events table created!');
});

var bookshelf = require('bookshelf')(knex);

var Event = bookshelf.Model.extend({

  tableName: 'events'

});

module.exports = Event;