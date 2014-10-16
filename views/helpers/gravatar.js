// Handlebars.js - Gravatar thumbnail
// Usage: {{#gravatar email size="64"}}{{/gravatar}} [depends on md5.js]
// Author: Makis Tracend (@tracend)
var MD5 = require("MD5");
module.exports.register = function (Handlebars, options)  {
  Handlebars.registerHelper("gravatar", function(context, options) {

    var email = context;
    var size=( typeof(options.hash.size) === "undefined") ? 32 : options.hash.size;

    return "http://www.gravatar.com/avatar/" + MD5( email ) + "?s="+ size;
  });
};
