var bookshelf = require('./db');

var Event = bookshelf.Model.extend({

  tableName: 'events',
  speakers: function(){
    return this.hasMany(Speaker, 'eventId');
  }

});

module.exports = Event;