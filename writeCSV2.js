var fs = require('fs');
var biomes = JSON.parse(fs.readFileSync('./Biomes.json', 'utf8'));
var biomeFileNames = Object.keys(biomes);
var biomeRef = JSON.parse(fs.readFileSync('./keys.json', 'utf8'));
var biomeParameterList = Object.keys(biomeRef);
var output = new Array();

output.push('"","' + biomeParameterList.join('","') + '"');


biomeFileNames.forEach((biomeFileName) => {
  var biomeAllParameterArray = new Array();
  biomeParameterList.forEach((biomeParameterKey) => {
    biomeAllParameterArray.push(biomes[biomeFileName][biomeParameterKey]);
  })
  output.push('"' + biomeFileName + '","' + biomeAllParameterArray.join('","') + '"');
})


// biomeParameterList.forEach((biomeParameterKey, index, array) => {
//   var biomeParameterAllArray = new Array();
//   biomeParameterAllArray.push(biomeParameterKey);
//   biomeFileNames.forEach((biomeFileName) => {
//     biomeParameterAllArray.push(biomes[biomeFileName][biomeParameterKey]);
//   })
//   output.push('"' + biomeParameterAllArray.join('","') + '"');
// })

fs.writeFileSync('Biomes2.csv', output.join('\r\n'), 'utf8');
