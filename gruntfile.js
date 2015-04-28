//'use strict';
var path = require('path').resolve('.');
var bsPath = 'dist/themes/bower_components/bootstrap/dist/';
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

    
    grunt.registerTask('copy_bower_json', 'copy bower.json', function() {
        grunt.log.writeln('install bower.json...');
            var copyfiles = [
                {  //copy client side package
                      expand: true
                    , src: ['bower.json']
                    , dest: 'dist/themes/'
                    , cwd: 'src/'
                    , filter: 'isFile'

                }            
            ];
            grunt.config('copy.main.files',copyfiles);
            grunt.task.run('copy');                                
    });
    
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');    
    
    grunt.registerTask('compile', ['less:dev']);
    grunt.registerTask('dev', ['less:dev']);
    grunt.loadNpmTasks('grunt-contrib-copy');    
    
    grunt.registerTask('build_and_run', ['buildthemes','express', 'open', 'watch']);
    //grunt.registerTask('default', ['buildthemes']);
   
    grunt.registerTask('default', 'install bower dependencies', function(){        
        var tasks=[];        
        if(!grunt.file.isDir('./dist/themes/bower_components/')) tasks.push('install_bower')                
        tasks.push('build_and_run');        
        grunt.task.run( tasks);         
    });
    

    grunt.registerTask('run_grunt', 're execute grunt', function(){        
        var exec = require('child_process').exec;
        var cb = this.async();        
        exec('grunt', function() {cb();});
        grunt.log.writeln('Please wait to open the browser.');     

    });    
            
    
    grunt.registerTask('build', function(theme) {
        grunt.log.writeln( ['building... (' + theme + ')' ] );
        var ns = "bss.";
        var bs=  'bootstrap';
        var th =  'theme';
        var dist = 'dist/themes/' + theme + '/css/';
        var src = 'src/' + theme + '/';
        var css = ".css";
        var less = ".less";
        var minfile = ns + bs + '.min' + css;

        var files ={};
            files[dist + ns + bs + css] = src + bs + less;
            files[dist + ns + th + css] = src + th + less; 

        grunt.config('less.dev.files', files);

        var cssminfiles={};        
        cssminfiles[dist + minfile] =  [dist + ns + bs + css, dist + ns + th + css];
        grunt.config('cssmin.target.files', cssminfiles);
    
        var copyfiles = [
            {   //copy fonts
                  expand: true
                , src: ['**']
                , dest: 'dist/themes/'+ theme +'/fonts/'
                , cwd: bsPath + 'fonts/'  
                , filter: 'isFile'
            }                                   
            ,{ //copy bootstrap.js
                expand: true
                , src: ['bootstrap*.min.js']
                , dest: 'dist/themes/'+ theme +'/js/'
                , cwd:  bsPath + 'js/'
                , filter: 'isFile'
                
            }
            ,{ //copy .less
                expand: true
                , src: ['*.less']
                , dest: 'dist/themes/'+ theme +'/less/'
                , cwd: 'src/' + theme +'/'
                , filter: 'isFile'
                
            }            
            
        ];
        grunt.config('copy.main.files',copyfiles);
        grunt.task.run(['less:dev','cssmin','copy','create_template:' + theme]);
    });    
  
    grunt.registerMultiTask('buildthemes', function() {
        grunt.task.run('build:' + this.target);
    });
    
    

    // grunt install [npm and bower ]
    grunt.registerTask('install_bower_components', 'install bower', function() {
        var exec = require('child_process').exec;
        var cb = this.async();
            grunt.log.writeln('Installing bower libraries...');                    
            exec('bower install', {cwd: './dist/themes/'}, function(err, stdout, stderr) {
                console.log(stdout);
                cb();
            });            
    });
    
    
  
    //Task: install            
    grunt.registerTask('install_bower', 'install node and bower dependencies', function(){ 
        grunt.task.run(['copy_bower_json','install_bower_components']);         
    });    
    

    
    grunt.registerTask('create_template', function(theme) {
        var hb = require('handlebars');
        var html  = grunt.file.read('src/index_template.html');
        var template = hb.compile(html);
        var data = { "theme": theme};
        var result = template(data);
        
        grunt.file.write('dist/themes/' + theme + '/index.html', result); 
    });        
        
};