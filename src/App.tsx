import { toast, Toaster } from "react-hot-toast";
import updater from "./updater";
import useWeb3 from "./hooks/useWeb3";
import { useConnection } from "./states/connection";
import { QueryClient, QueryClientProvider } from "react-query";
import UserNFT from "./components/UserNFT";
import { Divider } from "antd";
import Market from "./components/Market";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UploadNFT from "./components/UploadNFT";

const queryClient = new QueryClient();

function App() {
  //example to use useWeb3() hook
  const { isActive, activate, deActivate } = useWeb3();
  const { connection } = useConnection();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Market" element={<Market />} />
          <Route path="/UserNFT" element={<UserNFT />} />
          <Route path="/UploadNFT" element={<UploadNFT />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

    // <QueryClientProvider client={queryClient}>
    //   <button onClick={isActive ? deActivate : activate}>
    //     {isActive ? connection.address : "Connect"}
    //   </button>
    //   {isActive && (
    //     <UserNFT/>
    //   )}
    //   <Divider/>
    //   <Market/>
    //   <Toaster/>
    // </QueryClientProvider>
  );
}

export default updater(App);
