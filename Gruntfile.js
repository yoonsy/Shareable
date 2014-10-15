module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';\n',
      },
      dist: {
        src: ['lib/*.js','src/*.js'],
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
          'dest/<%= pkg.name %>.min.js': ['lib/*.js', 'src/*.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js']
    },
    watch: {
      files: ['<%= concat.dist.src %>', '<%= jshint.files %>'],
      tasks: ['jshint', 'concat']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'concat']);

};
