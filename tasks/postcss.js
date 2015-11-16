module.exports = {

    options: {

      processors: [
        require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes

      ]
    },
    dist: {
      src: 'public/css/*.css'
    }

}
