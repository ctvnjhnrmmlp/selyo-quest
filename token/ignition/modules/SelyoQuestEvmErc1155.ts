import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const INITIAL_TOKENS = [
  {
    tokenId: 1,
    uri: "",
    mintAmount: 10,
    recipient: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  }
];

const SelyoQuestEvmErc1155Module = buildModule('SelyoQuestEvmErc1155Module', (m) => {
  const contract = m.contract('SelyoQuestEvmErc1155');

  INITIAL_TOKENS.forEach((token) => {
    const configureToken = m.call(contract, "addTokenConfig", [token.tokenId, token.uri], {
      id: `configure_token_${token.tokenId}`,
      after: [],
    });

    m.call(
      contract,
      "mint",
      [token.recipient, token.tokenId, token.mintAmount],
      {
        id: `mint_token_${token.tokenId}`,
        after: [configureToken],
      }
    );
  });

  return { contract };
});

export default SelyoQuestEvmErc1155Module;
