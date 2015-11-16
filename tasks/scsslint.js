module.exports = {
  allFiles: [
      'app/sass/*.scss',
      'app/sass/**/*.scss'
    ],
  options: {
      // config: 'config/test/scss-lint.yml',
      reporterOutput: 'app/test/sources/css-report',
      reporter: 'json',
      force: true,
      exclude:[
        'app/sass/test.scss',
        'app/sass/test/*.scss',
        'app/sass/test/**/*.scss'
      ]
    }
}
