'use client'

import { CartUpdateContext } from '@/app/_context/CartUpdateContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { error } from 'console';
import { Divide, Ghost, SquarePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
//Adjust the import path accordingly

interface RestaurantDetails {
    aboutUs: string;
    address: string;
    banner: {
        url: string;
    };
    categories: {
        name: string;
    }[];
    id: string;
    menu: {
        id: string;
        category: string;
        menuItem: {
            id: string;
            name: string;
            description: string;
            price: number;
            productImage: {
                url: string;
            };
        }[];
    }[];
    restoType: string;
    slug: string;
    workingHours: string;
    name: string;
}

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    productImage: {
        url: string;
    };
    category: string;
}

interface MenuSectionProps {
    restaurant: RestaurantDetails | null;
}


const MenuSection: React.FC<MenuSectionProps> = ({ restaurant }) => {

    const [menuItemList, setMenuItemList] = React.useState<MenuItem[]>([]); //
    const {user}=useUser();
    const {updateCart, setUpdateCart} = useContext(CartUpdateContext);
    useEffect(() => {
        restaurant&&FilterMenu(restaurant?.menu[0]?.category);
    }, [restaurant]);

    const FilterMenu = (category: string) => {
        const result = restaurant?.menu?.filter((item) => item.category == category) ?? [];
        setMenuItemList(result[0]?.menuItem.map((item) => ({ ...item, category })));
    };

    const AddtoCartHandler=(item:MenuItem)=>{
        toast('Adding to cart')
        const data={
            email:user?.primaryEmailAddress?.emailAddress,
            name:item?.name,
            description:item?.description,
            productImage:item?.productImage?.url,
            price:item?.price,
            restaurantSlug:restaurant?.slug,
        }
        GlobalApi.AddtoCart(data).then(resp=>{
            console.log(resp);
            setUpdateCart(!updateCart);
            toast.success('Item added to cart')
        },(error)=>{toast('Failed to add to cart')}
        )
    }

    return (
        <div>
            <div className='grid grid-cols-4 mt-2'>
                <div className='hidden md:flex flex-col mr-10 gap-3'>
                    {restaurant?.menu?.map((item, index) => (
                        <Button variant="ghost"
                        key={index} onClick={() => FilterMenu(item.category)} 
                        className='flex justify-start'>
                            {item.category}
                        </Button>    
                    ))}
                </div>
                <div className='col-span-3'>
                    <h2 className='font-extra-bold text-lg'>{menuItemList[0]?.category}</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {menuItemList?.map((item, index) => (
                            <div className='p-2 flex gap-4 border rounded-xl hover:border-primary cursor-pointer'>
                                <Image
                                src={item?.productImage?.url}
                                alt={item.name}
                                width={150}
                                height={150}
                                className='object-cover w-[150px] h-[150px] rounded-xl'
                                />
                                <div className='flex flex-col gap-1'>
                                    <h2 className='font-bold'>{item.name}</h2>
                                    <h2>{item.price}</h2>
                                    <h2 className='text-sm text-gray-400 line-clamp-2'>{item.description}</h2>
                                    <SquarePlus className='cursor-pointer' onClick={()=>AddtoCartHandler(item)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuSection
