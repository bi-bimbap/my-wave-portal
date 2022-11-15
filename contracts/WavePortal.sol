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
    uint256 seed; // to generate random no
    mapping(address => uint256) public lastWavedAt;

    event NewWave(address indexed from, uint256 timestamp, string message);

    constructor() payable {
        console.log("We have been constructed!");

        // set the initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        uint256 prizeAmount = 0.0000001 ether;

        // prevent users from spamming, they need to wait 15 mins from when they last waved
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Wait 30 seconds");

        lastWavedAt[msg.sender] = block.timestamp; // update timestamp

        totalWaves++;
        console.log("%s waved w/ message %s!", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        // generate a new seed for the next user that send a wave
        seed = (block.timestamp + block.difficulty + seed) % 100;
        console.log("Random # generated: %d", seed);

        if (seed < 50) {
            console.log("%s won!", msg.sender);

            require(prizeAmount < address(this).balance, "Trying to withdraw more money than the contract has");

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract");
        }

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