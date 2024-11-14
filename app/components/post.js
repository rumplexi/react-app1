/* listing or rendering posts */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { lora, noto_serif_kr } from '../fonts'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid'
import { CalendarDateRangeIcon, PencilSquareIcon, ArrowUturnLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import styles from './posts.module.css'
import { md } from '../utils'
import { db, notesCollection } from '../configure-fb'
import { onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore'

export default function Post(){

    const [notesArray, setNotesArray] = useState([])
    const [note, setNote] = useState('') // noteToRender...
    const [pageNum, setPageNum] = useState(1)

    useEffect(()=>{
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            })) 
            setNotesArray(notesArr)
        })
        return unsubscribe
    }, [])

    const nPosts = notesArray.length
    const postsPerPage = 3;
    const maxPageNumber = Math.ceil(nPosts/postsPerPage)

    async function onDelete(id) {
        /* delete a note from firebase */
        const docRef = doc(db, "notes", id)
        await deleteDoc(docRef)
        onList()        
    }
    function onRender(id) {
        const noteToRender = notesArray.find((elem) => elem.id === id)
        setNote(noteToRender)
    }
    function onList() {
        setNote('')
        setPageNum(1)
        console.log(notesArray[0])
    }
    const startIndex = (pageNum-1) * postsPerPage
    const endIndex = Math.min(startIndex + postsPerPage, nPosts)
    const posts = notesArray.slice(startIndex, endIndex).map((note) => {
        return (
            <div key={note.id} className={styles.postInfo}>
                <h1 onClick={() => onRender(note.id)}>{note.front.title}</h1>
                <p>{note.front.author}</p>
                <div className={styles.dateDiv}>
                    <CalendarDateRangeIcon className={styles.icon} />
                    <p>{note.front.date}</p>
                </div>
                <p className={lora.className}>{note.front.excerpt}</p>
            </div>
        );
    })
    return (
        <> {note === '' &&  /* if note to render is empty, that is pageListView*/
            <>
                <div className={styles.postList}>
                    {posts}
                </div>
                <div className={styles.pagenation}>
                    {pageNum > 1 ?
                        <ChevronLeftIcon onClick={() => setPageNum(pageNum - 1)} className={styles.icon} /> :
                        <ChevronLeftIcon className={styles.iconDisabled} />}
                    <p>Page : {pageNum} / {maxPageNumber}</p>
                    {pageNum < maxPageNumber ?
                        <ChevronRightIcon onClick={() => setPageNum(pageNum + 1)} className={styles.icon} /> :
                        <ChevronRightIcon className={styles.iconDisabled} />}
                </div>
            </>}
            {note !== '' && /* note to render is not empty */
                <>
                    <div className={styles.postHeader}>
                        <div className={styles.postTitle}>
                            <h1>{note.front.title}</h1>
                            <div className={styles.postHeaderNav}>
                                <Link href= {{pathname: '/p_edit', query: { id: note.id}}}>
                                        <PencilSquareIcon className={styles.icon} /></Link>
                                <TrashIcon onClick={() => onDelete(note.id)} className={styles.icon}/>
                                <ArrowUturnLeftIcon onClick={onList} className={styles.icon} />
                            </div>
                        </div>
                        <div className={styles.dateDiv}>
                            <CalendarDateRangeIcon className={styles.icon} />
                            <p>{note.front.date}</p>
                        </div>
                    </div>
                    <div className={`${styles.postBody} ${lora.className} ${noto_serif_kr.className}`} dangerouslySetInnerHTML={{ __html: md.render(note.content) }} />
                    <div className={styles.postHeaderNav}>
                        <PencilSquareIcon className={styles.icon} />
                        <ArrowUturnLeftIcon onClick={onList} className={styles.icon} />
                    </div>
                </>
            }
        </>
    )
}