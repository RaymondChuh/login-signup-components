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
    },
		connect: {
			server: {
				options: {
						port: 9000,
						livereload: true
				}
			}
		},
		watch: {
			files: ['src/*.js'],
			tasks: ['compile'],
			options: {
				livereload: true
			}
		}
  });
	grunt.registerTask('compile', ['eslint', 'browserify']);
	grunt.registerTask('default', ['compile', 'connect', 'watch']);

};
