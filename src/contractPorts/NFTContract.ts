import {ethers} from "ethers";
import {BLUE_NFT_ADDRESS, MARKET_CONTRACT_ADDRESS} from "../constants";
import NFT_ABI from "./abis/NFT_ABI.json";
import {BaseContract} from "./BaseContract";

class NFTContract extends BaseContract {
  constructor(provider: ethers.providers.Web3Provider, account = "") {
    super(provider, BLUE_NFT_ADDRESS, NFT_ABI, account);
  }

  async getApproved(tokenId: number) {
    return await this.getContract().getApproved(tokenId);
  }

  async approve(to: string, tokenId: number) {
    if (!this.isWritable()) {
      throw Error("Contract is not writable");
    }
    return await this.getContract().approve(to, tokenId);
  }

  async mint(url: string) {
    if (!this.isWritable()) {
      throw Error("Contract is not writable");
    }
    return await this.getContract().mint(url);
  }
}

export default NFTContract;
