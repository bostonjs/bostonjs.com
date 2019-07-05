module.exports = function(grunt) {
  var fs = require('fs');
  var _ = require('lodash');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      output: ['output'],
      tmp: ['tmp'],
      data: ['app/data/*.json']
    },

    http: {
      meetup: {
        options: {
          url: 'https://api.meetup.com/2/events/',
          qs: {
            "group_urlname": "boston_JS",
            "key": fs.readFileSync('./app/data/KEY').toString().trim(),
            "status": "upcoming,past"
          }
        },
        dest: 'app/data/meetups.json'
      }
    },
  });

  grunt.registerTask('cleanse', 'Clean up all generated/assembled content.', [
    'clean'
  ]);

  grunt.registerTask('build', 'Build static resources.', [
    'clean:output',
    'clean:data',
    'http',
    'clean:tmp'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
