const TemplateToken = artifacts.require("TemplateToken.sol");
const TemplateCrowdsale = artifacts.require("TemplateCrowdsale.sol");
const moment = require('moment');

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
    deployer.then(async function(){
        await deployer.deploy(TemplateToken, "Weather Token", "WRT", 18);
        const deployToken = await TemplateToken.deployed();
        console.log(deployToken.address);

        const rate = 5; // 1 eth = 5 Template Tokens
        const wallet = accounts[0];
        const timeNow = Math.floor(Date.now()/1000);
        const openingTime =  moment()
            .add(2, "minutes")
            .unix();
        console.log(openingTime);
        const closingTime = moment()
            .add(10, "weeks")
            .unix();
        console.log(closingTime);
        const cap = web3.toWei(100);
        const goal = web3.toWei(20);

        console.log('HAHAHAH');
        await deployer.deploy(TemplateCrowdsale,rate, wallet, deployToken.address, openingTime, closingTime, cap, goal);
        const deployCrowdsale = await TemplateCrowdsale.deployed();
        console.log('ddd');

        console.log('bbbb', deployCrowdsale.address);
        await deployToken.transferOwnership(deployCrowdsale.address);
        console.log("Contracts Deployed: \n",deployCrowdsale.address, deployToken.address);
        return true;
    });
};