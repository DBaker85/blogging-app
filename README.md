# Blogging App v4.0

A Simple blog running on NodeJs, ExpressJs and MongoDB for casual blogging.
Comes packed with a test suite that does Js and Css linting as well as Css stats.

### Changelog

v4.0.0 - Move to Angular-cli and Angular 5

v3.0.0 - Shifted to use webpack and Angular as an SPA

v2.0.0 - Shifted whole workflow to use Gulp, Pug and AngularJs

v1.2.1 - Optimised themer storage and added theme logging.

v1.2.0 - Moved content to external files and added content Json

v1.1.0 - Added stat tracker.

v1.0.1 - changed spinners to be more efficient.

#### Requirements
This package requires:
* Node
* Mongodb

#### Installation
Installs all node components
```shell
> npm install
```

#### Setting up
// TODO

#### Config.json
The config file is broken up in various parts :

##### config
// TODO

##### Blog setup
// TODO

##### Metas
// TODO

#### Default task
Default task that starts the server, compiles css and js and launches browserSync. You must be connected to a mongo instance for this to work.
Bower installs will automatically be recompiled and injected into the browser.
Icons added to the font folder will also be recompiled and the browser reloaded.
```shell
> gulp
```

