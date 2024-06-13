// BusinessItem.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Business {
    aboutUs: string;
    address: string;
    banner: {
        url: string;
    };
    categories: {
        name: string;
    }[];
    id: string;
    name: string;
    restoType: string;
    slug: string;
    workingHours: string;
    review:{
        star:number;
    }[];
}

interface BusinessItemProps {
    business: Business;
}

const BusinessItem: React.FC<BusinessItemProps> = ({ business }) => {
    const CalculateRating=()=>{
        let total=0;
        let count=0;
        business?.review.forEach(item=>{
            total=total+item.star;
            count++
        })

        const result=total/count;
        return result?result.toFixed(2):5;
    }

    return (
        <Link href={'/restaurant/'+business.slug} className='p-3 hover:border rounded-xl hover:border-primary transition-all duration-200 ease-in-out hover:bg-purple-50'>
            <Image 
            src={business.banner?.url} 
            alt={business.name} 
            height={300} 
            width={1000}
            className='h-[130px] rounded-xl object-cover'
            />
            <div className='mt-2'>
                <h2 className='font-bold text-lg'>{business.name}</h2>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <Image src="/star.png" alt='star' height={14} width={14}/>
                        <label className='text-gray-400'>{CalculateRating()}</label>
                        <h2 className='text-gray-400 text-sm'>{business?.restoType[0]}</h2>
                    </div>
                    <h2 className='text-sm text-primary'>
                        {business.categories[0].name}
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export default BusinessItem;