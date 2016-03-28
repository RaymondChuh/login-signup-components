module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'browserify']
    },
    browserify:{
      dist:{
        src:'src/*.js',
        dest:'dist/bundle.js',
        options: {
          transform:[['babelify', {presets:{_:['es2015','react']}}]]
        }
      }
    },
    eslint:{
      target:['src/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['eslint', 'browserify']);

};
