/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

const infuraProvider = network => providerWithMnemonic(
    process.env.MNEMONIC || '',
    `https://${network}.infura.io/${process.env.INFURA_API_KEY}`
);

const providerWithMnemonic = (mnemonic, rpcEndpoint) =>
    new HDWalletProvider(mnemonic, rpcEndpoint);

const mnemonic = "poa is awesome";
const infura_apikey = "k5sTkvpaIFsZ5lGkCoh8";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: '*',
        },
        ropsten: {
            provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
            network_id: 3,
            gas: 4700000,
        },
        kovan: {
            provider: new HDWalletProvider(mnemonic, "https://kovan.infura.io/"+infura_apikey),
            network_id: 42,
            gas:  2123456
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
