// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    struct Wave {
        address waver; 
        string message;
        uint256 timestamp;
    }

    uint256 totalWaves;
    Wave[] waves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave(string memory _message) public {
        totalWaves++;
        console.log("%s waved w/ message %s!", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // return array waves to frontend
    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have had %s total waves!", totalWaves);
        return totalWaves;
    }
}