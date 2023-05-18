const fs = require('fs');

// enter an inputFile path
const inputFilePath = './input/input.json';
const outputFilePath = './output/output.json';

// read inputFile
fs.readFile(inputFilePath, 'utf8', (err, data) => {
  // throw error if reading file is impossible
  if (err) throw err;

  // parse json to array
  const inputArr = JSON.parse(data);
  const outputArr = [];

  // add children property for all nodes
  inputArr.map(node => node.children = []);

  // loop through the array 
  for (const node of inputArr) {
    // if the node has parentId save this node as a child property of the parent
    if (node.parentId) {
      inputArr.map(inputNode => {
        // check if this node is a parent
        if (inputNode.nodeId === node.parentId) rearranging(node, inputNode.children)
      });
    }

    // save all rearranged nodes to new array
    if (!node.parentId) rearranging(node, outputArr)
  }

  // save new array to new outputFile
  fs.writeFile(outputFilePath, JSON.stringify(outputArr, null, 2), (err) => {
    // throw error if reading file is impossible
    if (err) throw err;
    console.log('The file has been saved!');
  });
});

// fucntion for rearranging nodes according to their property previousSiblingId
const rearranging = (node, arr) => {
  // if previousSiblingId = null save node in the first possition of array
  if (!node.previousSiblingId) arr.unshift(node);
  else {
    // get previous node index
    const prevNodeInd = arr.findIndex(prevNode => prevNode.nodeId === node.previousSiblingId);
    // if previous node index is not save node in the last possition of array
    if (prevNodeInd < 0) arr.push(node);
    // else save node in the specific index of array
    else arr.splice(prevNodeInd + 1, 0, node)
  }
};
