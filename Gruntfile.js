module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			app: {
				files: {
					'../war/housetally.min.js': [
										'js/models/*.js', 
										'build/templates.js', 
										'js/views/*.js', 
										'js/router.js', 
										'js/main.js'
										]
				}
			},
			full: {
				files: {
					'build/handlebars.runtime.min.js': 'lib/handlebars.runtime.js',
					'build/spectrum.min.js': 'lib/spectrum.js'
				}
			}
		},
		
		cssmin: {
			combine: {
				files: {
					'build/housetally.min.css': 'css/housetally.css'
				}
			}
		},
		
		handlebars: {
			compile: {
				options: {
					namespace: 'Handlebars.templates',
					processName: function(filename) {
						return filename
							.replace(/^js\/templates\//, '')
							.replace(/\.handlebars$/, '');
					}
				},
				files: {
					'build/templates.js': 'js/templates/*.handlebars'
				}
			}
		},
		
		concat: {
			app: {
				src: ['css/bootstrap.min.css','build/housetally.min.css','css/bootstrap-responsive.min.css','css/spectrum.css'],
				dest: '../war/housetally.min.css'
			},
			
			lib: {
				src: [
					'lib/jquery*min.js',
					'lib/underscore*min.js',
					'lib/backbone*min.js',
					'build/handlebars.runtime.min.js',
					'build/spectrum.min.js',
					'lib/bootstrap*min.js'					
				],
				dest: '../war/housetally.lib.js'
			}
		}, 
		
		jshint: {
			all: [
				'Gruntfile.js', 
				'js/models/*.js',
				'js/views/*.js',
				'js/!(templates).js'
				]
			
		},
		
		csslint: {
			app: {
				src: 'css/housetally.css'
			}
			
		}, 
		
		watch: {
			scripts: {
				files: ['<config:lint.files>', 'tpl/*.handlebars', '<config:csslint.files>'],
				tasks: 'handlebars lint min:app'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	
	
	grunt.registerTask('default', ['jshint', 'csslint', 'handlebars', 'cssmin', 'uglify:app', 'concat:app']);
	grunt.registerTask('full', ['jshint', 'csslint', 'handlebars', 'cssmin', 'uglify', 'concat']);
	
};