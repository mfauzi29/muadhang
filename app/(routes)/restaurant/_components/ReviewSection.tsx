'use client'
import React, { useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Rating as ReactRating } from '@smastrom/react-rating'
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import GlobalApi from '@/app/_utils/GlobalApi';
import { toast } from 'sonner';
import ReviewList from './ReviewList';

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

interface ReviewSectionProps {
    restaurant: RestaurantDetails | null;
}

interface Review {
    email: string;
    id: string;
    profileImage: string;
    publishedAt: string; // Assuming publishedAt is a string representing the date and time
    userName: string;
    star: number;
}

interface GetRestaurantReviewsResponse {
    reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ restaurant }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const {user}=useUser();
    const [reviewList, setReviewList] = useState<Review[]>([]);

    useEffect(() => {   
        restaurant&&getReviewList();
    }, [restaurant])

    const handleSubmit=()=>{
        const data={
            email: user?.primaryEmailAddress?.emailAddress,
            profileImage: user?.imageUrl,
            userName: user?.fullName,
            star:rating,
            reviewText:reviewText,
            restaurantSlug:restaurant?.slug,
        }

        GlobalApi.AddNewReview(data).then((resp)=>{
            console.log(resp);
            resp&&toast('Review added successfully');
        });
        
    }

    const getReviewList=()=>{
        GlobalApi.getRestaurantReviews(restaurant?.slug).then((resp:any) =>{
            console.log(resp);
            setReviewList(resp?.reviews);
        });
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-10'>
            <div className='flex flex-col gap-2 p-3 border rounded-lg shadow-lg'>
                <h2 className='font-bold'>Add your review</h2>
                <ReactRating style={{ maxWidth: 100 }} value={rating} onChange={setRating} />
                <Textarea onChange={(e)=>setReviewText(e.target.value)} />
                <Button 
                disabled={rating==0 || !reviewText}
                    onClick={()=>handleSubmit()}
                >Submit</Button>
            </div>
            <div className='col-span-2'>
                <ReviewList reviewList={reviewList} />
            </div>
        </div>
    )
}

export default ReviewSection