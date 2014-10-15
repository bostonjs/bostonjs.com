module.exports = function(grunt) {
  var fs = require('fs');
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
    pkg: '<json:package.json>',
    banner: '<%= grunt.template.today("yyyy-mm-dd") %>\n',
    clean: {
      tmp: ['tmp'],
      output: ['output']
    },

    concat: {
      options: {
        banner: '<%= banner %>'
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
          'public/css/all.css',
        ],
        dest: 'output/css/all.css'
      }
    },

    copy: {
      public: {
        expand: true,
        cwd: 'public',
        src: '**/*',
        dest: 'output'
      }
    },

    http: {
      nest: {
        options: {
          url: 'http://api.bocoup.com/event?access_token=' + fs.readFileSync('./data/KEY').trim(),
        },
        dest: 'data/index.json' 
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: ['app/templates/layout.hbs'],
        partials: ['app/partials/*.hbs'],
        data: ['data/*.json']
      },
      build: {
        src: 'app/pages/*.hbs',
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
        banner: '<%= banner %>',
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

  grunt.registerTask('build', 'Build the static site.', [
    'clean',
    'copy',
    'concat',
    'http',
    'assemble',
    'htmlmin'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
