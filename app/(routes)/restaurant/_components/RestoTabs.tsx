import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';

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


interface RestoTabsProps {
    restaurant: RestaurantDetails | null;
}

const RestoTabs: React.FC<RestoTabsProps> = ({ restaurant }) => {
    return (
        <Tabs defaultValue="category" className="w-full">
            <TabsList>
                <TabsTrigger value="category">Category</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="category">
                <MenuSection restaurant={restaurant} />
            </TabsContent>
            <TabsContent value="about"></TabsContent>
            <TabsContent value="review">Write your review here
                <ReviewSection restaurant={restaurant}/>
            </TabsContent>
        </Tabs>
    );
}

export default RestoTabs;
