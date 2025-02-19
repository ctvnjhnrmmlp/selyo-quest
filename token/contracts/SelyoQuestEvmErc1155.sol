// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 || <= 9.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SelyoQuestEvmErc1155 is ERC1155, Ownable {
  using Strings for uint;

  mapping(uint => uint) public totalSupply;
  mapping(uint => string) private _tokenURIs;
  mapping(uint => bool) public isConfigured;
  
  uint public MAX_BADGES = 1000;

  constructor() ERC1155("") Ownable(msg.sender) {}

  // Add new token configuration
  function addTokenConfig(uint tokenId, string memory tokenURI) public onlyOwner {
    require(!isConfigured[tokenId], "Token already configured");
    _tokenURIs[tokenId] = tokenURI;
    isConfigured[tokenId] = true;
  }

  // Update existing token configuration
  function updateTokenConfig(uint tokenId, string memory newTokenURI) public onlyOwner {
    require(isConfigured[tokenId], "Token not configured");
    _tokenURIs[tokenId] = newTokenURI;
  }

  // Mint tokens to a specific address
  function mint(address to, uint tokenId, uint amount) public onlyOwner {
    require(isConfigured[tokenId], "Token not configured");
    require(totalSupply[tokenId] + amount <= MAX_BADGES, "Exceeds max supply");

    _mint(to, tokenId, amount, "");
    totalSupply[tokenId] += amount;
  }

  // Override uri function to return configured URI
  function uri(uint tokenId) public view virtual override returns (string memory) {
    require(isConfigured[tokenId], "Token not configured");
    return _tokenURIs[tokenId];
  }

  function burnBadge(uint tokenId, uint amount) public {
    require(isConfigured[tokenId], "Token not configured");
    _burn(msg.sender, tokenId, amount);
    totalSupply[tokenId] -= amount;
  }
}