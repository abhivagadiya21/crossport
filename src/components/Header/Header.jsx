import React from 'react'
import crossport from '../../assets/cp.png'

const Header = () => {
  return (
    <>
      <div className='header-main-container'>
        <img  className='crossport-logo' src={crossport} />

        <div className='connect-container'>
            <button className='connect-button'>Connect Wallet</button>
        </div>
      </div>
    </>
  )
}

export default Header
