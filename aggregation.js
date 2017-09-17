const BIOME_INPUT_FOLDER = './WorldBiomesInput/';
const BIOME_OUTPUT_FOLDER = './WorldBiomesOutput/';

var fs = require('fs');
var biomeObjText = fs.readFileSync('./keys.json', 'utf8');
var biomeFiles = fs.readdirSync(BIOME_INPUT_FOLDER, 'utf8');

var debug = new Array();
var biomes = new Object();

biomeFiles.forEach((biomeFileName, index, array) => {
  console.log(biomeFileName);
  var biome = JSON.parse(biomeObjText);

  var biomeFileTextReadAll = fs.readFileSync(BIOME_INPUT_FOLDER + biomeFileName,'utf8');
  var biomeTextFilteredArray = biomeFileTextReadAll.replace(/\r\n?/g,'\n').split('\n')
  .filter((element, index, array) => {
    var flgSharp = !element.startsWith('#');
    var flgEmpty = !element.length == 0;
    var flgSpawn = !element.startsWith('Spawn');
    return(flgSharp && flgEmpty && flgSpawn);
  })
  biomeTextFilteredArray.forEach((biomeTextLine, index, array) => {
    if (biomeTextLine.includes(': ')) {
      var b = biomeTextLine.indexOf(': ');
      biome[biomeTextLine.substring(0, b)] = biomeTextLine.substring(b+1).trim();
    } else {
      var b = biomeTextLine.indexOf('(');
      biome[biomeTextLine.substring(0, b)].push(biomeTextLine);
    }
  })
  // console.log(biomeTextFilteredArray);
  // debug.push(biomeTextFilteredArray);
  biomes[biomeFileName] = biome;
});

// fs.writeFileSync("./temp.txt", JSON.stringify(debug), 'utf8');
fs.writeFileSync("./Biomes.json", JSON.stringify(biomes), 'utf8');
