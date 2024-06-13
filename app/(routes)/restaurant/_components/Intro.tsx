import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
    review: {
        star: number;
    }[];
}


interface IntroProps {
    restaurant: RestaurantDetails | null;
}

const Intro: React.FC<IntroProps> = ({ restaurant }) => {
    const [totalReview, setTotalReview]=useState(0);
    const [avgRating, setAvgRating]=useState(0);
    useEffect(()=>{
        restaurant&&CalculateRating();
    },[restaurant])
    const CalculateRating=()=>{
        let total=0;
        let count=0;
        restaurant?.review?.forEach(item=>{
            total=total+item.star;
            count++
        })
        
        setTotalReview(count);
        const result = total / count;
        setAvgRating(parseFloat(result?.toFixed(1) || '4.5'));
    }

    return (
        <div>
            {restaurant?.banner?.url ? (
                <div>
                    <Image 
                        src={restaurant?.banner?.url}
                        width={1000}
                        height={300}
                        alt='banner'
                        className='w-full h-[300px] object-cover rounded-xl'
                    />
                </div>
            ) : (
                <div className='h-[300px] bg-gray-200 rounded-xl'></div>
            )}
            <h2 className='text-3xl font-bold mt-2'>{restaurant?.name}</h2>
            <div className='flex items-center gap-2'>
                <Image src='/star.png' alt='star' height={17} width={17} />
                <label className='text-sm text-gray-400'>{avgRating} ({totalReview})</label>
            </div>
            <h2 className='text-gray-400 mt-2 flex gap-2 items-center'>
                <MapPin></MapPin>
                {restaurant?.address}</h2>
        </div>
    );
}

export default Intro;
