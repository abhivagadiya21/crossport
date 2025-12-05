import React from 'react'
import crossport from '../../assets/cp.png'
import wallet from '../../assets/wallet.svg'

const Header = () => {
  return (
    <>
      <div className='header-main-container'>
        <img  className='crossport-logo' src={crossport} />

        <div className='connect-container'>
            <div className='connect-wallet'>
            <button className='connect-button'> <img className='wallet-icon' src={wallet} alt="" />
            Connect Wallet</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Header
