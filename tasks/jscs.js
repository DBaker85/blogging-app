module.exports = {
	src: [ 'app/scripts/classes/*.js','app/scripts/controllers/*.js','app/scripts/*.js' ],
	options: {
        config: ".jscsrc",
        reporter: 'node_modules/jscs-json-reporter/jscs-json-reporter.js',
        reporterOutput: 'app/test/sources/jscs-report.json',
        force: true
    }
}
