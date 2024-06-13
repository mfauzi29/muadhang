'use client'
import React, { use, useEffect, useRef } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";
import { list } from "postcss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CategoryIcon {
    url: string;
    }
    
interface Category {
    id: string;
    name: string;
    slug: string;
    icon: CategoryIcon;
    }
    
interface CategoryResponse {
    categories: Category[];
    }

function CategoryList() {

    const listRef=useRef<HTMLDivElement>(null);
    const [categoryList, setCategoryList] = React.useState<Category[]>([]);
    const params=useSearchParams();
    const [selectedCategory, setSelectedCategory]=React.useState('all');
    useEffect(() => {
        setSelectedCategory(params.get('category') || '');
    }, [params]);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = () => {
        GlobalApi.GetCategory().then((resp) => {
            const categoryResponse = resp as CategoryResponse;
            console.log(categoryResponse.categories);
            setCategoryList(categoryResponse.categories);
        })
    };

    const ScrollRightHandler=() => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            })
        }
    }
    

    return (
        <div className='mt-10 relative'>
            <div className='flex gap-4 overflow-auto' ref={listRef}>
                {categoryList&&categoryList.map((category,index) =>(
                    <Link href={'?category='+category.slug} key={index}
                    className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-primary hover:bg-purple-100 cursor-pointer group
                    ${selectedCategory===category.slug?'border-primary bg-purple-100':''}
                    `}>
                        <Image
                        src={category.icon?.url}
                        alt={category.name}
                        width={40}
                        height={40}
                        className='group-hover:scale-125 transition-all duration-150'
                        />
                        <h2 className='text-sm font-bold'>{category.name}</h2>
                    </Link>
                ))}
            </div>
            <ArrowRightCircle className='absolute right-0 top-9 text-primary cursor-pointer'
            onClick={() => ScrollRightHandler()}
            />
        </div>
    );
}

export default CategoryList;
