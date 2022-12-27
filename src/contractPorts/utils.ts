import {Contract} from "ethers";

export function getSigner(library: any, account: string) {
  return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: any, account: string) {
  return account ? getSigner(library, account) : library
}

/*
* Get instance of smart contract <br/>
* Params: address: string, smart contract address, ABI: json file contract abi <br/>
* Pass library (provider) for readOnlyContract (call read data method only) <br/>
* Pass both library and account for writeContract (can call transaction to write data to blockchain) <br/>
* Return an instance of Contract ehtherjs
* */
export function getContract(address: string, ABI: any, library: any, account: string = '') {
  if (address === import.meta.env.VITE_ADDRESS_ZERO) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return new Contract(address, ABI, getProviderOrSigner(library, account))
}