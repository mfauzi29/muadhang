'use client'
import React, { useEffect } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { useSearchParams } from "next/navigation";
import BusinessItem from "./BusinessItem";
import BusinessItemSkelton from "./BusinessItemSkelton";

interface BusinessData {
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
    }[]; // Add the 'review' property as an array
}

interface BusinessResponse {
    restaurants: BusinessData[];
}

// Update the type of 'business' prop in BusinessItemProps
interface BusinessItemProps {
    business: BusinessData;
}


interface BusinessResponse {
    restaurants: BusinessData[];
}

function BusinessList() {
    const params = useSearchParams();
    const [category, setCategory] = React.useState<string>('all');
    const [businessList, setBusinessList] = React.useState<BusinessData[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect(() => {
        const categoryParam = params.get('category') || 'all';
        setCategory(categoryParam);
        getBusinessList(categoryParam);
    }, [params]);

    const getBusinessList = (category_: string) => {
        setLoading(true);
        GlobalApi.GetBusiness(category_).then((resp) => {
            const BusinessResponse = resp as BusinessResponse;
            setBusinessList(BusinessResponse?.restaurants);
            setLoading(false);
        });
    };

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl'>Popular {category} Restaurants</h2>
            <h2 className='font-bold text-primary'>{businessList?.length}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-3'>
                {!loading? businessList.map((restaurants, index) => (
                    // Add your code here
                    <BusinessItem key={index} 
                    business={restaurants}
                    />
                )):
                [1,2,3,4,5,6].map((item, index) => (
                    <BusinessItemSkelton/>
                ))    
                }
            </div>
        </div>
    );
}

export default BusinessList;