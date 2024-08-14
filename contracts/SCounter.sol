// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SCounter {
    // Function to receive Ether
    receive() external payable {}

    // Self-destruct function to send Ether to the contract owner
    function kill(address payable receiver) public {
        selfdestruct(receiver);
    }
}
