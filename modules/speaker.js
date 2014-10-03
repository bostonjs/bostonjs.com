var bookshelf = require('./db');

var Speaker = bookshelf.Model.extend({

  tableName: 'speakers'

});

module.exports = Speaker;