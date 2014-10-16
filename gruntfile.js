module.exports = function(grunt) {
  var fs = require('fs');
  var _ = require('lodash');
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('disassemble', 'Generates individual files and templates from event API data', function() {
    var src = this.options().src;
    var d_dest = this.options().d_dest;
    var t_dest = this.options().t_dest;
    var tmpl = this.options().tmpl;
    var events = grunt.file.readJSON(src);
    var lastIndex = events.length - 1;
    _.chain(events).sortBy('date_start').value().forEach(function(event, index) {
      grunt.file.write(d_dest + "event" + event.id + '.json', JSON.stringify(event));
      grunt.file.write(t_dest + "event" + event.id + '.hbs', tmpl.replace('detailID', "event" + event.id));
      // Handle the last element (the most recent meetup) specially, so that it is also the main site homepage
      if ( index === lastIndex ) {
        grunt.file.write(d_dest + 'index.json', JSON.stringify(event));
        grunt.file.write(t_dest + 'index.hbs', tmpl.replace('detailID', "index"));
      }
    });
    grunt.log.writeln(events.length + ' files written');
  });

  grunt.initConfig({
    pkg: '<json:package.json>',

    clean: {
      output: ['output'],
      tmp: ['tmp'],
      details: ['views/pages/details/']
    },

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

    http: {
      nest: {
        options: {
          url: 'http://api.bocoup.com/events?access_token=' + require('./config/secrets/nest.json').api_key
        },
        dest: 'data/events.json' 
      }
    },

    disassemble: {
      options: {
        src: '<%= http.nest.dest %>',
        d_dest: 'data/',
        t_dest: 'views/pages/details/',
        tmpl: fs.readFileSync('./views/pages/detail.hbs').toString().trim()
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: ['views/templates/layout.hbs'],
        helpers: ['helper-moment', 'views/helpers/*.js'],
        partials: ['views/partials/*.hbs'],
        data: ['data/*.json']
      },
      events: {
        src: 'views/pages/events.hbs',
        dest: 'tmp/',
        expand: true,
        rename: function(dest, src) {
          return dest + 'events/index.html';
        }
      },
      homepage: {
        src: 'views/pages/details/index.hbs',
        dest: 'tmp/',
        expand: true,
        rename: function(dest, src) {
          return dest + 'index.html';
        }
      },
      details: {
        src: 'views/pages/details/event*.hbs',
        dest: 'tmp/',
        expand: true,
        rename: function(dest, src) {
          var replacement = dest + "events/" + src.replace("views/pages/details/","").replace("event","").replace(".hbs","") + "/index.html";
          return replacement;
        }
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

  grunt.registerTask('build', 'Build the static site.', [
    'clean:output',
    'copy',
    'concat',
    'http',
    'disassemble',
    'assemble',
    'htmlmin',
    'cssmin',
    'clean:tmp'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
