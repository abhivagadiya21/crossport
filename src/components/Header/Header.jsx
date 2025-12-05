import React from "react";
import crossport from "../../assets/cp.png";
import wallet from "../../assets/wallet.svg";
import { useAppKit, useAppKitAccount, useDisconnect } from "@reown/appkit/react";

const Header = () => {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  return (
    
    <div className="header-main-container">
      <img className="crossport-logo" src={crossport} />
      <div className="connect-container">
        <div className="connect-wallet">
          {isConnected ? (
            <button className="connect-button" onClick={() => disconnect()} >
              <img className="wallet-icon" src={wallet} /> 
              {address.slice(0, 6)}...{address.slice(-4)}
            </button>
          ) : (
            <button onClick={() => open()} className="connect-button">
              <img className="wallet-icon" src={wallet} />
              Connect Wallet
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Header;