const fs = require('fs');

const expectedTreeFilePath = './output/expected-tree.json';
const outputTreeFilePath = './output/output.json';

const assert = () => {
  // read inputFile
  fs.readFile(expectedTreeFilePath, (err, expectedData) => {
    // throw error if reading file is impossible
    if (err) throw err;
    
    fs.readFile(outputTreeFilePath, (err, outputData) => {
      // throw error if reading file is impossible
      if (err) throw err;

      // check are files identical
      if (expectedData.equals(outputData)) console.log('Files are identical');
      else console.log('Files are not identical');
    });
  });
};

assert();
