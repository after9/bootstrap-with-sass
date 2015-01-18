module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        project: {
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
                        '<%= project.app %>'
                    ]
                }
            },
        },
        watch: {
            html: {
                files: [
                    '<%= project.app %>/views/{,*/}*.html'
                ]
            },
            javascript: {
                files: [
                    '<%= project.app %>/javascripts/{,*/}*.js'
                ],
                tasks: ['jshint']
            },
            compass: {
                files: [
                    '<%= project.app %>/styles/{,*/}*.scss'
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
                    '<%= project.app %>/views/{,*/}*.html',
                    '<%= project.app %>/styles/{,*/}*.{css,scss}',
                    '<%= project.app %>/javascripts/{,*/}*.js',
                    '<%= project.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            },
        },
        compass: {
            dev: {
                options: {
                    sassDir: '<%= project.app %>/styles',
                    cssDir: '<%= project.app %>/styles',
                    imagesDir: '<%= project.app %>/images',
                    importPath: '<%= project.app %>/bower_components',
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: '<%= project.app %>/styles',
                    cssDir: '<%= project.app %>/styles',
                    imagesDir: '<%= project.app %>/images',
                    importPath: '<%= project.app %>/bower_components',
                    environment: 'production'
                }
            },
        },
        jshint: {
            files: [
                'gruntfile.js',
                '<%= project.app %>/javascripts/{,*/}*.js'
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
