const { ethers } = require('hardhat');
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

async function main() {
  const name = "Employee Reward Token";
  const symbol = "ERC";
  const decimals = 0;
  const ercContract = await deploy('ERC',name,symbol,decimals);
  console.log("erc deployed to:", ercContract.address);

  writeFileSync('output.json', JSON.stringify({
    Erc: ercContract.address
  }, null, 2));
  const owner = await ercContract.getOwner();
console.log("Owner address:", owner);

}
if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}