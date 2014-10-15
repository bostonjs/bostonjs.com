module.exports = function(grunt) {
  var fs = require('fs');
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('disassemble', 'Generates individual files and templates from event API data', function() {
    var src = this.options().src;
    var dest = this.options().dest;
    var events = grunt.file.readJSON(src);
    events.forEach(function(event) {
      grunt.file.write(dest + event.id + '.json', JSON.stringify(event));
    });
    grunt.log.writeln(events.length + ' files written');
  });

  grunt.initConfig({
    pkg: '<json:package.json>',
    
    clean: {
      output: ['output'],
      tmp: ['tmp']
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
          url: 'http://api.bocoup.com/events?access_token=' + fs.readFileSync('./data/KEY').toString().trim(),
        },
        dest: 'data/index.json' 
      }
    },

    disassemble: {
      options: {
        src: '<%= http.nest.dest %>',
        dest: 'data/'
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: ['views/templates/layout.hbs'],
        partials: ['views/partials/*.hbs'],
        data: ['data/*.json']
      },
      build: {
        src: 'views/pages/*.hbs',
        dest: 'tmp/'
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
        src: ['*.html'],
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
