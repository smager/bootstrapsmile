//'use strict';
var path = require('path').resolve('.');
module.exports = function (grunt) {
    var themes = grunt.file.readJSON('themes-config.json');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    dumpLineNumbers: 'comments',
                    relativeUrls: true
                }
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          }
            
        },                     
        express: {
            all: {
                options: {
                    bases: [ path + '\\dist\\themes\\'],
                    port: 8080,
                    hostname: "0.0.0.0",
                    livereload: true
                }
            }
        },      
        watch: {
            all: {
                    files: 'src/' + themes.defaulTheme + '/*.less',
                    tasks: ['buildthemes:' + themes.defaulTheme ,'express', 'open', 'watch'],
                    options: {
                        spawn: false,
                    }
                    
            }
        },
        open: {
            all: {
                path: 'http://localhost:8080/' +  themes.defaulTheme + '/'
            }
        }
       , buildthemes: themes.list  
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');    
    
    grunt.registerTask('compile', ['less:dev']);
    grunt.registerTask('dev', ['less:dev']);
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    
    grunt.registerTask('default', ['buildthemes','express', 'open', 'watch']);
    //grunt.registerTask('default', ['buildthemes']);
    
    grunt.registerTask('build', function(theme) {
        grunt.log.writeln( ['building... (' + theme + ')' ] );
        var bs= 'bootstrap';
        var th = 'theme';
        var dist = 'dist/themes/' + theme + '/css/';
        var src = 'src/' + theme + '/';
        var css = ".css";
        var less = ".less";
        var minfile = bs + '.min' + css;

        var files ={};
            files[dist + bs + css] = src + bs + less;
            files[dist + th + css] = src + th + less; 

        grunt.config('less.dev.files', files);

        var cssminfiles={};        
        cssminfiles[dist + minfile] =  [dist + bs + css, dist + th + css];
        grunt.config('cssmin.target.files', cssminfiles);
    
        var copyfiles = [
            {   //copy fonts
                  expand: true
                , src: ['**']
                , dest: 'dist/themes/'+ theme +'/fonts/'
                , cwd: 'node_modules/bootstrap/dist/fonts/'
                , filter: 'isFile'
            }                
            ,{  //copy client side package
                  expand: true
                , src: ['bower.json']
                , dest: 'dist/themes/'
                , cwd: 'src/' + theme +'/'
                , filter: 'isFile'
                
            }            
            ,{ //copy client side package
                  expand: true
                , src: ['index.html']
                , dest: 'dist/themes/'+ theme +'/'
                , cwd: 'src/' + theme +'/'
                , filter: 'isFile'
                
            }            
            ,{ //copy bootstrap.js
                expand: true
                , src: ['bootstrap*.min.js']
                , dest: 'dist/themes/'+ theme +'/js/'
                , cwd: 'node_modules/bootstrap/dist/js/'
                , filter: 'isFile'
                
            }
        ];
        grunt.config('copy.main.files',copyfiles);
        grunt.task.run(['less:dev','cssmin','copy']);
    });    
  
    grunt.registerMultiTask('buildthemes', function() {
        grunt.task.run('build:' + this.target);
    });
        
};