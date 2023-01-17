import React from 'react';
import PostWidget from "@/components/PostWidget";
import Categories from "@/components/Categories";
import PostDetail from "@/components/PostDetail";
import Author from "@/components/Author";
import CommentsForm from "@/components/CommentsForm";
import Comment from "@/components/Comment";
import {getPostDetails, getPosts} from "@/services";
import {GetStaticPaths} from "next";

export interface Post {
    author: {
        bio:string,
        id:string,
        name:string,
        photo:{
            url:string
        }
    },
    categories:{
        name:string,
        slug:string
    }[],
    content:{
        raw:{
            children:{
                type:string,
                children:{
                    text:string,
                    bold:boolean
                }[]
            }[]
        }
    },
    createdAt:string,
    excerpt:string,
    slug:string,
    title:string,
    featuredImage:{
        url:string
    }
}

const PostDetails = ({post}: { post:Post } ) => {
    return (
        <div className='container mx-auto px-10 pb-8 '>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='col-span-1 lg:col-span-8'>
                    <PostDetail post={post}/>
                    <Author author={post.author}/>
                    <CommentsForm slug={post.slug}/>
                    <Comment slug={post.slug}/>
                </div>
                <div className='col-span-1 lg:col-span-4'>
                    <div className='relative lg:sticky'>
                        <PostWidget  slug={post.slug} categories={post.categories.map(category=>category.slug)}/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getStaticProps({params}: { params: { slug:string } }) {
    const data = await getPostDetails(params.slug);
    return {
        props:{post: data}
    }
}

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//     return {
//         paths: [],
//         fallback: 'blocking'
//     }
// }

export async function getStaticPaths() {
    const posts = await getPosts();
    return{
        paths:posts.map(({node:{slug}}:{node:{slug:string}})=>({params:{slug}})),
        fallback:'blocking',
    }
}

export default PostDetails;