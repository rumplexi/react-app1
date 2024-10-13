/* listing posts */
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { lora } from '../fonts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { CalendarDateRangeIcon, PencilSquareIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import styles from './posts.module.css'
import { md } from '../utils'

export default function Post(props){

    const [note, setNote] = useState('')
    const [pageNum, setPageNum] = useState(1)

    const nPosts = props.notes.length
    const postsPerPage = 3;
    const maxPageNumber = Math.ceil(nPosts/postsPerPage)

    function onRender(id) {
        const noteToRender = props.notes.find((elem) => elem.id === id)
        setNote(noteToRender)
    }

    function onList() {
        setNote('')
        setPageNum(1)
    }

    const startIndex = (pageNum-1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, nPosts)
    const posts = props.notes.slice(startIndex, endIndex).map((note) => {
        return (
            <div key={note.id}>
                <h1 onClick={() => onRender(note.id)} className="cursor-pointer text-lg text-blue-500 font-bold">{note.front.title}</h1>
                <p className="my-1">{note.front.author}</p>
                <div className="flex justify-start items-center my-1">
                    <CalendarDateRangeIcon className="size-5 mr-1"/>
                    <p>{note.front.date}</p>
                </div>
                <p className={lora.className}>{note.front.excerpt}</p>
            </div>
        );
    })

    return (
        <> {note === "" &&
            <>
                <div className="postSection">
                    {posts}
                </div>
                <div className="flex justify-between items-center">
                    {pageNum > 1 ?
                        <ChevronLeftIcon onClick={() => setPageNum(pageNum - 1)} className="size-6 cursor-pointer" /> :
                        <ChevronLeftIcon className="size-6 stroke-gray-200" />}
                    <p>Page : {pageNum} / {maxPageNumber}</p>
                    {pageNum < maxPageNumber ?
                        <ChevronRightIcon onClick={() => setPageNum(pageNum + 1)} className="size-6 cursor-pointer" /> :
                        <ChevronRightIcon className="size-6 stroke-gray-200" />}
                </div>
            </>}
            {note !== '' &&
                <>
                    <div className="flex flex-col justify-start items-start p-4 mt-2 w-[768px]">
                        <div className='flex justify-between items-end mb-4 w-full'>
                            <h1 className="text-2xl text-amber-700 font-bold">{note.front.title}</h1>
                            <div className='flex justify-end items-center'>
                                <Link href="/p_edit"><PencilSquareIcon className="size-6 pb-1" /></Link>
                                <ArrowUturnLeftIcon onClick={onList} className='size-6 ml-2 pb-1 cursor-pointer'/>
                            </div>
                        </div>
                        <div className="flex justify-start items-center my-1">
                            <CalendarDateRangeIcon className="size-6 mr-1" />
                            <p className='mr-3'>{note.front.date}</p>

                        </div>
                    </div>
                    <div className={styles.article} dangerouslySetInnerHTML={{ __html: md.render(note.content)}} />
                    <div className='flex justify-end items-end mt-4 w-[768px]'>
                        <Link href="/p_edit"><PencilSquareIcon className="size-6 pb-1" /></Link>
                        <ArrowUturnLeftIcon onClick={onList} className='size-6 ml-2 pb-1 cursor-pointer'/>
                    </div>

                </>
            }
        </>
    )
}