import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import "../App.css";
import useWeb3 from "../hooks/useWeb3";
import { useConnection } from "../states/connection";
import { Link } from "react-router-dom";
function Home() {
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();
  console.log("connection",connection);
  
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
       <section className="bg-black">
        <div className="ml-20 ">
          <div className="pb-20">
            <div className="text-7xl w-3/4 py-6">
              <p className="font-sans">
                Discover, collect, and sell extraordinary NFTs
              </p>
            </div>
            <p className="text-xl text-gray">
              Explore on the world's best & largest NFT marketplace
            </p>
            <div className="py-8">
              
              
            </div>
          </div>

          <div></div>
        </div>
      </section> 
     
      <footer></footer>
    </>
  );
}

export default Home;
