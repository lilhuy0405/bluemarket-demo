import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";


export const SMARTCHAIN_TESTNET_CHAIN_ID = '0x61';
export const SMARTCHAIN_TESTNET_CHAIN_ID_DECIMAL = 97;
export const SMARTCHAIN_TESTNET_URL = "https://data-seed-prebsc-1-s1.binance.org:8545/"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: import.meta.env.VITE_INFURA_ID, // required
      rpc: {
        [SMARTCHAIN_TESTNET_CHAIN_ID_DECIMAL]: SMARTCHAIN_TESTNET_URL,
      },
      chainId: SMARTCHAIN_TESTNET_CHAIN_ID_DECIMAL,
    },
    display: {
      name: 'WalletConnect',
    }
  },
  injected: {
    package: null,
    name: 'Injected',
  }
};
export const web3Modal = new Web3Modal({
  providerOptions, // required
  cacheProvider: true,
  disableInjectedProvider: false,
  theme: 'dark'

});
export const GREETING_SMART_CONTRACT_ADDRESS = "0xd24FcAedcc75dF6d9AE8581B9836e9781AE89fE8"
export const MARKET_CONTRACT_ADDRESS = "0xB0dc670F53E220d6a6CC0f84A02c46Bac10B3134"
export const BLUE_NFT_ADDRESS = "0xC1C4a066e91b7eeCfFab7160522924D9C4d254FC"
