module.exports = grunt => {
	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);

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

	grunt.registerTask('default', ['eslint', 'browserify']);
};
