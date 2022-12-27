import {useConnection} from "../states/connection";
import {GreetingContract} from "../contractPorts/GreetingContract";

const useGreetingContract = () => {
  const {connection} = useConnection();
  const provider = connection.provider;

  const greet = async () => {
    if (!provider) {
      throw new Error('Meta mask not installed or not connected');
    }
    const readOnlyGreetContract = new GreetingContract(provider)
    return await readOnlyGreetContract.greet();
  }
  const setGreet = async (greeting: string) => {
    if (!provider) {
      throw new Error('Meta mask not installed or not connected');
    }
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const writableGreetContract = new GreetingContract(provider, address)
    const txnResp = await writableGreetContract.setGreeting(greeting);
    const txnReceipt = await txnResp.wait();
  }
  return {
    greet,
    setGreet
  }
}

export default useGreetingContract