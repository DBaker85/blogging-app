# Blog

A Simple blog running on NodeJs, ExpressJs and MongoDB for casual blogging.
Comes packed with a test suite that does Js and Css linting as well as Css stats.

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
