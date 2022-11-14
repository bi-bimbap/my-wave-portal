const main = async () => {
    // get wallet address of contract owner & some random wallet
    // the first value in array will always be owner
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // compile contract & generate "artifacts" directory
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // create new local Ethereum network
    // contructor will be called here
    const waveContract = await waveContractFactory.deploy();

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);

    await waveContract.getTotalWaves();

    const firstWaveTxn = await waveContract.wave(); // wave() returns a transaction object
    await firstWaveTxn.wait(); // wait for transaction to be mined/go through

    await waveContract.getTotalWaves();

    // connect() is a hardhat function to allow another address to interact with contract
    // this simulates a different person waving
    const secondWaveTxn = await waveContract.connect(randomPerson).wave();
    await secondWaveTxn.wait();

    await waveContract.getTotalWaves();
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