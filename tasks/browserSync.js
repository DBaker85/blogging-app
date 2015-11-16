module.exports = {
	dev: {
      			bsFiles: {
      				src: [
      				'public/css/main.css',
      				'public/scripts/all.min.js',
      				'app/jade/**/*.jade',
                              ]
      			},
      			options: {
      				watchTask: true,
      				proxy: "localhost:4040",
      				port: 3500,
      				ui: {
      					port: 3030
      				}

      			}
      		}
}
