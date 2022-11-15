const main = async () => {
    // compile contract & generate "artifacts" directory
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // create new local Ethereum network
    // contructor will be called here
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.0001")
    });
    await waveContract.deployed();
    console.log("Contract address: ", waveContract.address);

    // get contract balance before waving
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    // let's try 2 waves
    let waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait();

    let waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    // get contract balance after waving
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    // // get wallet address of contract owner & some random wallet
    // // the first value in array will always be owner
    // const [owner, randomPerson] = await hre.ethers.getSigners();
    // // connect() is a hardhat function to allow another address to interact with contract
    // // this simulates a different person waving
    // waveTxn = await waveContract.connect(randomPerson).wave("Another message");
    // await waveTxn.wait();
};

const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } 
    catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();