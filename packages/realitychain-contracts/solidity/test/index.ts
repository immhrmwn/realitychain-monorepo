import { ethers } from "hardhat";

describe("RealityChainToken", function () {
  it("should deploy", async function () {
    const erc20Contract = await ethers.getContractFactory(
      "RealityChainToken"
    );
    const erc20Deployed = await erc20Contract.deploy();
    await erc20Deployed.deployed();
  });
});
