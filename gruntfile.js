'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: 'wwwroot/lib',
          layout: 'byComponent',
          cleanTargetDir: true
        }
      }
    }
  });

  // Install bower packages into wwwroot/lib
  grunt.registerTask('default', ['bower:install']);

  // Load all grunt plugins:
  grunt.loadNpmTasks('grunt-bower-task');
};
