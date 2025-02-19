// import { expect } from "chai";
// import { test } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
// import { createPublicClient, createWalletClient, http, parseEther, getContractAt } from "viem";
// import { hardhat } from "viem/chains";
// import { deployContract } from "@nomicfoundation/hardhat-viem/deployContract";
// import { abi, bytecode } from "../artifacts/contracts/SelyoQuestEvmErc1155.sol/SelyoQuestEvmErc1155.json";

// test("SelyoQuestEvmErc1155 Contract", async ({ network }) => {
//   // ✅ Set up Clients
//   const [owner, user] = await network.getWalletClients();
//   const publicClient = createPublicClient({ chain: hardhat, transport: http() });

//   // ✅ Deploy Contract
//   const contractAddress = await deployContract("SelyoQuestEvmErc1155", owner);
//   const contract = getContractAt(abi, contractAddress, owner);

//   // ✅ Verify Contract Deployment
//   expect(contractAddress).to.be.properAddress;

//   // ✅ Token Configurations
//   const tokenId = 1;
//   const tokenURI = "ipfs://example-token-uri";

//   await contract.write.addTokenConfig([tokenId, tokenURI]);
//   expect(await contract.read.isConfigured([tokenId])).to.be.true;
//   expect(await contract.read.uri([tokenId])).to.equal(tokenURI);

//   // ✅ Minting Tokens
//   const mintAmount = 10;
//   await contract.write.mint([user.account.address, tokenId, mintAmount]);

//   expect(await contract.read.totalSupply([tokenId])).to.equal(mintAmount);

//   // ✅ Burn Tokens
//   await contract.connect(user).write.burnBadge([tokenId, 5]);
//   expect(await contract.read.totalSupply([tokenId])).to.equal(5);

//   // ✅ Updating Token Config
//   const newTokenURI = "ipfs://updated-token-uri";
//   await contract.write.updateTokenConfig([tokenId, newTokenURI]);
//   expect(await contract.read.uri([tokenId])).to.equal(newTokenURI);
// });
