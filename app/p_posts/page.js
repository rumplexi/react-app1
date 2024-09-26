/* listing posts */

import React from "react";
import Posts from '@/app/.posts/Posts'
import Link from 'next/link'

export default function Page(){
    
    const posts = Posts.map((item) => {
        return (
            <div>
                <Link href={{
                    pathname: "/p_render",
                    query: { id: "test"}
                }}>{item.title}</Link>
                <br></br>
                <p>{item.text}</p>
                <br></br>
            </div>
        );
    })
    
    return (
        <div className="postSection" key="postList">
            {posts}
        </div>
    )
}