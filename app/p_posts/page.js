/* listing posts */
import React from "react";
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import {lora} from '../fonts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'


export default function Page({searchParams}){

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

    const nPosts = frontMatter.length
    const postsPerPage = 3;
    const maxPageNumber = Math.ceil(nPosts/postsPerPage)
    
    let pageNum = parseInt(searchParams.pageNumber);
    pageNum = pageNum > maxPageNumber ? maxPageNumber : pageNum
    let startIndex = (pageNum-1) * postsPerPage
    let endIndex = startIndex + postsPerPage 
    endIndex = endIndex > nPosts ? nPosts : endIndex

    const posts = frontMatter.slice(startIndex, endIndex).map((item) => {
        return (
            <div key={item.title}>
                <Link href={{
                    pathname: "/p_render/" + `${item.slug}`
                }}><h1 className="text-lg text-blue-500 font-bold">{item.title}</h1></Link>
                <p>{item.author}</p>
                <p>{item.date}</p>
                <p className={lora.className}>{item.excerpt}</p>
            </div>
        );
    })
    return (
        <>
            <div className="postSection">
                {posts}
            </div>
            <div className="flex justify-between items-center">
                {pageNum > 1 && <Link href = {{ 
                    pathname: "/p_posts",
                    query: {pageNumber: pageNum-1}
                }}><ChevronLeftIcon className="size-6" /></Link>}
                <p>Page : {pageNum} / {maxPageNumber }</p>
                {pageNum < maxPageNumber && <Link href = {{ 
                    pathname: "/p_posts",
                    query: {pageNumber : pageNum+1}
                }}><ChevronRightIcon className="size-6" /></Link>}
            </div>
        </>
    )
}