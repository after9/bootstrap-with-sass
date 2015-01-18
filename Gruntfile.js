module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            app: 'app'
        },

        connect: {
            options: {
                port: 9000,
                livereload: true,
//                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>'
                    ]
                }
            },
        },
        watch: {
            html: {
                files: [
                    '<%= config.app %>/views/{,*/}*.html'
                ]
            },
            javascript: {
                files: [
                    '<%= config.app %>/javascripts/{,*/}*.js'
                ],
                tasks: ['jshint']
            },
            compass: {
                files: [
                    '<%= config.app %>/styles/{,*/}*.scss'
                ],
                tasks: ['compass:dev']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
//            options: {
//                livereload: true,
//            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/views/{,*/}*.html',
                    '<%= config.app %>/styles/{,*/}*.{css,scss}',
                    '<%= config.app %>/javascripts/{,*/}*.js',
                    '<%= config.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },
        },
        compass: {
            dev: {
                options: {
                    sassDir: '<%= config.app %>/styles',
                    cssDir: '<%= config.app %>/styles',
                    imagesDir: '<%= config.app %>/images',
                    importPath: '<%= config.app %>/bower_components',
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: '<%= config.app %>/styles',
                    cssDir: '<%= config.app %>/styles',
                    imagesDir: '<%= config.app %>/images',
                    importPath: '<%= config.app %>/bower_components',
                    environment: 'production'
                }
            },
        },
        jshint: {
            files: [
                'gruntfile.js',
                '<%= config.app %>/javascripts/{,*/}*.js'
            ]
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['connect:livereload', 'compass:dev', 'jshint', 'watch']);
    // prod build
    grunt.registerTask('prod', ['compass:prod']);

};
