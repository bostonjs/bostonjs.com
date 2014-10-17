module.exports.register = function (Handlebars, options)  {

  Handlebars.registerHelper('ifDate', function(time_string, comp, options) {
    var return_block;
    var date = Date.parse(time_string).valueOf();
    var now = new Date().valueOf();

    var comparisons = {
      future: function(date, now) {
        return date > now;
      },

      past: function(date, now) {
        return date < now;
      }
    };

    if(comparisons[comp](date, now)) {
      return_block = options.fn(this);
    } else {
      return_block = options.inverse(this);
    }

    return return_block;
  });
};