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
        src: ['src/**/*.jsx'],
        dest: 'dist/<%= pkg.name %>.js',
        options: {
          transform:[['babelify', {presets:{_:['es2015','react']}}]]
        }
      }
    },
    eslint:{
      target:['src/**/*.jsx', 'src/**/*.js']
    },
		connect: {
			server: {
				options: {
						port: 9000,
						livereload: true,
						interrupt: true
				}
			}
		},
		watch: {
			files: ['src/*.jsx','src/**/*.jsx','src/**/*.js', 'index.html'],
			tasks: ['compile'],
			options: {
				livereload: true
			}
		},
		clean: ['dist/*']
  });
	grunt.registerTask('compile', ['clean','eslint', 'browserify']);
	grunt.registerTask('default', ['compile', 'connect', 'watch']);

};
