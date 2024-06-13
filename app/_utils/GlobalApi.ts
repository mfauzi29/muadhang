import { request, gql } from "graphql-request";

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || '';

/**
 * Make Get Category API
 * @returns 
 */
const GetCategory = async () => {
    const query = gql`
        query Categories {
            categories {
                id
                name
                slug
                icon {
                    url
                }
            }
        }
    `;
    const result = await request(MASTER_URL, query);
    return result;
}

const GetBusiness=async(category: string)=>{
    const query=gql`
    query GetBusiness {
        restaurants(where: {categories_some: {slug: "`+category+`"}}) {
            aboutUs
            address
            banner {
            url
            }
            categories {
            name
            }
            id
            name
            restoType
            slug
            workingHours
            review{
                star
            }
        }
    }
    `;
    const result=await request(MASTER_URL,query);
    return result;
}

const GetBusinessDetails=async(businessSlug: string)=>{
    const query=gql`
    query RestaurantDetail {
        restaurant(where: {slug: "`+businessSlug+`"}) {
            aboutUs
            address
            banner {
            url
            }
            categories {
            name
            }
            id
            menu {
            ... on Menu {
                id
                category
                menuItem {
                ... on MenuItem {
                    id
                    name
                    description
                    price
                    productImage {
                    url
                    }
                }
                }
            }
            }
            restoType
            slug
            workingHours
            name
            review{
                star
                }
            }
        }
    `;

    const result=await request(MASTER_URL,query);
    return result;
}

const AddtoCart = async (data: any) => {
    const query = gql`
        mutation AddtoCart {
            createUserCart(data: {
                email: "`+data?.email+`", 
                price: `+(data.price)+`, 
                productDescription: "`+data.description+`", 
                productImage: "`+data.productImage+`", 
                productName: "`+data.name+`",
                restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}
            }) {
                id
            }
            publishManyUserCarts(to: PUBLISHED) {
                count
            }
        }
    `;
    const result = await request(MASTER_URL, query);
    return result;
};



const GetUserCart=async(userEmail: string)=>{
    const query=gql`
    query GetUserCart {
        userCarts(where: {email: "`+userEmail+`"}) {
            id
            price
            productDescription
            productImage
            productName
            restaurant {
                banner {
                    url
                }
                slug
                name
                }
            }
        }
    `;
    
    const result=await request(MASTER_URL,query);
    return result;
}

const DisconnectRestoFromUserCartItem=async(id: string)=>{
    const query=gql`
    mutation DisconnectRestaurantFromCartItem {
        updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"})
        {
            id
        }
        publishManyUserCarts(to: PUBLISHED) {
            count
        }
    }
    `;
    const result=await request(MASTER_URL,query);
    return result;
}

const DeleteItemFromCart=async(id:string)=>{
    const query=gql`
    mutation DeleteCartItem {
        deleteUserCart(where: {id: "`+id+`"}) {
            id
        }
    }
    `;
    const result=await request(MASTER_URL,query);
    return result;
}

const AddNewReview=async(data:any)=>{
    const query = gql`
    mutation AddNewReview {
    createReview(
        data: {email: "`+data.email+`", 
        profileImage: "`+data.profileImage+`", 
        restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}, 
        reviewText: "`+data.reviewText+`", 
        star: `+data.star+`, 
        userName: "`+data.userName+`"}
    ) {
        id
    }
    publishManyReviews(to: PUBLISHED) {
        count
        }
    }
    `;

    const result=await request(MASTER_URL,query);
    return result;
}

const getRestaurantReviews=async(slug:any)=>{
    const query = gql`
    query RestaurantReviews {
        reviews(where: {restaurant: {slug: "`+slug+`"}}, orderBy: publishedAt_DESC) {
            email
            id
            profileImage
            publishedAt
            userName
            star
            reviewText
        }
    }
    `;

    const result=await request(MASTER_URL,query);
    return result;
}

export default {
    GetCategory,
    GetBusiness,
    GetBusinessDetails,
    AddtoCart,
    GetUserCart,
    DisconnectRestoFromUserCartItem,
    DeleteItemFromCart,
    AddNewReview,
    getRestaurantReviews
};
