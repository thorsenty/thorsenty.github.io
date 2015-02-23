module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      all: ['scripts/*.js']
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: "styles",
          src: "*.scss",
          dest: "styles/dist",
          ext: ".css"
        }],
        options: {
          style: "expanded"
        }
      },
      dist: {
        files: [{
          expand: true,
          cwd: "styles",
          src: "*.scss",
          dest: "styles/dist",
          ext: ".css"
        }],
        options: {
          style: "compressed"
        }
      }
    },

    shell: {
      jekyllBuild: {
        command: "jekyll build --drafts"
      },
      jekyllBuildProd: {
        command: "jekyll build"
      },
      jekyllServe: {
        command: "jekyll serve"
      }
    },
    
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: "scripts",
          src: "*.js",
          dest: "scripts/dist",
          ext: ".min.js"
        }]
      }
    },

    watch: {
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass:dev', 'shell:jekyllBuild']
      },
      js: {
        files: ['scripts/*.js', 'scripts/data/*.js', 'scripts/tests/*.js'],
        tasks: [ 'jshint', 'karma', 'uglify', 'shell:jekyllBuild']
      },
      site: {
        files: ['**/*.html', '!_site/**/*.html', '_posts/**/*.md', '_drafts/**/*.md', '_data/**/*.yml'],
        tasks: ['shell:jekyllBuild']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint', 'karma', 'uglify', 'sass:dev', 'shell:jekyllBuild', 'watch']);
  grunt.registerTask('prod', ['jshint', 'karma', 'uglify', 'sass:dist', 'shell:jekyllBuildProd']);
  grunt.registerTask('serve', ['shell:jekyllServe']);
};