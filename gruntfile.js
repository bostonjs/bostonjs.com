module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({

    clean: {
      tmp: ['tmp'],
      output: ['output']
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
    }
  });

  grunt.registerTask('build', 'Build the static site.', [
    'clean',
    'copy',
    'assemble',
    'htmlmin'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
