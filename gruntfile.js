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
                    'dist/themes/theme1/bootstrap.css': 'src/theme1/bootstrap.less',
                    'dist/themes/theme1/theme.css': 'src/theme1/theme.less',                    
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
              'dist/themes/theme1/boostrap.min.css': ['dist/themes/theme1/bootstrap.css', 'dist/themes/theme1/theme.css']
            }
          }
        }        

    });
    


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('default', ['less','cssmin']);
    grunt.registerTask('compile', ['less:dev']);
    grunt.registerTask('dev', ['less:dev']);
};