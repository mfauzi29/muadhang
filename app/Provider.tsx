'use client'
import React, { createContext, ReactNode, useState } from 'react';
import Header from './_components/Header';
import { Toaster } from '@/components/ui/sonner';
import { CartUpdateContext } from './_context/CartUpdateContext';

// Define the shape of the context data

function Provider({ children }: { children: ReactNode }) {
  const [updateCart, setUpdateCart] = useState<boolean>(false);

  return (
    <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
      <div className='px-10 md:px-20 relative mb-20'>
        <Header />
        <Toaster />
        {children}
      </div>
    </CartUpdateContext.Provider>
  );
}

export default Provider;
