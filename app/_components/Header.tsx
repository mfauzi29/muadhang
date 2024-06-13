'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Search, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import GlobalApi from '../_utils/GlobalApi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart'
import Link from 'next/link'


function Header() {
  const {user, isSignedIn}=useUser();
  const {updateCart, setUpdateCart} = useContext(CartUpdateContext);
  const [cart, setCart]=useState([]);

  useEffect(() => {
    console.log("Haiya");
    user&&GetUserCart();
  }, [updateCart&&user]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress || "").then((resp: any) => {
      console.log(resp);
      setCart(resp?.userCarts);
    });
  };

return (
  <div className='flex justify-between items-center p-6 md:px-20 shadow-md'>
    <Link href="/">
        <Image src='/logo.png' alt='logo'
              width={200}
              height={200} />
    </Link>
    <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
      <input type='text' className='bg-transparent w-full outline-none' placeholder='Search...' />
      <Search />
    </div>

    {isSignedIn ? 
      <div className='flex gap-3 items-center'>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              <ShoppingCart />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Cart cart={cart} />
          </PopoverContent>
        </Popover>

        <label className='p-1 px-2 rounded-full bg-slate-200'>
          {cart?.length}
        </label>

        <UserButton />
      </div>
    

      :<div className='flex gap-5'>
        <SignInButton mode='modal'>
          <Button variant="outline">Login</Button>
        </SignInButton>
        <SignUpButton mode='modal'>
          <Button>Sign Up</Button>
        </SignUpButton>
      </div>}
    </div>
  )
}

export default Header