/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');


module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: "https://rpc.ankr.com/eth"
      },
    },
    buildbear: {
      url: "https://rpc.buildbear.io/dipeshsukhani",
      account: {
        mnemonic: "fall provide funny crop surface soft disagree churn weapon gain fun salute",
      },
    },
  },

}