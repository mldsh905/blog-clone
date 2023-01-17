import React from 'react';
import Image from "next/image";

interface Author {
    bio: string,
    id: string,
    name: string,
    photo: {
        url: string
    }
}

const Author = ({author}: { author: Author }) => {
    const src = author.photo.url;

    return (
        <div className='grid text-center justify-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
            <div className='grid relative'>
                <div className='absolute -top-28 right-[7px]'>
                    <Image unoptimized width={100} height={100} loader={() => src} src={src} alt={author.name}
                           className='align-middle rounded-full w-[100px] h-[100px]'/>
                </div>
            </div>
            <h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
            <p className='text-white text-lg'>{author.bio}</p>
        </div>
    );
};

export default Author;