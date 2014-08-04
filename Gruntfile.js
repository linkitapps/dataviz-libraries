module.exports = function (grunt) {

  // Load Npm tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');

  // Default task.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build',   ['clean', 'html2js', 'jshint', 'concat']);
  grunt.registerTask('release', ['clean:dist', 'html2js', 'uglify', 'concat:total', 'concat:index', 'jshint', 'copy']);

  // Project configuration.
  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),

    src: {
      js:    ['src/js/*.js'],
      jsTpl: ['src/partials/**/*.js'],
      tpl:   ['src/partials/**/*.tpl.html'],

    },

    clean: {
      dist: ['<%= distDir %>/*'],
      templates: ['<%= distDir %>/templates']
    },

    html2js: {
      options: {
      },
      main: {
        src: ['<%= src.tpl %>'],
        dest: '<%= distDir %>/partials/app.tpl.js',
        module: 'templates.app'
      }
    },

    concat:{
      d3: {
        src:[
          'src/bower_components/d3/d3.js'
        ],
        dest: '<%= distDir %>/js/d3.js'
      },
      firebase: {
        src:[
          'src/bower_components/firebase/firebase.js',
          'src/bower_components/firebase-simple-login/firebase-simple-login.js'
        ],
        dest: '<%= distDir %>/js/firebase.js'
      },
      angular: {
        src:[
          'src/bower_components/angular/angular.js',
          'src/bower_components/angular-route/angular-route.js',
          'src/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
          'src/bower_components/angularfire/dist/angularfire.js'
        ],
        dest: '<%= distDir %>/js/angular.js'
      },
      app: {
        options: {
        },
        src:['<%= src.js %>' ,'<%= distDir %>/partials/app.tpl.js'],
        dest:'<%= distDir %>/js/app.js'
      },
      total: {
        src: [
          '<%= distDir %>/js/d3.js',
          '<%= distDir %>/js/firebase.js',
          '<%= distDir %>/js/angular.js',
          '<%= distDir %>/js/app.js'
        ],
        dest: '<%= distDir %>/js/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.tpl.html'],
        dest: '<%= distDir %>/index.html',
        options: {
          process: true
        }
      },
    },

    uglify: {
      d3: {
        src:[
          'src/bower_components/d3/d3.js'
        ],
        dest: '<%= distDir %>/js/d3.js'
      },
      firebase: {
        src:[
          'src/bower_components/firebase/firebase.js',
          'src/bower_components/firebase-simple-login/firebase-simple-login.js'
        ],
        dest: '<%= distDir %>/js/firebase.js'
      },
      angular: {
        src:[
          'src/bower_components/angular/angular.js',
          'src/bower_components/angular-route/angular-route.js',
          'src/bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
          'src/bower_components/angularfire/dist/angularfire.js'
        ],
        dest: '<%= distDir %>/js/angular.js'
      },
      app:{
        options: {
        },
        src:['<%= src.js %>' ,'<%= distDir %>/partials/app.tpl.js'],
        dest:'<%= distDir %>/js/app.js'
      }
    },

    jshint:{
      files:['Gruntfile.js', '<%= src.js %>', '<%= src.jsTpl %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    },

    copy: {
      dev: {
        files: [
          {
            cwd: 'src/bower_components/bootstrap/dist/css',
            src : ['bootstrap.css','bootstrap.css.map','bootstrap.min.css'],
            dest: '<%= distDir %>/css',
            expand: true,
          },
          {
            cwd: 'src/bower_components/fontawesome/css',
            src : ['font-awesome.css','font-awesome.min.css'],
            dest: '<%= distDir %>/css',
            expand: true,
          },
          { dest: '<%= distDir %>', src : '**', expand: true, cwd: 'src/assets/' }
        ]
      },
      assets: {
        files: [{ dest: '<%= distDir %>', src : '**', expand: true, cwd: 'src/assets/' }]
      }
    }

  });
};