var path = require('path');
var fs = require('fs');
var package = require('../package.json');

var args = require('minimist')(process.argv.slice(2));

var root = path.normalize(__dirname + '/..');

// var branch = fs.readFileSync(path.join(root,'..','..','..','..','.git/HEAD'),{encoding:'utf8'}).split('/').pop()

//fetch branch from git

module.exports = {
    ROOT: root,
    VERSION: args.version || require('../package.json').version,
    PACKAGE: package,
    CONTENT: path.join(root, 'app/'),
    DIST: path.join(root,'/public/'),
    SCRIPTS: path.join(root,'scripts/'),
    NODE_MODULES: path.join(root, 'node_modules/'),
    KARMA_CONFIG: path.join(root, 'karma.conf.js'),
    TS_CONFIG: path.join(root, '/tsconfig.json')
};
