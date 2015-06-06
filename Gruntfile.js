module.exports = function(grunt) {

  var rewrite = require( "connect-modrewrite" );

  // var bower = "components/";

  function addLib(array){
    var n = [];
    array.forEach(function(a){
      n.push('public/lib/'+a+'.js');
    });
    return n;
  }

  function addSrc(array){
    var n = [];
    array.forEach(function(a){
      n.push('js/src/'+a+'.js');
    });
    return n;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell:{
      bower:{
        command:'bower install'
      },
      npm:{
        command:'npm install'
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '',
          hostname:'localhost',
          open:true,
          middleware: function(connect, options, middlewares) {
            var rules = [
                "!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.woff|\\.tiff|\\.gif$ /index.html"
            ];
            middlewares.unshift( rewrite( rules ) );
            return middlewares;
          }
        }
      }
    },
    copy:{
      html:{
        files:[
        {
          src:'dist/index.html',
          dest:'index.html',
          filter:'isFile'
        }
        ]
      }
    },
    uglify:{
      srcScripts:{
        options:{
          mangle:false,
          compress:false,
          beautify:true
        },
        files:{
          'public/js/dist/script.min.js':addSrc([
          'contact',
          'script'
          ])
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/src',
        src: ['*.css', '!*.min.css'],
        dest: 'css/dist',
        ext: '.min.css'
      }
    },
    autoprefixer:{
      single_file:{
        options:{
          browsers:['last 2 versions']
        },
        src:'css/src/style.css',
        dest:'css/dist/style.min.css'
      }
    },
    watch:{
      grunt:{
        files:['Gruntfile.js'],
        tasks:[]
      },
      j:{
        options:{
          livereload:false
        },
        files:['_site/**/*.**'],
        tasks:['shell:jekyll','copy']
      },
      srcScripts:{
        options:{
           livereload:false
         },
        files:['js/public/**/*.js'],
      },
      sass:{
        files:['scss/**/*.scss'],
        tasks:['compass']
      },
      css:{
        options:{
          livereload:false
        },
        files:['public/css/**/*.css']
      },
      pages:{
        options:{
          livereload:false
        },
        files:['public/**/*.html']
      }
    },
    compass:{
      dist:{
        options:{
          cssDir:'public/css/src',
          sassDir:'scss',
          imagesDir:'public/img',
          fontsPath:'fonts',
          require:['breakpoint','sass-css-importer', 'compass-flexbox'],
          httpPath:'',
          relativeAssets:true,
          noLineComments:true,
          outputStyle:'compact'
        }
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task(s).
  grunt.registerTask('default', ['shell:bower','shell:npm','connect','watch']);

};