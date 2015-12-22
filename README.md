# Blogging App

A Simple blog running on NodeJs, ExpressJs and MongoDB for casual blogging.
Comes packed with a test suite that does Js and Css linting as well as Css stats.

#### Requirements
This package requires:
* Node
* Bower
* Ruby and [scss-lint](https://github.com/causes/scss-lint) `>= 0.18.0`.
* Mongodb

#### Installation
Installs all node and bower components
```shell
> npm install
```

#### Setting up

The content is set up in `"./app/content"`

Inside are 3 files:
* `about.html` - This is optional and is just an about page if you wish to use it.
* `cookiepolicy.html` - again optional and is the site's cookie policy.
* `content.json` - This is not optional and is where all configuration is done.

#### Config.json
The config file is broken up in various parts :

##### config

```json
  "config":{
    "port":"4040",
    "sessionSecret":"session_secret_here",
    "mongoConnect":"mongodb://localhost:27017/blog"
  }
```
`port` is the port that you want the node app to use. If left empty it will bind to `process.env.PORT` whidh is required for heroku.

`sessionSecret` is required by session cookies.

`mongoConnect` is the mongodb port and database that the app should connect to.

##### Blog setup

```json
  "blogSetup":{
    "blogname":"blog name",
    "blogTagLine":"blog title",
    "blogDescription":"blog description"
    },
```

`blogname` is the name that will be used as the blogname across the site. It will show up in the main page title.

`blogTagLine` is the tagline of the site that will be used as a slogan across the site including in the header.

`blogDescription` a short description of what the blog is about. This shows up on the aside in the main menu just under the about me section.

##### Metas

```json
    "metas":{
      "title":"meta title",
      "keywords":"meta keywords",
      "description":"meta description",
      "author":"author",
      "subject":"subject",
      "language":"lang"
    },
```
```json
    "OG": {
      "sitename":"site name",
      "url":"url",
      "title":"",
      "description":"description",
      "image":"image",
      "type":"website"
    },
```

The `metas` and `OG` section are your basic OpenGraph and Google meta Seo descriptions.

##### Description

```json
    "aboutMe":{
      "name":"about me",
      "description":"my description",
      "skypeLink":"skype link",
      "githubLink":"github link",
      "linkedIn":"linkedin",
      "twitter":"twitter"
      },
```

`name` Your name if you wish to use it. Section will not show if empty.

`description` A short description if you wish to use it. Section will not show if empty.

`skypeLink` A link to your skypename. Section will not show if empty.

`githubLink` A link to your github page. Section will not show if empty.

`linkedIn` A link to your linkedIn page. Section will not show if empty.

`twitter` A link to your twitter account. Section will not show if empty.

##### Twitter section in the aside

```json
    "asideTwitter":{
      "twitterName":"twittername",
      "widgetID":"1234"
    },
```

This section is for enabling a twitter feed on the aside in desktop mode. It will not show if empty

`twitterName` is your twitter ID.

`widgetID` is the ID generated when creating a twitter widget from the twitter API website.

##### Footer

```json
    "footer":{
      "line1":"copyright",
      "line2":"<a href=\"#\">links</a>"
    }
```

The whole content of the footer. Each line is processed onto a seperate line and can include markup or just text.

#### Default task
Default task that starts the server, compiles css and js and launches browserSync. You must be connected to a mongo instance for this to work.
```shell
> grunt
```

#### Build task
Compiles all the css stylesheets and Javascript. All minified.
```shell
> grunt build
```

#### Test task
Grunt test will compile styles for the test platform, and perform a full suite of tests on the codes and present it in a consumable format in your browser.
```shell
> grunt test
```
