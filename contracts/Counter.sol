// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    function incrementCounter() public {
        count += 1;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}