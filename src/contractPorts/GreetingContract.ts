import {BaseContract} from "./BaseContract";
import {ethers} from "ethers";
import GREETING_ABI from "./abis/GreetingContractABI.json";
import {GREETING_SMART_CONTRACT_ADDRESS} from "../constants";
export class GreetingContract extends BaseContract{
  constructor(provider: ethers.providers.Web3Provider, account="") {
    super(provider, GREETING_SMART_CONTRACT_ADDRESS, GREETING_ABI, account);
  }

  async greet(): Promise<string> {
    return await this.getContract().greet();
  }
  async setGreeting(greeting: string): Promise<ethers.ContractTransaction> {
    if(!this.isWritable()) {
      throw Error("Contract is not writable");
    }
    return await this.getContract().setGreeting(greeting);
  }
}

