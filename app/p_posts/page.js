/* listing posts */
import React from "react";
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import {lora} from '../fonts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { CalendarDateRangeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

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
                <div className="flex justify-start items-center">
                    <Link href={{
                        pathname: "/p_render/" + `${item.slug}`
                    }}><h1 className="text-lg text-blue-500 font-bold">{item.title}</h1></Link>
                    <Link href={{
                        pathname: "/p_tags/"
                    }}><PencilSquareIcon className="size-4 mx-2 stroke-gray-500"/></Link>
                </div>
                <p className="my-1">{item.author}</p>
                <div className="flex justify-start items-center my-1">
                    <CalendarDateRangeIcon className="size-5 mr-1"/>
                    <p>{item.date}</p>
                </div>
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
                {pageNum > 1 ? <Link href = {{ 
                    pathname: "/p_posts",
                    query: {pageNumber: pageNum-1}
                }}><ChevronLeftIcon className="size-6" /></Link>
                : <ChevronLeftIcon className="size-6 stroke-gray-200" /> }  
                <p>Page : {pageNum} / {maxPageNumber }</p>

                {pageNum < maxPageNumber ? <Link href = {{ 
                    pathname: "/p_posts",
                    query: {pageNumber : pageNum+1}
                }}><ChevronRightIcon className="size-6" /></Link>
                : <ChevronRightIcon className="size-6 stroke-gray-200" />}
            </div>
        </>
    )
}