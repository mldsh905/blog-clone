import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import PostCard from "@/components/PostCard";
import PostWidget from "@/components/PostWidget";
import Categories from "@/components/Categories";
import {getPosts} from "@/services";


const inter = Inter({subsets: ['latin']})

export default function Home({posts}:any) {



    // @ts-ignore
    // @ts-ignore
    return (
        <div className='container mx-auto px-10 mb-8 '>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='lg:col-span-8 col-span-1'>
                    {posts.map((post:any) => (
                        <PostCard post={post.node} key={post.node.title}/>
                    ))}
                </div>
                <div className='lg:col-span-4 col-span-1'>
                    <div className='lg:sticky relative top-8'>
                         {/*@ts-ignore*/}
                        <PostWidget/>
                        <Categories/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export async function getStaticProps() {
    const posts = (await getPosts()) || [];
    return {
        props:{posts}
    }
}