pragma solidity ^0.8.0;

contract JobDeal {
    bytes32 public state;
    uint public payment;
    uint public paymentFrec;
    string public recObligations;
    string public workObligations;


    constructor(bytes32 _initialValue) {
        state = _initialValue;
    }

    function setState(bytes32 _value) public {
        state = _value;
    }
    
    function setPayment(uint _value) public {
        payment = _value;
    }

    function setPaymentFrec(uint _value) public {
        paymentFrec = _value;
    }

    function setrecObligations(string storage _value) public {
        recObligations = _value;
    }

    function setworkObligations(string storage _value) public {
        workObligations = _value;
    }
}
