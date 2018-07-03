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


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: '*',
            // gas: 2000000,   // <--- Twice as much
            // gasPrice: 10000000000,
        },
        kovan: {
            provider: infuraProvider('kovan'),
            network_id: "42",
            gasPrice: 1000000000
        },
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
