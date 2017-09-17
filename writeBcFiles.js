const BIOME_INPUT_FOLDER = './WorldBiomesInput/';
const BIOME_OUTPUT_FOLDER = './WorldBiomesOutput/';

var fs = require('fs');
var biomes = JSON.parse(fs.readFileSync('./Biomes.json', 'utf8'));

var biomeFileNames = Object.keys(biomes);
console.log(biomeFileNames);

biomeFileNames.forEach((biomeFileName, index, array) => {
  var biome = biomes[biomeFileName];
  var biomeParameters = Object.keys(biome);
  var out = new Array();
  biomeParameters.forEach((biomeParameterName, index, array) => {
    var biomeParameterValue = biome[biomeParameterName];
    switch (typeof(biomeParameterValue)) {
      case 'string':
        if (biomeParameterValue.length != 0){
          out.push(biomeParameterName + ': ' + biomeParameterValue);
        }
        break;
      case 'object':
        biomeParameterValue.forEach((element, index, array) => {
          out.push(element);
        })
    }

  })
  // console.log(out.join('\r\n'));
  fs.writeFileSync(BIOME_OUTPUT_FOLDER + biomeFileName, out.join('\r\n'), 'utf8');
})
