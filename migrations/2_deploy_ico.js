var TemplateToken = artifacts.require("./TemplateToken.sol");
var TemplateCrowdsale = artifacts.require("./TemplateCrowdsale.sol");

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(TemplateToken, "Template Token", "WRT", 18);
    const deployToken = await TemplateToken.deployed();
    console.log(deployToken.address);

    const rate = 1000; // 1 eth = 1000 WRT Tokens
    const wallet = accounts[0];
    const timeNow = Math.floor(Date.now()/1000);
    const openingTime =  timeNow + duration.seconds(30);
    const closingTime = timeNow + duration.years(1);
    const cap = web3.toWei(100);
    const goal = web3.toWei(20);

    console.log('HAHAHAH');
    await deployer.deploy(TemplateCrowdsale,rate, wallet, deployToken.address, openingTime, closingTime, cap, goal);
    const deployCrowdsale = await TemplateCrowdsale.deployed();
    console.log('aaaa', deployCrowdsale.address);
    await deployToken.transferOwnership(deployCrowdsale.address);
    console.log("Contracts Deployed: \n",deployCrowdsale.address, deployToken.address);
    return true;
};
