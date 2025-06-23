import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={"/"} className=''>
        <img src={"/sanalsepet-logo.png"} className='h-10'>
        </img>
    </Link>
  )
}

export default Logo