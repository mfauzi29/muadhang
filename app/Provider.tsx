import React, { ReactNode } from 'react'
import Header from './_components/Header'

function Provider({children}: { children: ReactNode }) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Provider