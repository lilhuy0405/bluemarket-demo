import { ethers } from "ethers";
import toast from "react-hot-toast";
import useWeb3 from "../hooks/useWeb3";
import { useConnection } from "../states/connection";
import { BLUE_NFT_ADDRESS } from "../constants";
import { ABI_CONTRACT_BLUE } from "../constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

function UploadNFT() {
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();

  const contracts = (prop : any) => {
    console.log(prop);
    
  }

const navigate = useNavigate()
  const submitMint = async (e : any) => {
    e.preventDefault();
    try {
      if (typeof window.ethereum !== "undefined") {
        await activate();
        const data = new FormData(e.target);
        const signer = connection.provider?.getSigner();
        const contract = new ethers.Contract(
          BLUE_NFT_ADDRESS,
          ABI_CONTRACT_BLUE,
          signer
        );
        console.log(contracts(contract));
        
        const Mint = await contract.mint(data.get("mint"));
        await Mint.wait();
        toast.success("successful deposit");
        console.log("Mint",Mint);
        navigate("/userNFT")
        
      }
    } catch {
      toast.error("MetaMask : User denied transaction signature.");
    }
  };
  
  
  return (
    <>
    <header className="bg">
        <div className="row mx-12 flex justify-between">
          <div className="col flex py-2">
            <h1 className="text-white text-3xl font-mono font-black">
              NFT nestorm
            </h1>
            <img className="w-12 h-8 px-2" src="../img/ETH1.png" alt="ETH" />
          </div>
          <div className="col py-2 flex ">
            <div className="flex px-4">
              <Link to="/" className="px-2 py-2 text-xl text-white">Home</Link>
              <Link to="/userNFT" className="px-2 py-2 text-xl text-white">UserNFT</Link>
              <Link to="/market" className="px-2 py-2 text-xl text-white">Shop</Link>
              <Link to="/uploadNFT" className="px-2 py-2 text-xl text-white">UploadNFT</Link>
            </div>
            <button
              onClick={isActive ? deActivate : activate}
              className="text-white text-xl w-20 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {isActive ? (
                connection.address
              ) : (
                <BsPersonCircle className="text-4xl" />
              )}
            </button>
          </div>
        </div>
      </header>
      <section className="py-6">
      <h1 className="text-center text-4xl ">UploadNFT</h1>
      <form onSubmit={submitMint}>
        <div className="mb-3">
          {/* <label className="form-label"></label> */}
          <input
            placeholder="mint"
            name="mint"
            type="text"
            className="form-control w-3/6 mx-2 "
          />
        </div>

        <div className="text-xl form-label">
          <button>submit</button>
        </div>
      </form>
      </section>
    </>
  );
}

export default UploadNFT;
