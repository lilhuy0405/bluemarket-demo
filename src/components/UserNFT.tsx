import { useConnection } from "../states/connection";
import { useQuery } from "react-query";
import marketAPI from "../services/marketAPI";
import { Button, Card, Col, Form, Image, InputNumber, Modal, Row } from "antd";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useMarketContract from "../hooks/useMarketContract";
import { ethers } from "ethers";
import { BLUE_NFT_ADDRESS, MARKET_CONTRACT_ADDRESS } from "../constants";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import useWeb3 from "../hooks/useWeb3";

const UserNFT = () => {
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();

  const [openModal, setOpenModal] = useState(false);
  const [toSellTokenId, setToSellTokenId] = useState(0);
  const { listItem } = useMarketContract();
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["marketAPI.getNFTofAnAddress()", connection.address],
    ({ queryKey }) => marketAPI.getNFTofAnAddress(queryKey[1])
  );
  const handleFinish = async (values: any) => {
    const sellPromise = new Promise(async (resolve, reject) => {
      try {
        const { amount } = values;
        const amountInWei = ethers.utils.parseEther(amount.toString());
        const resp = await listItem(
          BLUE_NFT_ADDRESS,
          toSellTokenId,
          amountInWei
        );
        //sleep 3s to wait for the transaction to be mined and updated in the be
        await new Promise((resolve) => setTimeout(resolve, 5000));
        await refetch();
        resolve(resp);
      } catch (err) {
        reject(err);
      } finally {
        setOpenModal(false);
      }
    });
    await toast.promise(sellPromise, {
      loading: "Selling...",
      success: "Successfully sold",
      error: "Failed to sell",
    });
  };
  console.log("data", data);

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
              <Link to="/" className="px-2 py-2 text-xl text-white">
                Home
              </Link>
              <Link to="/userNFT" className="px-2 py-2 text-xl text-white">
                UserNFT
              </Link>
              <Link to="/market" className="px-2 py-2 text-xl text-white">
                Shop
              </Link>
              <Link to="/uploadNFT" className="px-2 py-2 text-xl text-white">
                UploadNFT
              </Link>
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
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h4 className="text-4xl py-10">My NFTS</h4>
        </div>
        <Row gutter={24}>
          {isLoading
            ? "Loading..."
            : isError
            ? "Error"
            : data.map((item: any) => (
                <Col span={6} key={item.tokenId}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<Image alt="nft" src={item.tokenURI} height={300} />}
                  >
                    <Card.Meta
                      title={`NFT ID #${item.tokenId}`}
                      description="BLUE MARKET NFT"
                    />
                    <Button
                      style={{ marginTop: 20 }}
                      onClick={() => {
                        setToSellTokenId(item.tokenId);
                        setOpenModal(true);
                      }}
                    >
                      {" "}
                      SELL NFT{" "}
                    </Button>
                  </Card>
                </Col>
              ))}
        </Row>
        {/*SELL MODAL*/}
        <Modal
          title="List to market"
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onOk={() => setOpenModal(false)}
          footer={[
            <Button onClick={() => setOpenModal(false)} key="cancel">
              Cancel
            </Button>,
          ]}
        >
          <Form
            name="listNFT"
            onFinish={handleFinish}
            onFinishFailed={() => toast.error("Please check your input")}
          >
            <Form.Item
              name="amount"
              rules={[
                { required: true, message: "Please enter price to sell" },
              ]}
              label="Price"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">List</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default UserNFT;
