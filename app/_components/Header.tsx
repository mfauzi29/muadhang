import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <div>
        <Image src='/logo.png' alt='logo'
        width={200}
        height={200}
        />
    </div>
  )
}

export default Header