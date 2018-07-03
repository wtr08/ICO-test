pragma solidity 0.4.24;
import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import 'openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol';
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
//import "openzeppelin-solidity/contracts/crowdsale/distribution/FinalizableCrowdsale.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

interface MintableERC20 {
    function finishMinting() public returns (bool);
}
contract WeatherCrowdsale is Crowdsale, TimedCrowdsale, CappedCrowdsale, RefundableCrowdsale, MintedCrowdsale{

    bool public isFinalized = false;
    event Finalized();

    constructor
    (
        uint256 _rate,
        address _wallet,
        ERC20 _token,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _cap,
        uint256 _goal
    )
    Crowdsale(_rate,_wallet,_token)
    TimedCrowdsale(_openingTime, _closingTime)
    CappedCrowdsale(_cap)
    RefundableCrowdsale(_goal)
    public
    {

    }

//    function forwardFunds() internal {
//        EthTransferred("forwarding funds to refundable vault");
//        super.forwardFunds();
//    }

    function finalize() public {
        require(!isFinalized);
        require(hasClosed() || capReached());

        finalization();
        emit Finalized();

        isFinalized = true;
    }

    function finalization() internal {
        MintableERC20 mintableToken = MintableERC20(token);
        mintableToken.finishMinting();
    }
}