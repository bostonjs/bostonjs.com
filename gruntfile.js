module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({

    clean: {
      tmp: ['tmp']
    },

    copy: {
      public: {
        expand: true,
        cwd: 'public',
        src: '**/*',
        dest: 'tmp'
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: ['app/templates/layout.hbs'],
        partials: ['app/partials/*.hbs'],
        data: 'data/past.json'
      },
      build: {
        src: 'app/pages/*.hbs',
        dest: 'tmp/'
      }
    }
  });

  grunt.registerTask('build', 'Build the static site.', [
    'clean',
    'copy',
    'assemble',
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
