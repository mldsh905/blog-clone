import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Link from 'next/link';
import {getSimilarPosts, getRecentPosts} from "@/services";

interface IProps {
    createdAt: string;
    featuredImage: {
        url: string
    };
    slug: string;
    title: string
}

const PostWidget = ({categories, slug}: {categories:string[], slug:string}) => {
    const [relatedPosts, setRelatedPosts] = useState<IProps[]>([]);
    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then(result => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then(result => setRelatedPosts(result))
        }
    }, [slug]);


    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-4 font-semibold border-b pb-4 '>
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            <div className='grid gap-4'>
                {relatedPosts.map(post => (
                    <div key={post.title} className='flex items-center w-full '>
                        <div className='w-10 h-10 flex-none'>
                            <img src={post.featuredImage.url} alt={post.title} width='60px' height='60px'
                                 className='align-middle max-w-full max-h-full object-cover rounded-full'/>
                        </div>
                        <div className='flex-grow ml-4'>
                            <p className='text-gray-500 font-medium'>
                                {moment(post.createdAt).format('MMM DD,YYYY')}
                            </p>
                            <Link href={`/post/${post.slug}`} className='text-md'>
                                {post.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostWidget;