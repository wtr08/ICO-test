var WeatherToken = artifacts.require("./WeatherToken.sol");
var WeatherCrowdsale = artifacts.require("./WeatherCrowdsale.sol");

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(WeatherToken, "Weather Token", "WRT", 18);
    const deployToken = await WeatherToken.deployed();
    console.log(deployToken.address);

    //
    // uint256 _rate,
    //     address _wallet,
    //     ERC20 _token,
    //     uint256 _openingTime,
    //     uint256 _closingTime,
    //     uint256 _cap

    const rate = 1000; // 1 eth = 1000 WRT Tokens
    const wallet = accounts[0];
    const timeNow = Math.floor(Date.now()/1000);
    const openingTime =  timeNow + duration.seconds(30);
    const closingTime = timeNow + duration.years(1);
    const cap = web3.toWei(1);

    console.log("HAHAHAH");
    await deployer.deploy(WeatherCrowdsale,rate, wallet, deployToken.address, openingTime, closingTime, cap);
    const deployCrowdsale = await WeatherCrowdsale.deployed();
    console.log('aaa',deployCrowdsale.address);
    await deployToken.transferOwnership(deployCrowdsale.address);
    console.log("Contracts Deployed: \n",deployCrowdsale.address, deployToken.address);
    return true;
};
