import {useQuery} from "react-query";
import marketAPI from "../services/marketAPI";
import {MARKET_CONTRACT_ADDRESS} from "../constants";
import useMarketContract from "../hooks/useMarketContract";
import {useConnection} from "../states/connection";
import useWeb3 from "../hooks/useWeb3";
import {useEffect, useState} from "react";
import {Button, Card, Col, Image, Row, Skeleton} from "antd";
import { Link } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

const Market = () => {
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();

  const {getAllSellingItems} = useMarketContract();
  const [sellingItems, setSellingItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  console.log("sellingItems",sellingItems);
  
  const fetchSellingItems = async () => {
    try {
      setLoading(true)
      const res = await getAllSellingItems()
      console.log('res', res)
      setSellingItems(res)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (!isActive) return
    fetchSellingItems().then()
  }, [isActive])
  return (
    <div>
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
      <div style={{textAlign: 'center'}}>
        <h4 className="text-4xl py-10">Market place</h4>
        <Row gutter={24}>
          {
            loading ? <Skeleton/> : sellingItems.map((item: any) => (
              <Col span={6} key={item.tokenId}>
                <Card
                  hoverable
                  style={{width: 240}}
                  cover={<Image alt="nft" src={item.tokenURI} height={300}/>}
                  className="my-3"
                >
                  <Card.Meta title={`NFT ID #${item.tokenId}`} description="BLUE MARKET NFT"/>
                  <div>
                    Price: {item.price.toFixed(4)} BNB
                  </div>
                  <div>
                    <Button>Buy</Button>
                  </div>
                </Card>
              </Col>
            ))
          }
          <Col span={6}>

          </Col>
        </Row>

      </div>
    </div>
  )
}

export default Market
