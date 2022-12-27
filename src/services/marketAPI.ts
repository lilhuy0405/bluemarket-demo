import axiosClient from "./axiosClient";

const marketAPI = {
  getNFTofAnAddress: async (address: string): Promise<any[]> => {
    if(!address) {
      throw Error("Address is required");
    }
    return await axiosClient.get(`/nfts/${address}`);
  }

}

export default marketAPI
