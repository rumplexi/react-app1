/* listing posts */
import React from "react";
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import {lora} from '../fonts'

export default function Page(){

    const pathName = path.join(process.cwd(), 'app', '.posts');
    const fileNames = fs.readdirSync(pathName);
    const frontMatter = fileNames.map((file) => {
        const metaData = matter.read(path.join(pathName, file)).data;
        return {
            ...metaData, 
            filename:file, 
            slug:file.trim().replace(/(.mdx)$/, "")
        }
    });

    const posts = frontMatter.map((item) => {
        return (
            <div key={item.title}>
                <Link href={{
                    pathname: "/p_render/" + `${item.slug}`
                }}><h1 className="text-lg text-blue-500 font-bold">{item.title}</h1></Link>
                <p>{item.author}</p>
                <p>{item.date}</p>
                <p className={lora.className}>{item.excerpt}</p>
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