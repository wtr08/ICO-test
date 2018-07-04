var TemplateToken = artifacts.require('./TemplateToken.sol');
var TemplateCrowdsale = artifacts.require('./TemplateCrowdsale.sol');

contract('TemplateCrowdsale', async (accounts) => {

    console.log('accounts', accounts)

    let crowdsale = null;

    // fill variables from migration file
    before(async () => {
        crowdsale = await TemplateCrowdsale.deployed();
    });

    it('1 ETH should buy 5 tokens in ICO', async function(){
        // const data = await crowdsale.sendTransaction({ value: web3.toWei(1, "ether"), from: accounts[0] });
        // console.log("send ethers");
        // const tokenAddress = await crowdsale.token.call();
        // const templateToken = TemplateToken.at(tokenAddress);
        // const tokenAmount = await templateToken.balanceOf(accounts[7]);
        // console.log(tokenAmount.toNumber());
        // return assert.equal(tokenAmount.toNumber(), 5000000000000000000, 'The sender didn\'t receive the tokens as per ICO rate');
    });
});
