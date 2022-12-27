import {ethers} from "ethers";
import {getContract} from "./utils";

export class BaseContract {
  private _contract: ethers.Contract
  private readonly _provider: ethers.providers.Web3Provider
  private _contractSigner: string = ""

  constructor(provider: ethers.providers.Web3Provider, contractAddress: string, contractABi: any, account = "") {
    this._provider = provider

    if (!ethers.utils.isAddress(contractAddress)) {
      throw Error(`Invalid 'contractAddress' parameter '${contractAddress}'.`)
    }
    this._contractSigner = account
    this._contract = getContract(contractAddress, contractABi, provider, account)
  }

  public isWritable(): boolean {
    return !!this._contractSigner
  }

  public getContract(): ethers.Contract {
    return this._contract
  }

  public getProvider(): ethers.providers.Web3Provider {
    return this._provider
  }

  public getContractSigner(): string {
    return this._contractSigner
  }

  public getWriteContract(account: string): ethers.Contract {
    // await this._checkChainId();
    if (this.isWritable()) {
      return this._contract
    }
    if (!account || !ethers.utils.isAddress(account) || ethers.utils.getAddress(account) === ethers.constants.AddressZero) {
      throw Error(`Invalid 'account' parameter '${account}'.`)
    }
    this._contractSigner = account
    this._contract = getContract(this._contract.address, this._contract.interface, this._provider, account)
    return this._contract
  }

  // private async _checkChainId() {
  //   let network = await this._provider.getNetwork();
  //   console.log(network);
  // }
}