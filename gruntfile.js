/*global module:false,require:false*/
module.exports = function(grunt) {
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
          'public/_js/initial.config.js'
        ],
        dest: 'output/_js/initial.js'
      },
      js_main: {
        src: [
         //'public/_js/_lib/jquery.js',
          'output/_js/_lib/*',
         //'public/_js/globalenhance.js'
        ],
        dest: 'output/_js/main.js'
      },
      css_main: {
        src: [
          'public/_css/_lib/*',
          'public/_css/all.css',
        ],
        dest: 'output/_css/all.css'
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

    assemble: {
      options: {
        helpers: ['handlebars-helper-include', 'foo/*.js'],
        flatten: true,
        layout: ['app/templates/layout.hbs'],
        partials: ['app/partials/*.hbs'],
        data: 'data/*.json'
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
    },

    criticalcss: {
      custom_options: {
        options: {
          url: "http://newbostonjs.dev/",
          filename : 'all.css',
          outputfile: "output/_css/critical.css"
        }
      }
    }
  });

  grunt.registerTask('build', 'Build the static site.', [
  // Default task.
    'clean',
    'concat',
    'copy',
    'assemble',
    'htmlmin',
    'criticalcss'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
