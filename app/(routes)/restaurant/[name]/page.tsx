'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Intro from '../_components/Intro';
import RestoTabs from '../_components/RestoTabs';

// Definisikan interface untuk rincian restoran
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
    }[];// Add the missing 'review' property
}

interface RestaurantResponse {
    restaurant: RestaurantDetails;
}


// Komponen untuk halaman rincian restoran
const RestaurantPageDetails: React.FC = () => {
    const param = usePathname();
    const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);

    useEffect(() => {
        const slug = param.split('/').pop() || '';
        getRestaurantDetails(slug);
    }, [param]);

    const getRestaurantDetails = (slug: string) => {
        GlobalApi.GetBusinessDetails(slug).then((resp) => {
            const restaurantResponse = resp as RestaurantResponse;
            console.log(restaurantResponse.restaurant);
            setRestaurant(restaurantResponse.restaurant);
        });
    };

    return (
        <div>
            <Intro restaurant={restaurant}/>
            <RestoTabs restaurant={restaurant}/>
        </div>
    );
}

export default RestaurantPageDetails;
