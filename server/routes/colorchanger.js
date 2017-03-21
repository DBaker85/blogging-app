// this controller receives a typed color name and checks it against the locally stored object to compare colors to seven basic ones.
// Then the color base is sent back to the frontend
var fs = require("fs");

module.exports = function(app) {
  app.post('/color-changer', function (req, res){

    var colorresp;
    var stylesheet;
    var colorList = {"sky-blue":{"primary":"blue"},"blue":{"primary":"blue"},"azure":{"primary":"blue"},"cobalt":{"primary":"blue"},"sapphire":{"primary":"blue"},"cerulean":{"primary":"blue"},"navy":{"primary":"blue"},"saxe":{"primary":"blue"},"ultramarine":{"primary":"blue"},"lapis lazuli":{"primary":"blue"},"indigo":{"primary":"blue"},"aquamarine":{"primary":"blue"},"turquoise":{"primary":"blue"},"teal":{"primary":"blue"},"cyan":{"primary":"blue"},"pink":{"primary":"pink"},"rose":{"primary":"pink"},"salmon":{"primary":"pink"},"shell":{"primary":"pink"},"coral":{"primary":"pink"},"flesh":{"primary":"pink"},"yellow":{"primary":"yellow"},"lemon":{"primary":"yellow"},"amber":{"primary":"yellow"},"gold":{"primary":"yellow"},"blonde":{"primary":"yellow"},"red":{"primary":"red"},"scarlet":{"primary":"red"},"vermilion":{"primary":"red"},"ruby":{"primary":"red"},"cherry":{"primary":"red"},"cardinal":{"primary":"red"},"carmine":{"primary":"red"},"wine":{"primary":"red"},"blood":{"primary":"red"},"maroon":{"primary":"red"},"sanguine":{"primary":"red"},"magenta":{"primary":"red"},"purple":{"primary":"purple"},"lavender":{"primary":"purple"},"lilac":{"primary":"purple"},"mauve":{"primary":"purple"},"amethyst ":{"primary":"purple"},"plum":{"primary":"purple"},"violet":{"primary":"purple"},"plum":{"primary":"purple"},"green":{"primary":"green"},"mint":{"primary":"green"},"olive":{"primary":"green"},"pea":{"primary":"green"},"emerald":{"primary":"green"},"lime":{"primary":"green"},"gray":{"primary":"grey"},"black":{"primary":"grey"},"silver":{"primary":"grey"},"slate":{"primary":"grey"},"gunmetal":{"primary":"grey"},"grey":{"primary":"grey"},"orange":{"primary":"orange"},"apricot":{"primary":"orange"},"tangerine":{"primary":"orange"},"carrot":{"primary":"orange"},"peach":{"primary":"orange"} };

    for (color in colorList) {

      if (color == req.body.color) {
        console.log('Match found for '+color+'. Primary is '+colorList[color].primary);
        var filePath = './public/css/main-'+colorList[color].primary+'.css';
        var data = fs.readFileSync(filePath);
        colorresp = colorList[color].primary;
        stylesheet = data.toString();
      };

    };

    colorresp = colorresp || "unknown";
    res.json({"color":colorresp,"style":stylesheet});

    if (colorresp === "unknown") {
        fs.appendFile('./app/logs/colors.txt', req.body.color+',', function (err) {
          if (err) throw err;
          console.log('The unknown color was logged!');
        });
    };

  });
}
