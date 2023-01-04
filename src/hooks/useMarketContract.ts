import {useConnection} from "../states/connection";
import {GreetingContract} from "../contractPorts/GreetingContract";
import {BigNumber, ethers} from "ethers";
import MarketContract from "../contractPorts/MarketContract";
import marketAPI from "../services/marketAPI";
import {BLUE_NFT_ADDRESS, MARKET_CONTRACT_ADDRESS} from "../constants";
import NFTContract from "../contractPorts/NFTContract";

const useMarketContract = () => {
  const {connection} = useConnection();
  const provider = connection.provider;

  const listItem = async (nftAddress: string, nftId: number, price: BigNumber) => {
    if (!provider) {
      throw new Error('Meta mask not installed or not connected');
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const marketContract = new MarketContract(provider, address)
    const nftContract = new NFTContract(provider, address);
    //check approval
    const approvedAddress = await nftContract.getApproved(nftId);
    if (approvedAddress.toLowerCase() !== MARKET_CONTRACT_ADDRESS.toLowerCase()) {
      const approveReceipt = await nftContract.approve(MARKET_CONTRACT_ADDRESS, nftId);
      await approveReceipt.wait();
    }
    const txnResp = await marketContract.listItem(nftAddress, nftId, price);
    const txnReceipt = await txnResp.wait();
  }

  const getAllSellingItems = async () => {
    if (!provider) {
      throw new Error('Meta mask not installed or not connected');
    }
    const marketContract = new MarketContract(provider)
    const totalItems = (await marketContract.getTotalItems()).toNumber();
    const feePercent = (await marketContract.getFee()).toNumber();
    const listPromise = Array.from(Array(totalItems).keys()).map(async (index) => {
      try {
        const item = await marketContract.getMarketItemAt(index + 1);
        const itemId = item[0].toNumber();
        const nftAddress = item[1];
        const tokenId = item[2].toNumber();
        const priceInWei = item[3];
        const mintPrice = parseFloat(ethers.utils.formatEther(priceInWei));
        const price = mintPrice * (feePercent + 100) / 100;
        const seller = item[4];
        const isSold = item[5];
        return {
          itemId,
          nftAddress,
          tokenId,
          price,
          seller,
          isSold
        }
      } catch (err) {
        console.log(err)
        return null;
      }
    });
    const items = await Promise.all(listPromise);
    const res: any[] = [];

    const sellingItemTrackingInApi = await marketAPI.getNFTofAnAddress(MARKET_CONTRACT_ADDRESS);

    items.forEach((item: any) => {
      if (item.isSold) {
        return
      }
      if (item.nftAddress.toLowerCase() !== BLUE_NFT_ADDRESS.toLowerCase()) {
        return;
      }
      const isSellingInApi = sellingItemTrackingInApi.find((itemInApi: any) => itemInApi.tokenId === item.tokenId);
      if (!isSellingInApi) {
        return;
      }
      res.push({...item, tokenURI: isSellingInApi.tokenURI})
    })
    return res;
  }

  const buyItem = async (itemId: number) => {
    if (!provider) {
      throw new Error('Meta mask not installed or not connected');
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const marketContract = new MarketContract(provider, address)
    const item = await marketContract.getMarketItemAt(itemId);
    const priceInWei = item[3];
    const feePercent = await marketContract.getFee()
    const price = priceInWei.mul(feePercent.add(100)).div(100);
    //cbeck balance
    const balance = await provider.getBalance(address);
    if (balance.lt(price)) {
      throw new Error('Insufficient balance');
    }
    const txnResp = await marketContract.purchaseItem(itemId, price);
    const txnReceipt = await txnResp.wait();

  }



  return {
    getAllSellingItems,
    listItem,
    buyItem
  }
}

export default useMarketContract;
