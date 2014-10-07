module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: ['src/*.js'],
        dest: 'dest/<%= pkg.name %>.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        options: {
          mangle: true
        },
        files: {
          'dest/<%= pkg.name %>.min.js': ['src/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};
