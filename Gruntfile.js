module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        files: {
          // 'dest/<%= pkg.name %>.min.js': ['src/app.js', 'src/utils.js', 'src/facebook.js', 'src/twitter.js', 'src/kakao.js']
          'dest/<%= pkg.name %>.min.js': ['src/*.js']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
