const { ethers } = require("hardhat");

async function main() {
  // deploy selfdestruct contract, fund it, destroy it giving ether to pairAddress

  /// deployment
  [account] = await ethers.getSigners();
  deployerAddress = account.address;
  console.log(`Deploying contracts using ${deployerAddress}`);
  const counter = await ethers.getContractFactory('SCounter');
  const counterInstance = await counter.deploy();
  await counterInstance.deployed();
  console.log(`Scontract deployed to  ${counterInstance.address}`);

  /// funding
  await account.sendTransaction({
    to: counterInstance.address,
    value: ethers.utils.parseEther("100") // 1 ether
  })
  console.log(await ethers.provider.getBalance(counterInstance.address));

  /// destruction
  const pairAddress = "0x2E8135bE71230c6B1B4045696d41C09Db0414226";
  await counterInstance.connect(account).kill(pairAddress);
  console.log("trying to kill");
  console.log(await ethers.provider.getBalance(pairAddress));


  // Impersonate the Pancake Swap's USDC-WETH Pair Address
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [pairAddress],
  });
  const pairSigner = await ethers.getSigner(pairAddress);
  console.log(pairSigner);

  const vitalik_eth = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; 

  const erc20Abi = [
    "function approve(address spender, uint256 value) external returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
    "function transfer(address recipient, uint256 amount) external returns (bool)",
    "function balanceOf(address account) view returns (uint256)" 
  ];

  const usdcContract = new ethers.Contract(usdcAddress,erc20Abi,pairSigner);
  
  // Transferring USDC to Viltalik's Address;
  const usds_bal_before = await usdcContract.balanceOf(vitalik_eth);
  console.log("usds_bal_before", usds_bal_before);
  const amount_to_transfer = ethers.utils.parseUnits("100000", 6) 
  const usdc_trf_tx = await usdcContract.transfer(vitalik_eth, amount_to_transfer); 
  console.log(usdc_trf_tx);
  const usds_bal_after = await usdcContract.balanceOf(vitalik_eth);
  if (Number(usds_bal_after)-Number(usds_bal_before) ==Number(amount_to_transfer)) {
    console.log(true);
  } 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
