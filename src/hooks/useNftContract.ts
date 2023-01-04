import {useConnection} from "../states/connection";
import NFTContract from "../contractPorts/NFTContract";

const useNftContract = () => {
  const {connection} = useConnection();
  const provider = connection.provider;

  const mint = async (url: string) => {
    if (!provider) {
      throw new Error('Meta mask not installed or not connected');
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const nftContract = new NFTContract(provider, address);
    const txnResp = await nftContract.mint(url);
    const txnReceipt = await txnResp.wait();
  }
  return {
    mint
  }
}

export default useNftContract;
