//'use strict';
var path = require('path').resolve('.');
 
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    dumpLineNumbers: 'comments',
                    relativeUrls: true
                },
             
                files: {
                    'dist/themes/theme1/css/bootstrap.css': 'src/theme1/bootstrap.less',
                    'dist/themes/theme1/css/theme.css': 'src/theme1/theme.less',                    
                }
                
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'dist/themes/theme1/css/bootstrap.min.css': ['dist/themes/theme1/css/bootstrap.css', 'dist/themes/css/theme1/theme.css']
            }
          }
        },
       
 
                     
        express: {
            all: {
                options: {
                    bases: [ path + '\\dist\\themes\\theme1'],
                    port: 8080,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },      
        
        
        // grunt-watch will monitor the projects files
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            all: {
                    files: '**/*.less',
                    tasks: ['default'],
                    options: {
                        spawn: false,
                    }
                    
            }
        },
        
        

        // grunt-open will open your browser at the project's URL
        // https://www.npmjs.org/package/grunt-open
        open: {
            all: {
                path: 'http://localhost:8080/index.html'
            }
        }


    
        
    });
    

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');    
    
    //grunt.registerTask('default', ['less','cssmin']);
    grunt.registerTask('compile', ['less:dev']);
    grunt.registerTask('dev', ['less:dev']);
    
    
    grunt.registerTask('default', ['less','cssmin','express', 'open', 'watch']);

    
    
};