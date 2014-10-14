module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('assemble');

  grunt.initConfig({
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
    'assemble'
  ]);

  grunt.registerTask('default', 'An alias of build.', ['build']);
};
