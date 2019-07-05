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

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      build: {
        expand: true,
        cwd: 'tmp',
        src: ['*.html', '**/*.html'],
        dest: 'output'
      }
    },

    cssmin: {
      options: {
        stripBanners: true
      },
      css_main: {
        src: [
          '<%= concat.css_main.dest %>'
        ],
        dest: '<%= concat.css_main.dest %>'
      }
    }
  });

  grunt.registerTask('cleanse', 'Clean up all generated/assembled content.', [
    'clean'
  ]);

  grunt.registerTask('build', 'Build static resources.', [
    'clean:output',
    'clean:data',
    //'copy',
    //'concat',
    'http',
    //'htmlmin',
    //'cssmin',
    'clean:tmp'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
