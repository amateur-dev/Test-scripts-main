const { ethers } = require('hardhat');

// Deploy function
async function deploy() {
    [account] = await ethers.getSigners();
    deployerAddress = account.address;
    console.log(`Deploying contracts using ${deployerAddress}`);
    const counter = await ethers.getContractFactory('SCounter');
    const counterInstance = await counter.deploy();
    await counterInstance.deployed();

    console.log(`Scontract deployed to  ${counterInstance.address}`);
  
    //    await run(`verify:verify`, {
    //     address: counterInstance.address,
    // });

    // const contractBalance = await ethers.provider.getBalance("0x8468b90081658056BB75EF0495649C4726DABbea");
    // console.log(`Scontract balance  ${contractBalance}`);

    const counter2 = await ethers.getContractFactory('Counter');
    const counter2Instance = await counter2.deploy(
    );
    await counter2Instance.deployed();
    console.log(`contracts  deployed to  ${counter2Instance.address}`);
    
    // await run(`verify:verify`, {
    //     address: counter2Instance.address,
    // });
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
