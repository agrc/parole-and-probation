module.exports = function configure(grunt) {
  require('load-grunt-tasks')(grunt);

  var deployFiles = ['**', '!runtimes/**'];
  var deployDir = 'parole';
  var secrets;
  try {
    secrets = grunt.file.readJSON('../../secrets.json');
  } catch (e) {
    // swallow for build server

    // still print a message so you can catch bad syntax in the secrets file.
    grunt.log.write(e);

    secrets = {
      stage: {
        host: '',
        username: '',
        password: ''
      },
      prod: {
        host: '',
        username: '',
        password: ''
      }
    };
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      deployment: {
        src: ['../../deploy']
      },
      clientApp: {
        src: ['./build']
      },
      aspnet: {
        src: ['../bin']
      },
      options: {
        force: true // delete folders outside working directory
      }
    },
    compress: {
      main: {
        options: {
          archive: '../../deploy/deploy.zip'
        },
        files: [{
          src: deployFiles,
          dest: './',
          cwd: '../bin/Release/netcoreapp3.1/publish',
          expand: true
        }]
      }
    },
    secrets: secrets,
    sftp: {
      offlineStage: {
        files: {
          './': '../app_offline.htm'
        },
        options: {
          force: true,
          srcBasePath: '../',
          host: '<%= secrets.stage.host %>',
          username: '<%= secrets.stage.username %>',
          password: '<%= secrets.stage.password %>'
        }
      },
      stage: {
        files: {
          './': '../../deploy/deploy.zip',
        },
        options: {
          force: true,
          host: '<%= secrets.stage.host %>',
          username: '<%= secrets.stage.username %>',
          password: '<%= secrets.stage.password %>'
        }
      },
      prod: {
        files: {
          './': '../../deploy/deploy.zip'
        },
        options: {
          host: '<%= secrets.prod.host %>',
          username: '<%= secrets.prod.username %>',
          password: '<%= secrets.prod.password %>'
        }
      },
      options: {
        path: './' + deployDir + '/',
        srcBasePath: '../../deploy/',
        showProgress: true
      }
    },
    sshexec: {
      stage: {
        command: ['cd ' + deployDir, 'unzip -oq deploy.zip', 'rm app_offline.htm', 'rm deploy.zip'].join(' && '),
        options: {
          host: '<%= secrets.stage.host %>',
          username: '<%= secrets.stage.username %>',
          password: '<%= secrets.stage.password %>'
        }
      },
      prod: {
        command: ['cd ' + deployDir, 'unzip -oq deploy.zip', 'rm deploy.zip'].join(';'),
        options: {
          host: '<%= secrets.prod.host %>',
          username: '<%= secrets.prod.username %>',
          password: '<%= secrets.prod.password %>'
        }
      }
    }
  });

  grunt.registerTask('deploy:stage', [
    'clean:deployment',
    'clean:clientApp',
    'compress:main',
    'sftp:stage',
    'sftp:offlineStage',
    'sshexec:stage'
  ]);

  grunt.registerTask('deploy:prod', [
    'clean:deployment',
    'clean:clientApp',
    'compress:main',
    'sftp:prod',
    'sshexec:prod'
  ]);
};
