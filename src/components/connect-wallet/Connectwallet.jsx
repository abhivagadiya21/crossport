import React, { useEffect } from "react";
import { ethers } from 'ethers';
import { useDisconnect, useAppKit, useAppKitAccount, useAppKitProvider, useAppKitNetworkCore } from "@reown/appkit/react";
import { BrowserProvider, JsonRpcSigner, formatEther, parseEther } from "ethers";

export default function App() {
  const { open} = useAppKit();
  const { disconnect } = useDisconnect();
  const { address,isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const { chainId } = useAppKitNetworkCore();


  useEffect(() => {
    const querryBlockchain = async () => {
      if (walletProvider && chainId) {
        const provider = new BrowserProvider(walletProvider);
        const blockNumber = await provider.getBlockNumber();
        console.log("current block number  :  ", blockNumber);
      }
    };
    querryBlockchain();
  }, [walletProvider, chainId]);
  

  return (
    <></>
  );
}