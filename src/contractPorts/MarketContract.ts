import {BaseContract} from "./BaseContract";
import MARKET_API from "./abis/MarketABI.json";
import {MARKET_CONTRACT_ADDRESS} from "../constants";
import {BigNumber, ethers} from "ethers";

class MarketContract extends BaseContract {
  constructor(provider: ethers.providers.Web3Provider, account = "") {
    super(provider, MARKET_CONTRACT_ADDRESS, MARKET_API, account);
  }

  async listItem(nftAddress: string, tokenId: number, price: BigNumber): Promise<ethers.ContractTransaction> {
    if (!this.isWritable()) {
      throw Error("Contract is not writable");
    }
    return await this.getContract().makeItem(nftAddress, tokenId, price);
  }

  async getMarketItemAt(index: number): Promise<any> {
    return await this.getContract().marketPlaceItems(index);
  }

  async getFee(): Promise<BigNumber> {
    return await this.getContract().feePercent();
  }

  async getTotalItems(): Promise<BigNumber> {
    return await this.getContract().itemCount();
  }

  async purchaseItem(itemId: number, price: BigNumber) {
    if (!this.isWritable()) {
      throw Error("Contract is not writable");
    }
    return await this.getContract().purchaseItem(itemId, {value: price});
  }
}

export default MarketContract;
