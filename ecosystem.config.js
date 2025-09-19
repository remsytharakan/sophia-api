module.exports = {
    apps: [
      {
        name: 'sophia-api',
        script: './bin/www',
  
        node_args: ['--inspect=0.0.0.0:9244'],
        watch: true,
        ignore_watch: ['public/**/*', 'views/**/*.ejs'],
      },
    ],
  };