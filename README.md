# Blogging App v1.2.1

A Simple blog running on NodeJs, ExpressJs and MongoDB for casual blogging.
Comes packed with a test suite that does Js and Css linting as well as Css stats.

### Changelog

v1.2.1 - optimised themer storage and added theme logging.

v1.2.0 - Moved content to external files and added content Json

v1.1.0 - Added stat tracker.

v1.0.1 - changed spinners to be more efficient.

### Requirements
This package requires:
 Node
 Bower
 Ruby and [scss-lint](https://github.com/causes/scss-lint) `>= 0.18.0`.

### Installation :
Installs all node and bower components
```shell
> npm install
```

### Default task
Default task that starts the server, compiles css and js and launches browserSync.
```shell
> grunt
```
### Build task
Compiles all the css stylesheets and Javascript. All minified.
```shell
> grunt build
```

### Test task
Grunt test will compile styles for the test platform, and perform a full suite of tests on the codes and present it in a consumable format in your browser.
```shell
> grunt test
```
