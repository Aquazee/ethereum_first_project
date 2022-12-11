// compile code will go here
const fs = require('fs');
const path = require('path');
const solc = require('solc')

const filePath = path.resolve(__dirname, './contracts/inbox.sol');
var input = {
  language: 'Solidity',
  sources: {
    'inbox.sol': {
      content: fs.readFileSync(filePath, 'utf-8')
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

function findImports(path) {
  if (path === 'inbox.sol')
    return {
      contents:
        'library L { function f() internal returns (uint) { return 7; } }'
    };
  else return { error: 'File not found' };
}

// New syntax (supported from 0.5.12, mandatory from 0.6.0)
var output = JSON.parse(
  solc.compile(JSON.stringify(input), { import: findImports })
);

// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['inbox.sol']) {
//   console.log(
//     contractName +
//     ': ' +
//     output.contracts['inbox.sol'][contractName].evm.bytecode.object
//   );
// }

module.exports = output.contracts['inbox.sol']['Inbox'];
