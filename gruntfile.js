//'use strict';
var path = require('path').resolve('.');
 
module.exports = function (grunt) {
    grunt.initConfig({
         defaulTheme:'theme3'
        ,pkg: grunt.file.readJSON('package.json'),
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
                    bases: [ path + '\\dist\\themes\\<%=defaulTheme%>'],
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
                    files: 'src/<%=defaulTheme%>/*.less',
                    tasks: ['buildthemes:<%=defaulTheme%>','express', 'open', 'watch'],
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
    
        
        , buildthemes: { theme1:{}, theme2:{},theme3:{}}
        
        
        
        
        
    });
    

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');    
    
    //grunt.registerTask('default', ['less','cssmin']);
    grunt.registerTask('compile', ['less:dev']);
    grunt.registerTask('dev', ['less:dev']);
    
    
    
    grunt.registerTask('default', ['buildthemes','express', 'open', 'watch']);
    
    grunt.registerTask('build', function(theme) {
        grunt.log.writeln( ['building... (' + theme + ')' ] );
        var bs= 'bootstrap';
        var th = 'theme';
        var dist = 'dist/themes/' + theme + '/css/';
        var src = 'src/' + theme + '/';
        var minfile = 'bootstrap.min.css';
        var css = ".css";
        var less = ".less";

        var files ={};
            files[dist + bs + css] = src + bs + less;
            files[dist + th + css] = src + th + less; 

        grunt.config('less.dev.files', files);

        var cssminfiles={};        
        cssminfiles[dist + minfile] =  [dist + bs + css, dist + th + css];
        grunt.config('cssmin.target.files', cssminfiles);

        grunt.task.run(['less:dev','cssmin']);

    });    
  
    grunt.registerMultiTask('buildthemes', function() {
        grunt.task.run('build:' + this.target);
    });
        
};