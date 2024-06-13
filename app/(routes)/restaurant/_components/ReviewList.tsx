import { profile } from 'console'
import Image from 'next/image'
import React, { useState } from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'; // Import the 'moment' library

interface ReviewListProps {
    reviewList: any[]; // Replace 'any' with the appropriate type for reviewList
}

function ReviewList({ reviewList }: ReviewListProps) {
    const [rating, setRating] = useState(0);

    return (
        <div>
            {reviewList ? (
                reviewList.map((review, index) => (
                    <div key={index} className='flex gap-5 items-center border rounded-lg p-5'>
                        <Image
                            src={review.profileImage}
                            alt={'profileImage'}
                            width={50}
                            height={50}
                        />
                        <div>
                            <h2>{review.reviewText}</h2>
                            <ReactRating style={{ maxWidth: 100 }} value={review.star} isDisabled={true} />
                            <h2 className='text-sm '>
                                <span className='font-bold'>{review.userName}</span> at {moment(review.publishedAt).format('DD-MM-yyyy')}
                            </h2>
                        </div>
                    </div>
                ))
            ) : (
                [1, 2, 3, 4].map((item, index) => (
                    <div key={index} className='h-[100px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                ))
            )}
        </div>
    )
}

export default ReviewList