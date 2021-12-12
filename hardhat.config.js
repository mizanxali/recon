require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
const privateKey = fs.readFileSync('.secret').toString();
const projectId = fs.readFileSync('.alchemyid').toString();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: 'https://rpc-mainnet.matic.network',
      accounts: [privateKey]
    }
  },
  solidity: '0.8.4',
};
