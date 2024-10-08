/* listing posts */
'use client'

import { lora } from '../fonts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { CalendarDateRangeIcon } from '@heroicons/react/24/outline'
import {useState} from 'react'
import Link from 'next/link'

export default function Post(props){

    const [mode, setMode] = useState('blog')
    const [pageNum, setPageNum] = useState(1)

    const nPosts = props.frontMatter.length
    const postsPerPage = 3;
    const maxPageNumber = Math.ceil(nPosts/postsPerPage)
    
    const startIndex = (pageNum-1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, nPosts)

    const posts = props.frontMatter.slice(startIndex, endIndex).map((item) => {
        return (
            <div key={item.title}>
                <h1 className="text-lg text-blue-500 font-bold">{item.title}</h1>
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
        <> {mode === "list" && 
            <>
                <div className="postSection">
                    {posts}
                </div>
                <div className="flex justify-between items-center">
                    {pageNum > 1 ?
                    <ChevronLeftIcon onClick={() => setPageNum(pageNum-1)} className="size-6 cursor-pointer" /> :
                    <ChevronLeftIcon className="size-6 stroke-gray-200" /> }  
                    <p>Page : {pageNum} / {maxPageNumber }</p>
                    {pageNum < maxPageNumber ? 
                    <ChevronRightIcon onClick={() => setPageNum(pageNum+1)} className="size-6 cursor-pointer" /> :
                    <ChevronRightIcon className="size-6 stroke-gray-200" />}
                </div> 
            </> }
            { mode === 'blog' && <MDrender />}
        </>
    )
}