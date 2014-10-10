module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    
    autoprefixer: {
      all: {
        expand: true,
        flatten: true,
        src: "styles/*.css",
        dest: "styles/dist/"
      }
    },

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

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: "styles",
          src: "*.scss",
          dest: "styles",
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
        files: ['styles/*.scss'],
        tasks: ['sass', 'autoprefixer', 'shell:jekyllBuild']
      },
      js: {
        files: ['scripts/*.js'],
        tasks: ['uglify', 'jshint', 'shell:jekyllBuild']
      },
      site: {
        files: ['**/*.html', '!_site/**/*.html', '_posts/**/*.md', '_drafts/**/*.md'],
        tasks: ['shell:jekyllBuild']
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['uglify', 'jshint', 'sass', 'autoprefixer', 'shell:jekyllBuild', 'watch']);
  grunt.registerTask('prod', ['uglify', 'jshint', 'sass', 'autoprefixer', 'shell:jekyllBuildProd']);
  grunt.registerTask('serve', ['shell:jekyllServe']);
};