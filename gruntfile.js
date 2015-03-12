module.exports = function(grunt) {
  var fs = require('fs');
  var _ = require('lodash');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      output: ['output'],
      tmp: ['tmp'],
      data: ['data/*.json']
    },

    /*
    concat: {
      options: {
      },
      js_initial: {
        src: [
          'public/js/initial.config.js'
        ],
        dest: 'output/js/initial.js'
      },
      js_main: {
        src: [
          'public/js/lib/*'
        ],
        dest: 'output/js/main.js'
      },
      css_main: {
        src: [
          'public/css/lib/*',
          'public/css/all.css'
        ],
        dest: 'output/css/all.css'
      }
    },

    copy: {
      public: {
        expand: true,
        cwd: 'public',
        src: [
          'img/*',
          'css/fonts.css',
          'js/vendor/*',
          'favicon.ico'
        ],
        dest: 'output'
      }
    },
*/
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
