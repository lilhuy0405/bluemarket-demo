import {useQuery} from "react-query";
import marketAPI from "../services/marketAPI";
import {MARKET_CONTRACT_ADDRESS} from "../constants";
import useMarketContract from "../hooks/useMarketContract";
import {useConnection} from "../states/connection";
import useWeb3 from "../hooks/useWeb3";
import {useEffect, useState} from "react";
import {Button, Card, Col, Image, Row, Skeleton} from "antd";

const Market = () => {
  const {getAllSellingItems} = useMarketContract();
  const {isActive} = useWeb3()
  const [sellingItems, setSellingItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
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
      <div style={{textAlign: 'center'}}>
        <h4>Market place</h4>
        <Row gutter={24}>
          {
            loading ? <Skeleton/> : sellingItems.map((item: any) => (
              <Col span={6} key={item.tokenId}>
                <Card
                  hoverable
                  style={{width: 240}}
                  cover={<Image alt="nft" src={item.tokenURI} height={300}/>}
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
